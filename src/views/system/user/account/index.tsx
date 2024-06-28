/**
 * 账号管理
 */

import { CSSProperties } from "react";
// import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
export default ({ className = "", ...restProps }: Props) => {
  return (
    <div className={`${className}`} {...restProps}>
      账号管理
    </div>
  );
};
