import { Editor } from 'slate';
import {
  IButtonMenu,
  IDomEditor,
  DomEditor,
  SlateTransforms,
  SlateEditor,
  SlateElement,
  SlateNode,
} from '@wangeditor/editor';

export type TagTypes = 'tag-1' | 'tag-2';
export type TagTitles = '一级标签' | '二级标签';

const getParentNodes = (editor: IDomEditor, type: string) => {
  let parentNode: SlateNode = { type, children: [] };
  const nodeEntries = SlateEditor.nodes(editor, {
    match: (node: SlateNode) => {
      if (SlateElement.isElement(node)) {
        if (node.type === type) {
          return true; // 匹配 type
        }
      }
      return false;
    },
    universal: true,
  });
  if (nodeEntries == null) {
    console.log(`当前未选中的 ${type}`);
  } else {
    for (const nodeEntry of nodeEntries) {
      if (nodeEntry instanceof Array) {
        const node = nodeEntry[0];
        parentNode = node;
      }
    }
  }
  return parentNode;
};

//标签级别：一级标签、二级标签
class TagLevels implements IButtonMenu {
  title: string;
  tag: string;
  type: TagTypes;

  constructor(type: TagTypes, title: TagTitles) {
    this.type = type;
    this.title = title; // 自定义菜单标题
    this.tag = 'button';
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {
    return editor.getSelectionText();
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {
    // return false;
    const node = DomEditor.getSelectedNodeByType(editor, this.type);
    return !!node;
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    // return false;
    if (editor.selection == null) return true;
    const [nodeEntry] = Editor.nodes(editor, {
      match: n => {
        const type = DomEditor.getNodeType(n);
        // 只可用于 p 和 this.type
        return ['paragraph', this.type].includes(type);
      },
      universal: true,
      mode: 'highest', // 匹配最高层级
    });
    // 匹配到 p this.type ，不禁用
    if (nodeEntry) {
      return false;
    }
    // 未匹配到，则禁用
    return true;
  }
  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {
    // if (this.isDisabled(editor)) return;
    // editor.insertText(value as string); // value 即 this.value(editor) 的返回值
    if (this.isDisabled(editor)) return;
    const active = this.isActive(editor);
    const newType = active ? 'paragraph' : this.type;
    //  选中文本再进行标签操作
    if (value) {
      if (!active) {
        const parentNode = getParentNodes(editor, 'paragraph');
        let text = '';
        if (parentNode?.children?.length > 0) {
          (parentNode?.children || []).forEach((v: any) => (text += v.text));
        }
        if (text === value) {
          //  全选
          const nodes: any = { type: this.type, children: [{ text: value }] };
          SlateTransforms.setNodes(editor, nodes, {
            mode: 'lowest',
          });
        } else if (text.includes(value as string)) {
          //  只选中改变一部分
          const nodes = { type: this.type, children: [{ text: value }] };
          SlateTransforms.insertNodes(editor, [nodes]);
        } else if (!text) {
          const nodes = { type: this.type, children: [{ text: value }] };
          editor.deleteFragment(); //删除选中的内容
          editor.deleteForward('block'); // 删除所在的二级标签空盒子，不然顶部会多出一行空行，相当于按delete键
          SlateTransforms.insertNodes(editor, [nodes]);
        } else if (text) {
          const nodes = { type: this.type, children: [{ text: value }] };
          SlateTransforms.insertNodes(editor, [nodes]);
        } else {
          // const position = editor.selection;
          // editor.select({ ...position, focus: { path: position.anchor.path, offset: value.length } });
          const nodes = { type: this.type, children: [{ text: value }] };
          SlateTransforms.setNodes(editor, nodes, {
            mode: 'lowest',
          });
          // this.exec(editor, value);
        }
      } else {
        const nodes = { type: 'paragraph', children: [{ text: value }] };
        SlateTransforms.setNodes(editor, nodes, {
          mode: 'lowest',
        });
      }
    } else {
      //  直接进行标签操作
      SlateTransforms.setNodes(editor, {
        type: newType,
      });
    }
  }
}
export default TagLevels;
