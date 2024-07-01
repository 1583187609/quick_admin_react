import { BaseDataType, CommonObj, OptionItem } from "@/vite-env";
import { CSSProperties } from "react";
import { defaultValidTypes } from "./_config";

export type ValidType = keyof typeof defaultValidTypes;
export type FormItemType =
  | "Input"
  | "AutoComplete"
  | "InputNumber"
  | "Input.Password"
  | "Input.Search"
  | "Input.TextArea"
  | "Select"
  | "Radio.Group"
  | "Rate"
  | "Switch"
  | "Cascader"
  | "TimePicker"
  | "TimePicker.RangePicker"
  | "DatePicker"
  | "DatePicker.RangePicker"
  | "Checkbox"
  | "Checkbox.Group"
  | "Slider"
  | "Custom";
export type ValidateTriggerType = "onBlur" | "onChange";
export interface FieldAttrs {
  style?: CSSProperties;
  placeholder?: string;
  allowClear?: boolean;
  /** Select **/
  options?: OptionItem[];
  /** Radio.Group **/
  optionType?: "default" | "button";
  buttonStyle?: "outline" | "solid";
  /** Textarea **/
  showCount?: boolean;
  /** InputNumber **/
  max?: number;
  min?: number;
  maxLength?: number;
  disabled?: boolean;
  addonAfter?: any;
  [key: string]: any;
}
export interface ColAttrs {
  flex?: string | number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  span?: number;
  xs?: number | CommonObj;
  sm?: number | CommonObj;
  md?: number | CommonObj;
  lg?: number | CommonObj;
  xl?: number | CommonObj;
  xxl?: number | CommonObj;
}

export interface RuleItem {
  [key: string]: any;
}
export interface FormFieldAttrs {
  type?: FormItemType; // 表单字段控件类型
  name: string; // 同 antd 的属性
  label: string; // 同 antd 的属性
  rules?: RuleItem[]; // 同 antd 的属性
  required?: boolean; // 同 antd 的属性
  element?: any; //type 为 Custom 时，要渲染的内容
  attrs?: FieldAttrs;
  validateTrigger?: ValidateTriggerType | ValidateTriggerType[]; // 同 antd 的属性
  extraAttrs?: {
    example?: string; // 写在placeholder 中的文字
    valid?: ValidType; // 校验类型及控件本身必要的其他属性，例：password, phone
  };
  colAttrs?: number | ColAttrs;
}

export type FormField = BaseDataType | FormFieldAttrs;
