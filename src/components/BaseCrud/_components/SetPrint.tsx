import { CSSProperties, ReactNode } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

export default ({ className = "", style, children, ...restProps }: Props) => {
  return (
    <div className={`${className} f-c-c-c`} style={{ width: "500px", ...style }} {...restProps}>
      <div>根据组件宽度自动撑开，设置了宽度500px</div>
      <div>这是打印设置页面</div>
      <div>水平、垂直方向居中</div>
    </div>
  );
};
