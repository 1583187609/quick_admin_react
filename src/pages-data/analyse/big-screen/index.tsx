/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
}
export default ({ className = "", style }: Props) => {
  return (
    <div style={style} className={`${className}`}>
      大屏展示页面
    </div>
  );
};
