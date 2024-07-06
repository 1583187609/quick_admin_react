/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";
// import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
export default ({ className = "", children, ...restProps }: Props) => {
  return (
    <div className={`${className}`} {...restProps}>
      模板文件{children}
    </div>
  );
};
