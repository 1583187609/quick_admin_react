/**
 * 系统设置
 */

import SectionForm, { SectionFormItem } from "@/components/form/SectionForm";
import { CSSProperties, useState } from "react";
import LayoutStyle from "./_components/LayoutStyle";
import { CommonObj, FinallyNext, OptionItem } from "@/vite-env";
import { useStoreSlice } from "@/hooks";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const showHideSwitchAttrs = {
  checkedChildren: "显示",
  unCheckedChildren: "隐藏",
};
const sizeOpts: OptionItem[] = [
  { label: "大型", value: "large" },
  { label: "中等", value: "medium" },
  { label: "小型", value: "small" },
  // { label: "迷你", value: "mini" },
];
const languageOpts: OptionItem[] = [
  { label: "简体中文", value: "zh" },
  { label: "英文", value: "en" },
];
const getSections = (args: CommonObj): SectionFormItem[] => {
  const { bread, page_tag } = args;
  return [
    {
      title: "外观设置",
      fields: [
        {
          name: "layout_type",
          label: "布局风格",
          render: (attrs: CommonObj) => <LayoutStyle {...attrs} />,
        },
        {
          name: "widget_size",
          label: "控件大小",
          type: "RadioGroup",
          attrs: {
            options: sizeOpts,
          },
        },
        {
          name: "language",
          label: "语言类型",
          type: "RadioGroup",
          attrs: {
            options: languageOpts,
          },
        },
        {
          name: "bread",
          label: "面包屑",
          type: "Switch",
          colAttrs: bread ? 8 : undefined,
          attrs: showHideSwitchAttrs,
        },
        bread && {
          name: "bread_icon",
          label: "图标",
          type: "Switch",
          colAttrs: 12,
          attrs: showHideSwitchAttrs,
        },
        {
          name: "page_tag",
          label: "页签栏",
          type: "Switch",
          colAttrs: page_tag ? 8 : undefined,
          attrs: showHideSwitchAttrs,
        },
        page_tag && {
          name: "page_tag_icon",
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
          name: "theme_color",
          label: "主题颜色",
          type: "ColorPicker",
        },
        {
          name: "dark_mode",
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
};

export default ({ className = "", children, ...restProps }: Props) => {
  const setStore = useStoreSlice("set");
  const initVals: CommonObj = getDefaultModel(setStore);
  const [params, setParams] = useState<CommonObj>(initVals);
  const sections = getSections(params);
  function getDefaultModel(set: CommonObj) {
    return {
      layout_type: set.layout.type,
      widget_size: set.layout.size,
      language: set.language.type,
      bread: set.breadcrumb.show,
      bread_icon: set.breadcrumb.showIcon,
      page_tag: set.pageTags.show,
      page_tag_icon: set.pageTags.showIcon,
      footer: set.footer.show,
      theme_color: set.theme.color,
      dark_mode: set.theme.darkMode,
      unique_opened: set.menu.uniqueOpened,
    };
  }
  return (
    <SectionForm
      style={{ width: "400px" }}
      sections={sections}
      className={`${className}`}
      submitButton="恢复默认设置"
      onSubmit={(args: CommonObj, next: FinallyNext) => {
        console.log(args, "点击了提交按钮----------");
        next("已恢复默认设置");
      }}
      resetButton=""
      initialValues={initVals}
      onValuesChange={(vals: CommonObj, allVals: CommonObj) => setParams(allVals)}
      {...restProps}
    />
  );
};
