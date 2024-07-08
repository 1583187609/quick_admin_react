/**
 * 文件说明-模板文件
 */

import { Drawer } from "antd";
import { CommonObj } from "@/vite-env";

export type PlacementType = "top" | "right" | "bottom" | "left";
interface Props {
  className?: string;
  title?: string;
  open?: boolean;
  placement?: PlacementType;
  onClose?: () => void;
  children?: any;
  [key: string]: any;
}
const defaultAttrs: CommonObj = {
  title: "drawer标题",
  width: "auto",
  placement: "right",
  maskClosable: false,
  // forceRender: true
};
export default ({ className = "", children, open, ...restProps }: Props) => {
  return (
    <Drawer className={`${className}`} open={open} {...Object.assign({}, defaultAttrs, restProps)}>
      {children}
    </Drawer>
  );
};
