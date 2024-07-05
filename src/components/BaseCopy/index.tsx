/**
 * 组件 - BaseCopy
 */

import { CSSProperties } from "react";
import { StrNum } from "@/vite-env";
import BaseIcon from "@/components/BaseIcon";
import { Tooltip } from "antd";
import { showMessage } from "@/utils";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  line?: StrNum;
  text?: StrNum;
  char?: string; //空位符
  [key: string]: any;
}
export default ({ className = "", line = 1, text = "", children = text, char = "-", ...restProps }: Props) => {
  function handleClick(e: Event) {
    e.stopPropagation();
    if (!children) return;
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
      className={`${className} ${s["base-copy"]} ${Number(line) > 0 ? "f-fs-c" : ""} ${children ? s["has-val"] : ""}`}
      {...restProps}
    >
      <span className={`line-${line}`}>{children || char}</span>
      {children && (
        <Tooltip title="点击复制">
          <BaseIcon className={`${s.icon} f-0 ml-4`} name="CopyOutlined" />
        </Tooltip>
      )}
    </div>
  );
};
