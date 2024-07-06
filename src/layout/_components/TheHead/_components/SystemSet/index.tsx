/**
 * 系统设置
 */

import { StandardFormFieldAttrs } from "@/components/BaseFormItem";
import SectionForm, { SectionFormItem } from "@/components/form/SectionForm";
import { CSSProperties } from "react";
import LayoutStyle from "./_components/LayoutStyle";
import { CommonObj } from "@/vite-env";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const showHideSwitchAttrs = {
  checkedChildren: "显示",
  unCheckedChildren: "隐藏",
};
const sections: SectionFormItem[] = [
  {
    title: "外观设置",
    fields: [
      {
        name: "layout",
        label: "布局风格",
        render: (attrs: CommonObj) => <LayoutStyle {...attrs} />,
      },
      {
        name: "widgetSize",
        label: "控件大小",
        type: "RadioGroup",
        attrs: {
          options: "Gender",
        },
      },
      {
        name: "langType",
        label: "语言类型",
        type: "RadioGroup",
        attrs: {
          options: "Gender",
        },
      },
      {
        name: "breadcrumb",
        label: "面包屑",
        type: "Switch",
        colAttrs: 12,
        attrs: showHideSwitchAttrs,
      },
      {
        name: "breadcrumbIcon",
        label: "图标",
        type: "Switch",
        colAttrs: 12,
        attrs: showHideSwitchAttrs,
      },
      {
        name: "pageTags",
        label: "页签栏",
        type: "Switch",
        colAttrs: 12,
        attrs: showHideSwitchAttrs,
      },
      {
        name: "pageTagsIcon",
        label: "图标",
        type: "Switch",
        colAttrs: 12,
        attrs: showHideSwitchAttrs,
      },
      {
        name: "footer",
        label: "页脚",
        type: "Switch",
        colAttrs: 12,
        attrs: showHideSwitchAttrs,
        otherAttrs: {
          popover: "页面底部的专利许可",
        },
      },
    ],
  },
  {
    title: "主题设置",
    fields: [
      {
        name: "themeColor",
        label: "主题颜色",
        type: "ColorPicker",
      },
      {
        name: "darkMode",
        label: "暗黑模式",
        type: "Switch",
      },
    ],
  },
  {
    title: "菜单设置",
    fields: [
      {
        name: "unique_opened",
        label: "手风琴",
        type: "Switch",
        otherAttrs: {
          popover: "启用后，只保持一个子菜单的展开",
        },
      },
    ],
  },
];
export default ({ className = "", children, ...restProps }: Props) => {
  return (
    <SectionForm
      style={{ width: "400px" }}
      sections={sections}
      className={`${className}`}
      submitButton="恢复默认设置"
      resetButton=""
      {...restProps}
    />
  );
};
