/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  fullName: string;
  shortName?: string;
  [key: string]: any;
}
export default ({ className = "", fullName, shortName, children, ...restProps }: Props) => {
  return (
    <div className={`${className} f-sb-c`} {...restProps}>
      <b className="f-1 line-1">{fullName}</b>
      <span className="f-0 line-1 color-info" style={{ maxWidth: "8em" }}>
        {shortName}
      </span>
    </div>
  );
};
