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
  [key: string]: any;
}
export default ({ className = "", line = 1, text = "", children = text, ...restProps }: Props) => {
  function handleClick() {
    const input = document.createElement("input");
    input.setAttribute("value", text as string);
    document.body.appendChild(input);
    input.select();
    const copyText = document.execCommand("copy");
    if (copyText) showMessage("复制成功！");
    document.body.removeChild(input);
  }
  return (
    <div onClick={handleClick} className={`${className} ${s["base-copy"]} ${Number(line) > 0 ? "f-fs-c" : ""}`} {...restProps}>
      <span className={`line-${line}`}>{children}</span>
      {children && (
        <Tooltip title="点击复制">
          <BaseIcon className={`${s.icon} f-0 ml-4`} name="DocumentCopy" />
        </Tooltip>
      )}
    </div>
  );
};
