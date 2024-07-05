import { CommonObj } from "@/vite-env";
import { ButtonSize } from "antd/es/button";
import { ButtonType } from "antd/lib/button";
import { btnsMap } from "./btns";

// 常用的基础按钮类型
export type BtnAllNames = keyof typeof btnsMap;
export type BtnName = BtnAllNames | string; //常用基础按钮或其他自定义按钮
export interface PopconfirmAttrs {
  title: string;
  description?: string;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  disabled?: boolean;
}
export interface BtnItem {
  name: BtnName;
  text?: string; //按钮文本
  icon?: any; //按钮图标
  order?: number; //按钮顺序
  auth?: number[]; //权限
  to?: string; //点击按钮时要跳转的页面地址
  attrs?: BtnAttrs; //按钮属性
  popconfirm?: boolean | PopconfirmAttrs;
  customRules?: boolean; // 为true时，可移除按钮的默认规则，实现自定义规则
}
export interface BtnAttrs {
  icon?: any;
  text?: string;
  type?: ButtonType;
  size?: ButtonSize;
  ghost?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
export interface BtnMap {
  [key: BtnName]: BtnItem;
}

export type BtnFn = (row?: CommonObj) => BtnName | BtnItem;
export type BaseBtnType = BtnName | BtnItem | BtnFn;
