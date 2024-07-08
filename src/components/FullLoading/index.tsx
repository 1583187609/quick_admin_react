/**
 * 全屏加载图标
 */

import { Spin } from "antd";
import s from "./index.module.less";

interface Props {
  className?: string;
  mask?: boolean;
  [key: string]: any;
}

export default ({ className = "", mask = true, ...restProps }: Props) => {
  return (
    <div className={`${s["full-loading"]} ${mask ? s.mask : ""} ${className} f-c-c`} {...restProps}>
      {/* <Spin size="large" tip="玩命加载中..." delay={500} /> */}
      <Spin size="large" />
    </div>
  );
};
