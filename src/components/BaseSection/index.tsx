/**
 * BaseSection - 用作块状的组件
 */

import { CSSProperties, useState } from "react";
import { Badge, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  title?: any;
  right?: any;
  count?: number;
  overflowCount?: number;
  fold?: boolean;
  children?: any;
}
export default ({
  className = "",
  style,
  title,
  right,
  count = 0,
  overflowCount = 99,
  fold,
  children,
}: Props) => {
  const [isFold, setIsFold] = useState(false);
  return (
    <div style={style} className={`${className} ${s["base-section"]}`}>
      <header className={`${s.head} f-sb-c`}>
        <div className={`${s.title} f-fs-c`}>{title}</div>
        {!!count && (
          <Badge
            className={s.badge}
            count={count}
            overflowCount={overflowCount}
          ></Badge>
        )}
        {right}
        {fold && (
          <Button
            className={`${s["fold-btn"]} ml-h`}
            type="link"
            onClick={() => setIsFold(!isFold)}
            icon={
              <CaretDownOutlined
                className={`${s["fold-icon"]} ${isFold ? "" : "rotate-180"}`}
              />
            }
          ></Button>
        )}
      </header>
      <div
        className={`${s.body}`}
        style={{
          maxHeight: isFold ? "0" : "100vh",
          padding: isFold ? "0 16px" : "8px 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
};
