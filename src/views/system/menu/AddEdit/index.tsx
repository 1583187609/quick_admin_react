import BaseForm from "@/components/form/BaseForm";
import IconPicker from "./_components/IconPicker";
import { Tabs } from "antd";
import { useState } from "react";
import { CommonObj } from "@/vite-env";
import { IconNames } from "@/components/BaseIcon";

interface Props {}
function getFields({ activeKey = "1" }: CommonObj): any[] {
  return [
    {
      name: "menu_name",
      label: "菜单名称",
      required: true,
      attrs: {
        maxLength: 10,
      },
    },
    ...(activeKey !== "3"
      ? [
          {
            name: "route_path",
            label: "路由地址",
            required: true,
            otherAttrs: {
              example: "/auth/menu",
            },
          },
          activeKey === "2" && {
            name: "component_path",
            label: "组件路径",
            required: true,
            otherAttrs: {
              example: "/pages-system/user/account/index.tsx",
            },
          },
          {
            name: "icon",
            label: "菜单图标",
            render: (attrs: CommonObj) => <IconPicker {...attrs} />,
          },
        ]
      : []),
    activeKey !== "1" && {
      name: "auth",
      label: "权限标识",
      otherAttrs: {
        example: "system:menu:list",
      },
    },
    ,
    {
      name: "order_num",
      label: "显示顺序",
      type: "InputNumber",
    },
    activeKey === "2" && {
      name: "is_cache",
      label: "是否缓存",
      type: "RadioGroup",
      attrs: {
        options: "YesNoStatus",
      },
    },

    {
      name: "is_frame",
      label: "是否为外链",
      type: "RadioGroup",
      attrs: {
        options: "YesNoStatus",
      },
    },
    activeKey !== "3" && {
      name: "is_show",
      label: "是否显示",
      type: "RadioGroup",
      attrs: {
        options: "YesNoStatus",
      },
    },
    ,
    {
      name: "is_enable",
      label: "是否启用",
      type: "RadioGroup",
      attrs: {
        options: "YesNoStatus",
      },
    },
    {
      name: "remark",
      label: "备注",
      type: "TextArea",
      attrs: {
        maxLength: 50,
      },
    },
  ];
}
const initVals: CommonObj = {
  remark: "暂无",
  is_cache: 1,
  is_frame: 1,
  is_show: 1,
  is_enable: 1,
};
const tabs = [
  { label: "目录", value: "1" },
  { label: "菜单", value: "2" },
  { label: "按钮", value: "3" },
];
export default ({}: Props) => {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onTabClick={(key: string) => setActiveKey(key)}
        items={tabs.map((tab: CommonObj) => {
          return {
            label: tab.label,
            key: tab.value,
          };
        })}
      />
      <BaseForm initialValues={initVals} style={{ width: "600px" }} fields={getFields({ activeKey })} />
    </>
  );
};
