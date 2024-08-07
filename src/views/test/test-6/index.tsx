/**
 * redux 使用示例
 */

import { Tabs } from "antd";
import { CSSProperties } from "react";
import MapDemo from "./_components/MapDemo";
import CommonDemo from "./_components/CommonDemo";
import StoreDemo from "./_components/StoreDemo";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const items = [
  {
    key: "1",
    label: "Map+Connect",
    children: <MapDemo />,
  },
  {
    key: "2",
    label: "常规（hooks）",
    children: <CommonDemo />,
  },
  {
    key: "3",
    label: "useStoreSlice",
    children: <StoreDemo />,
  },
];
export default ({ className = "", ...restProps }: Props) => {
  return <Tabs items={items} defaultActiveKey="2" {...restProps} />;
};
