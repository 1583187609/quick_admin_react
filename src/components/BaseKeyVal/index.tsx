/**
 * 文件说明-模板文件
 */

import { typeOf } from "#/mock/utils";
import { CSSProperties, useMemo } from "react";
import s from "./index.module.less";

interface Props {
  className?: string;
  valClass?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  colon?: boolean;
  label?: any; //可以自定义图标等
  value?: any; //可以自定义图标等
  lineNum?: number; //多少行
  children?: any;
}
function getText(children: any, value: any) {
  let text = children || value;
  if (["", undefined].includes(text)) {
    text = "-";
  } else if (typeOf(text) === "Boolean") {
    text = String(text);
  }
  return text;
}
export default ({
  className = "",
  style,
  labelStyle,
  colon = true,
  label = "label",
  value,
  lineNum = 0,
  valClass = "",
  children,
}: Props) => {
  const valText = getText(children, value);
  return (
    <div style={style} className={`${className} ${s["base-key-val"]} f-fs-fs`}>
      <div
        style={labelStyle}
        className={`${s.key} ${colon ? s.colon : ""} f-0`}
      >
        {label}
      </div>
      <div
        className={`${s.val} ${colon ? s.colon : ""} ${
          valClass ? s[valClass] : ""
        } ${s[`line-${lineNum}`]} f-1`}
      >
        {valText}
      </div>
    </div>
  );
};
