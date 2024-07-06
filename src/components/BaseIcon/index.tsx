import React from "react";
import * as Icons from "@ant-design/icons";
import { toCssVal } from "@/components/_utils";

interface Props {
  className?: string;
  onClick?: Function;
  name?: IconNames;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconNames = keyof typeof Icons;

export default ({ className = "", name = "ChromeFilled", size = "1em", color, title, onClick }: Props) => {
  const Icon: any = Icons[name] ?? Icons.TwitterOutlined;
  return React.createElement(Icon, {
    className: `${className}`,
    onClick,
    title,
    style: {
      fontSize: toCssVal(size),
      color,
      cursor: onClick ? "cursor" : "inherit",
    },
  });
};
