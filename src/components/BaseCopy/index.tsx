/**
 * 组件 - BaseCopy
 */

import { CSSProperties } from "react";
import { StrNum } from "@/vite-env";
import { Tooltip } from "antd";
import { showMessage } from "@/components/_utils";
import { CopyOutlined } from "@ant-design/icons";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  line?: StrNum;
  text?: StrNum;
  char?: string; //空位符
  clickIconCopy?: boolean; //是否只当点击图标时才复制文本
  stop?: boolean; //是否阻止点击事件的冒泡
  [key: string]: any;
}
export default ({
  className = "",
  line = 1,
  text = "",
  children = text,
  char = "-",
  clickIconCopy,
  stop = true,
  ...restProps
}: Props) => {
  function handleClick(e: Event) {
    if (!children) return;
    const { tagName, classList } = e.target as any;
    if (clickIconCopy && tagName !== "svg" && !classList.contains(s.icon)) return;
    stop && e.stopPropagation();
    const input = document.createElement("input");
    input.setAttribute("value", children as string);
    document.body.appendChild(input);
    input.select();
    const copyText = document.execCommand("copy");
    if (copyText) showMessage("复制成功！");
    document.body.removeChild(input);
  }
  return (
    <div
      onClick={handleClick}
      className={`${className} ${s["base-copy"]} ${Number(line) > 0 ? "f-fs-c" : ""} ${
        children && !clickIconCopy ? s.hover : ""
      }`}
      {...restProps}
    >
      <span className={`line-${line}`}>{children || char}</span>
      {children && (
        <Tooltip title="点击复制">
          <CopyOutlined className={`${s.icon} ${s.hover} f-0 ml-4`} />
        </Tooltip>
      )}
    </div>
  );
};
