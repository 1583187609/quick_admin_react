import { defaultWidgetSize, showMessage, storage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import cssVars from "@/assets/styles/_var.module.less";
import { ShowCodes } from "@/vite-env";
import { updateState } from "../_utils";

export type LayoutType = "vertical" | "classics" | "horizontal" | "columns";
export type LayoutSize = "large" | "medium" | "small" | "mini";
export type SetName = keyof typeof defaultSet;
export type LanguageTypes = "zh" | "en";

export interface LayoutAttrs {
  type: LayoutType;
  size: LayoutSize;
}
interface DefaultSet {
  layout: LayoutAttrs;
  language: {
    type: LanguageTypes;
  };
  menu: {
    uniqueOpened: ShowCodes;
  };
  pageTags: {
    show: ShowCodes;
    showIcon: ShowCodes;
  };
  breadcrumb: {
    show: ShowCodes;
    showIcon: ShowCodes;
  };
  footer: {
    show: ShowCodes;
  };
  theme: {
    color: string;
    darkMode: ShowCodes;
  };
}

export const defaultSet: DefaultSet = {
  //布局
  layout: {
    type: "columns",
    size: defaultWidgetSize,
  },
  //语言
  language: {
    type: "zh",
  },
  //菜单设置
  menu: {
    uniqueOpened: 0, //是否只保持一个子菜单的展开
  },
  //页签
  pageTags: { show: 1, showIcon: 0 },
  //面包屑
  breadcrumb: { show: 1, showIcon: 1 },
  //底部
  footer: { show: 0 },
  //主题
  theme: {
    color: cssVars.colorPrimary,
    darkMode: 0,
  },
};
const initState = storage.getItem("set") ?? JSON.parse(JSON.stringify(defaultSet));
export default createSlice({
  name: "set",
  initialState: initState,
  reducers: {
    updateSetState: updateState,
    resetDefault(state: any, { payload }) {
      // Object.assign(state, JSON.parse(JSON.stringify(defaultSet)));
      // storage.setItem("set", defaultSet);
      // showMessage("已恢复为默认值");
    },
  },
});
