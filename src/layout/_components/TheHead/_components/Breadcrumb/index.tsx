import React, { CSSProperties } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
export default ({ className = "", ...restProps }: Props) => {
  // return (
  //   <div className={`${className}`} {...restProps}>
  //     1231232131
  //   </div>
  // );
  return (
    <Breadcrumb
      className={`${className}`}
      items={[
        {
          href: "",
          title: (
            <div style={{ color: "#fff" }}>
              <HomeOutlined />
            </div>
          ),
        },
        {
          href: "/",
          title: (
            <div style={{ color: "#fff" }}>
              <UserOutlined />
              <span>Application List</span>
            </div>
          ),
        },
        {
          href: "/home",
          title: <div style={{ color: "#fff" }}>Application</div>,
        },
      ]}
      {...restProps}
    />
  );
};
