import { IButtonMenu, IDomEditor } from '@wangeditor/editor';

//查看html文本
class HtmlView implements IButtonMenu {
  title: string;
  tag: string;
  active: boolean;

  constructor() {
    this.title = 'html';
    this.tag = 'button';
    this.active = false;
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {
    return this.isActive(editor) ? editor.getText() : editor.getHtml();
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {
    return this.active;
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {
    // if (this.isDisabled(editor)) return;
    // editor.insertText(value as string); // value 即 this.value(editor) 的返回值
    const active = this.isActive(editor);
    this.active = !active;
    editor.clear();
    if (active) {
      editor.dangerouslyInsertHtml(value as string);
    } else {
      editor.insertText(value as string);
    }
  }
}
export default HtmlView;
