/**
 * 文件说明-模板文件
 */

import { DictName } from "@/dict";
import { CommonObj, StrNum } from "@/vite-env";
import { Tag } from "antd";
import { CSSProperties, useMemo } from "react";
import { useDictMap } from "@/hooks";
import { emptyVals } from "@/utils";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  name?: DictName;
  value?: StrNum;
  codeMap?: CommonObj;
  empty?: any;
  pureText?: boolean;
  count?: StrNum;
  [key: string]: any;
}
export default ({
  className = "",
  name = "EnableStatus",
  value,
  empty = "-",
  codeMap,
  pureText,
  children = empty,
  ...restProps
}: Props) => {
  const { getMap } = useDictMap();
  const tag = useMemo(() => {
    if (emptyVals.includes(value as string)) return null;
    let currMap: CommonObj = {};
    currMap = getMap(name, codeMap);
    return currMap[value as string] || {};
  }, []);
  return pureText || !tag ? (
    <span className={`${className} ${s["base-tag"]} ${s.span} ${tag?.attrs?.type ?? s.main} m-2`} {...restProps} {...tag?.attrs}>
      {tag?.text || children}
    </span>
  ) : (
    <Tag className={`${className} ${s["base-tag"]} m-2`} {...restProps} {...tag?.attrs}>
      {tag?.text || children}
    </Tag>
  );
};
