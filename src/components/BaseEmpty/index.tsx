import React from "react";
import { Empty } from "antd";
import { toCssVal } from "@/utils";

interface Props {
  className?: string;
  tips?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
}
export default ({
  className = "",
  tips = "空空如也~",
  paddingTop = 16,
  paddingBottom = 16,
}: Props) => {
  return (
    <Empty
      className={`${className}`}
      description={tips}
      // imageStyle={{ height: "50px", width: "50px" }}
      style={{
        padding: `${toCssVal(paddingTop)} 0 ${toCssVal(paddingBottom)}`,
      }}
    />
  );
};
