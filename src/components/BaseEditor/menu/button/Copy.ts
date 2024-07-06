import { showMessage } from "@/components/_utils";
import { IButtonMenu, IDomEditor } from "@wangeditor/editor";

export type TypeTypes = "text" | "html";
class Copy implements IButtonMenu {
  title: string;
  type: TypeTypes;
  // iconSvg?: string | undefined;
  tag: string;
  constructor(type: TypeTypes, title = "") {
    this.title = title; // 自定义菜单标题
    this.type = type;
    // this.iconSvg = '<svg>...</svg>' // 可选
    this.tag = "button";
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {
    return false;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {
    return false;
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {
    // if (this.isDisabled(editor)) return;
    // editor.insertText(value as string); // value 即 this.value(editor) 的返回值
    const textarea = document.createElement("textarea");
    // 防止手机上弹出软键盘
    textarea.setAttribute("readonly", "readonly");
    textarea.value = this.type === "text" ? editor.getText() : editor.getHtml();
    document.body.appendChild(textarea);
    textarea.select();
    document.body.removeChild(textarea);
    showMessage("复制成功!");
    // const res = document.execCommand('copy');
    // return res;
  }
}
export default Copy;
