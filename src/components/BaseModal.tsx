/**
 * 文件说明-模板文件
 */

import React, { useMemo } from "react";
import { Modal } from "antd";
import { merge } from "lodash";

interface Props {
  className?: string;
  title?: string;
  open?: boolean;
  width?: string | number;
  children?: any;
  footer?: any;
  onOk?: () => void;
  onCancel?: () => void;
}
const defaultAttrs: CommonObj = {
  title: "Modal标题",
  width: "fit-content",
  maskClosable: false,
  // forceRender: true,
  // onCancel: ()=>
};
export default ({ className = "", children, open, ...restProps }: Props) => {
  // const newAttrs = useMemo(() => {
  //   return Object.assign({}, defaultAttrs, restProps);
  // }, []);
  return (
    <Modal className={`${className}`} open={open} {...Object.assign({}, defaultAttrs, restProps)}>
      {children}
    </Modal>
  );
};
