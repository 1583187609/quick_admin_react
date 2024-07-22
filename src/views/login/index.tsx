/**
 * 文件说明 - 模板文件
 */

import { CSSProperties } from "react";
import Login from "./_components/Login";
import LoginCanvas from "./_components/LoginCanvas";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", children, ...restProps }: Props) => {
  return (
    <>
      <Login className={`${className}`} {...restProps} />
      {/* <LoginCanvas className={`${className}`} {...restProps} /> */}
    </>
  );
};
