import React, { ReactNode } from "react";
import { Empty } from "antd";
import { toCssVal } from "@/utils";
import { StrNum } from "@/vite-env";

interface Props {
  className?: string;
  tips?: ReactNode;
  size?: StrNum;
  [key: string]: any;
}
export default ({ className = "", style, tips = "空空如也~", size, ...restProps }: Props) => {
  return (
    <Empty
      className={`${className}`}
      description={tips}
      imageStyle={size ? { height: toCssVal(size), width: toCssVal(size) } : undefined}
      style={{ padding: `${toCssVal(Number(size) / 4)} 0`, ...style }}
      {...restProps}
    />
  );
};
