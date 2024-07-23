/**
 * 文件说明 - 模板文件
 */

import { CSSProperties, useEffect } from "react";
import { initCanvasLineDotBg } from "./_utils";
//import s from './index.module.less'

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", children, ...restProps }: Props) => {
  useEffect(() => {
    initCanvasLineDotBg("#login-canvas");
  }, []);
  return (
    <div className={`${className}`} {...restProps}>
      <canvas id="login-canvas" width="500" height="500" style={{ background: "black" }}></canvas>
    </div>
  );
};
