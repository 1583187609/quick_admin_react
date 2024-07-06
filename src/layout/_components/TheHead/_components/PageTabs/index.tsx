/**
 * 文件说明 - 模板文件
 */

import { CommonObj } from "@/vite-env";
import { Tabs } from "antd";
import { CSSProperties } from "react";
//import s from './index.module.less'

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const items: CommonObj[] = new Array(20).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    key: id,
    label: `Tab ${id}`,
    children: <div style={{ background: "#fff" }}>{`Content of Tab Pane ${index + 1}`}</div>,
  };
});
export default ({ className = "", children, ...restProps }: Props) => {
  function handleScroll(res: any) {
    console.log(res, "滚动了--------------");
  }
  return (
    <div>
      <Tabs
        hideAdd
        className={`${className}`}
        items={items}
        type="editable-card"
        size="small"
        // style={{ width: "90vw", overflow: "auto" }}
        onTabScroll={handleScroll}
        {...restProps}
      />
    </div>
  );
};
