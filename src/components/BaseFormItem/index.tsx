/**
 * 表单字段组件
 */

import { useMemo } from "react";
import {
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  AutoComplete,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Col,
  TimeRangePickerProps,
  Popover,
  Space,
} from "antd";
import { CSSProperties } from "react";
import { merge } from "lodash";
import BaseKeyVal from "@/components/BaseKeyVal";
import {
  CheckboxGroupAttrs,
  ChildrenStyle,
  DateRangePickerAttrs,
  FormField,
  FormFieldAttrs,
  RadioGroupAttrs,
  StandFieldAttrs,
} from "./_types";
import { getColAttrs, getKeyVal } from "./_utils";
import { defaultFieldAttrs, defaultValidTypes } from "./_config";
import { CascaderName, DictName } from "@/dict";
import { useDictMap } from "@/hooks";
import { deleteAttrs } from "../_utils";
import AddDelList from "./_components/AddDelList";
import BaseQuestionPopover from "../BaseQuestionPopover";
import BaseNumberRange from "../BaseNumberRange";

export * from "./_types";
export * from "./_config";

interface Props {
  className?: string;
  style?: CSSProperties;
  field: FormFieldAttrs;
  readOnly?: boolean;
  pureText?: any;
  labelWidth?: string;
  isChild?: boolean;
  showChildLabel?: boolean;
  [key: string]: any;
}

interface FieldProps {
  field: FormFieldAttrs;
  childrenStyle?: ChildrenStyle;
  [key: string]: any;
}
const Field = ({ field, childrenStyle = "custom", ...restProps }: FieldProps) => {
  const { type, attrs, element, children } = field;
  attrs && Object.assign(attrs, restProps);
  if (type === "Input") return <Input {...attrs} />;
  if (type === "Password") return <Input.Password {...attrs} />;
  if (type === "TextArea") return <Input.TextArea {...attrs} />;
  if (type === "Search") return <Input.Search {...attrs} />;
  if (type === "InputNumber") return <InputNumber {...attrs} />;
  if (type === "AutoComplete") return <AutoComplete {...(attrs as StandFieldAttrs)} />;
  if (type === "Select") return <Select {...(attrs as StandFieldAttrs)} />;
  if (type === "RadioGroup") return <Radio.Group {...(attrs as RadioGroupAttrs)} />;
  if (type === "Rate") return <Rate {...attrs} />;
  if (type === "TimePicker") return <TimePicker {...attrs} />;
  if (type === "TimeRangePicker") return <TimePicker.RangePicker {...(attrs as TimeRangePickerProps)} />;
  if (type === "DatePicker") return <DatePicker {...attrs} />;
  if (type === "DateRangePicker") return <DatePicker.RangePicker {...(attrs as DateRangePickerAttrs)} />;
  if (type === "Slider") return <Slider {...attrs} />;
  if (type === "Cascader") return <Cascader {...(attrs as StandFieldAttrs)} />;
  if (type === "Switch") return <Switch {...attrs} />;
  if (type === "Checkbox") return <Checkbox {...attrs} />;
  if (type === "CheckboxGroup") return <Checkbox.Group {...(attrs as CheckboxGroupAttrs)} />;
  if (type === "BaseNumberRange") return <BaseNumberRange {...attrs} />;
  if (type === "Custom") return element;
  if (type === "Children") {
    const formItems = children?.map((field: FormField, ind: number) => {
      if (!field) return null;
      return <BaseFormItem field={field as FormFieldAttrs} isChild key={ind} />;
    });
    if (childrenStyle === "compact") return <Space.Compact>{formItems}</Space.Compact>;
    if (childrenStyle === "addDel") return <AddDelList formItems={formItems} />;
    return formItems;
  }
  return <div className="color-danger">不存在该类型：{type}</div>;
};

const getSomeRequired = (children: FormField[]) => {
  return !!children?.some(it => {
    if (!it) return false;
    return (it as FormFieldAttrs).required;
  });
};

function BaseFormItem({ className = "", style, field, pureText, labelWidth, isChild, showChildLabel, ...restProps }: Props) {
  const { getOpts, getCascaderOpts } = useDictMap();
  const { colAttrs, otherAttrs, getAttrs, childrenStyle, ...newField }: FormFieldAttrs = useMemo(() => {
    const { extra, element, children } = field;
    let { type = "Input" } = field;
    if (element) type = "Custom";
    else if (children) type = "Children";
    const tempField: FormFieldAttrs = merge({}, defaultFieldAttrs[type], field, { type });
    const { getAttrs } = tempField?.attrs ?? {};
    getAttrs && merge(tempField, { attrs: getAttrs(tempField) }, field);
    const { label = "", attrs = {}, required = children ? getSomeRequired(children) : false, rules, otherAttrs = {} } = tempField;
    const { valid, example, popover } = otherAttrs;
    const currValidField = valid ? defaultValidTypes[valid] : undefined;
    let { options, placeholder: phr = "" } = attrs;
    if (typeof options === "string")
      options = type === "Cascader" ? getCascaderOpts(options as CascaderName) : getOpts(options as DictName);
    phr = phr.includes("{label}") ? phr.replace("{label}", label as string) : phr;
    if (example) phr += `，例：${example}`;
    tempField.attrs = merge({}, attrs, currValidField?.attrs, { placeholder: phr, options }, restProps);
    tempField.required = required;
    tempField.rules = [
      ...(currValidField?.rules ?? []),
      ...(required && !children ? [{ required, message: `${label}不能为空` }] : []),
      ...(rules || []),
    ];
    if (extra) tempField.extra = typeof extra === "string" ? <>注：{extra}</> : extra;
    if (popover)
      tempField.label = (
        <>
          {label}
          <BaseQuestionPopover content={popover} />
        </>
      );
    delete tempField?.attrs?.getAttrs;
    return tempField;
  }, [field]);

  return isChild ? (
    <>
      {pureText ? (
        <BaseKeyVal className="mb-o" labelStyle={{ width: labelWidth }} {...getKeyVal(newField, pureText)} />
      ) : (
        <Form.Item
          // className={`${className}`}
          style={style}
          labelCol={{ style: { width: labelWidth } }}
          // wrapperCol={getColAttrs(colAttrs)}
          {...(showChildLabel ? newField : deleteAttrs(newField, ["label"]))}
        >
          <Field field={newField} />
        </Form.Item>
      )}
    </>
  ) : (
    <Col span={24} {...getColAttrs(colAttrs)}>
      {pureText ? (
        <BaseKeyVal className="mb-o" labelStyle={{ width: labelWidth }} {...getKeyVal(newField, pureText)} />
      ) : (
        <Form.Item className={`${className}`} style={style} labelCol={{ style: { width: labelWidth } }} {...newField}>
          <Field field={newField} childrenStyle={childrenStyle} />
        </Form.Item>
      )}
    </Col>
  );
}
export default BaseFormItem;
