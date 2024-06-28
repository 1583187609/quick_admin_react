/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
}
export default ({ className = "", ...restProps }: Props) => {
  return (
    <div className={`${className}`} {...restProps}>
      测试10
    </div>
  );
};
