import { BaseDataType, CommonObj, OptionItem } from "@/vite-env";
import { CSSProperties, ReactNode, RefAttributes } from "react";
import { defaultValidTypes, fieldMap } from "./_config";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { Dayjs } from "dayjs";
import { PickerLocale, RangePickerDateProps } from "antd/es/date-picker/generatePicker";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RadioGroupProps } from "antd";
import { CascaderName, DictName } from "@/dict";

export type FormItemType = keyof typeof fieldMap;
export type ValidType = keyof typeof defaultValidTypes;

export type ValidateTriggerType = "onBlur" | "onChange";
export interface FieldAttrs {
  style?: CSSProperties;
  placeholder?: string;
  allowClear?: boolean;
  /** Select **/
  options?: DictName | CascaderName | OptionItem[]; // 当type为cascader或select时，options的名称 或 直接的options选项
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

// 标准的表单字段项
export interface StandFieldAttrs extends FieldAttrs {
  options?: OptionItem[]; // 当type为cascader或select时，options的名称 或 直接的options选项
}

export type PlacementTypes = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
export type RadioGroupAttrs = Omit<RadioGroupProps & RefAttributes<HTMLDivElement>, "ref">;
export type CheckboxGroupAttrs = Omit<CheckboxGroupProps & RefAttributes<HTMLDivElement>, "ref">;
export type DateRangePickerAttrs = Readonly<
  Omit<RangePickerDateProps<Dayjs>, "locale" | "generateConfig" | "hideHeader" | "components"> & {
    locale?: PickerLocale;
    size?: SizeType;
    placement?: PlacementTypes;
    bordered?: boolean;
    status?: "error" | "warning";
  }
>;
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

export interface StandardFormFieldAttrs {
  value?: string;
  onChange?: (val: string) => void;
  [key: string]: any;
}
export interface FormFieldAttrs {
  type?: FormItemType; // 表单字段控件类型
  name: string; // 同 antd 的属性
  label: ReactNode; // 同 antd 的属性
  rules?: RuleItem[]; // 同 antd 的属性
  required?: boolean; // 同 antd 的属性
  render?: (attrs: StandardFormFieldAttrs) => ReactNode; //type 为 Custom 时，要渲染的内容
  extra?: ReactNode;
  attrs?: FieldAttrs;
  validateTrigger?: ValidateTriggerType | ValidateTriggerType[]; // 同 antd 的属性
  otherAttrs?: {
    popover?: string;
    example?: string; // 写在placeholder 中的文字
    valid?: ValidType; // 校验类型及控件本身必要的其他属性，例：password, phone
  };
  colAttrs?: number | ColAttrs;
  children?: FormField[];
  [key: string]: any; //其他antd Form.Item 的属性
}

export type FormField = BaseDataType | FormFieldAttrs;

export interface PopoverAttrs {
  content?: ReactNode | (() => ReactNode);
  title?: ReactNode | (() => ReactNode);
}

export type ChildrenStyle = "custom" | "expand" | "compact" | "addDel"; //自定义方式，行撑满，紧凑型, 加减行

export interface DefaultFieldAttrs {
  // [key in FormItemType]: {
  [key: string]: {
    valuePropName?: string;
    attrs?: {
      getAttrs?: (field: FormFieldAttrs) => FieldAttrs | undefined;
      [key: string]: any;
    };
  };
}
