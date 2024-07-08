/**
 * 文件说明-模板文件
 */

import { Modal } from "antd";
import { CommonObj } from "@/vite-env";

interface Props {
  className?: string;
  title?: string;
  open?: boolean;
  width?: string | number;
  children?: any;
  footer?: any;
  onOk?: () => void;
  onCancel?: () => void;
  [key: string]: any;
}
const defaultAttrs: CommonObj = {
  title: "Modal标题",
  width: "fit-content",
  maskClosable: false,
  // forceRender: true,
};
export default ({ className = "", children, open, ...restProps }: Props) => {
  return (
    <Modal className={`${className}`} open={open} {...Object.assign({}, defaultAttrs, restProps)}>
      {children}
    </Modal>
  );
};
