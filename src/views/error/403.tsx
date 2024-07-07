/**
 * 文件说明 - 模板文件
 */

import { CSSProperties } from "react";
import Error from "./_components/Error";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", children, ...restProps }: Props) => {
  return <Error className={`${className}`} status={403} {...restProps} />;
};
