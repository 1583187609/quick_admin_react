import React from "react";
import * as Icons from "@ant-design/icons";
import { upperFirst, camelCase } from "lodash";
import { toCssVal } from "@/utils";

interface Props {
  className?: string;
  onClick?: Function;
  name?: string;
  size?: string | number;
  color?: string;
  title?: string;
}

export default ({
  name = "ChromeFilled",
  size = "1em",
  color,
  className = "",
  title,
  onClick,
}: Props) => {
  const iconName = upperFirst(camelCase(name));
  const Icon: any = Icons[iconName as keyof typeof Icons];
  return React.createElement(Icon || "div", {
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
