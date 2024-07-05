/**
 * 文件说明-模板文件
 */

import { Popover } from "antd";
import { CSSProperties } from "react";
import { QuestionCircleFilled } from "@ant-design/icons";

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: "danger" | "success" | "primary" | "info" | "warning";
  [key: string]: any;
}
export default ({ className = "", type = "info", children, ...restProps }: Props) => {
  return <Popover {...restProps}>{children || <QuestionCircleFilled className={`${className} ml-2 color-${type}`} />}</Popover>;
};
