import { CSSProperties, ReactNode } from "react";
import s from "./index.module.less";
interface Props {
  className?: string;
  style?: CSSProperties;
  type?: "danger" | "primary";
  children?: ReactNode;
  [key: string]: any;
}
export default ({ className = "", style, type = "primary", children, ...restProps }: Props) => {
  const isNum = !isNaN(Number(children));
  return (
    <strong className={`${className} ${s[type]} ml-6 mr-6`} style={{ fontSize: isNum ? 18 : 16, ...style }} {...restProps}>
      {children}
    </strong>
  );
};
