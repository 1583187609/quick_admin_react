import { CSSProperties } from "react";

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
export interface FieldItem {
  label: string;
  name?: string;
  rules?: any[];
  type?: FormItemType;
  custom?: any;
  attrs?: FieldAttrs;
  example?: string;
  required?: boolean;
  valid?: any;
  validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
  colAttrs?: {
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
  };
}
