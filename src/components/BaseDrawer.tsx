/**
 * 文件说明-模板文件
 */

import React, { useMemo } from "react";
import { Drawer } from "antd";

export type PlacementType = "top" | "right" | "bottom" | "left";
interface Props {
  className?: string;
  title?: string;
  open?: boolean;
  placement?: PlacementType;
  onClose?: () => void;
  children?: any;
}
const defaultAttrs: CommonObj = {
  title: "drawer标题",
  width: "auto",
  placement: "right",
  maskClosable: false,
  // forceRender: true
};
export default ({ className = "", children, open, ...restProps }: Props) => {
  // const newAttrs = useMemo(() => {
  //   return Object.assign({}, defaultAttrs, restProps);
  // }, []);
  return (
    <Drawer
      className={`${className}`}
      open={open}
      {...Object.assign({}, defaultAttrs, restProps)}
    >
      {children}
    </Drawer>
  );
};
