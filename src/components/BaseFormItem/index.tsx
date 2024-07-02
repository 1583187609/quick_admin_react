/**
 * 表单字段组件
 */

import { ReactNode, useMemo } from "react";
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
} from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { CSSProperties } from "react";
import { merge } from "lodash";
import BaseKeyVal from "@/components/BaseKeyVal";
import { CheckboxGroupAttrs, ColAttrs, DateRangePickerAttrs, FormItemAttrs, RadioGroupAttrs, StandFieldAttrs } from "./_types";
import { getKeyVal } from "./_utils";
import { defaultFieldAttrs, defaultValidTypes } from "./_config";
import { CascaderName, DictName } from "@/dict";
import { useDictMap } from "@/hooks";

export * from "./_types";
export * from "./_config";

interface Props {
  className?: string;
  style?: CSSProperties;
  field: FormItemAttrs;
  widthFull?: boolean;
  readOnly?: boolean;
  pureText?: any;
  labelWidth?: string;
  [key: string]: any;
}

const Field = ({ field, ...restProps }: { field: FormItemAttrs; [key: string]: any }) => {
  const { type, attrs, element } = field;
  attrs && Object.assign(attrs, restProps);
  if (type === "Input") return <Input {...attrs} />;
  if (type === "Input.Password") return <Input.Password {...attrs} />;
  if (type === "Input.TextArea") return <Input.TextArea {...attrs} />;
  if (type === "Input.Search") return <Input.Search {...attrs} />;
  if (type === "InputNumber") return <InputNumber {...attrs} />;
  if (type === "AutoComplete") return <AutoComplete {...(attrs as StandFieldAttrs)} />;
  if (type === "Select") return <Select {...(attrs as StandFieldAttrs)} />;
  if (type === "Radio.Group") return <Radio.Group {...(attrs as RadioGroupAttrs)} />;
  if (type === "Rate") return <Rate {...attrs} />;
  if (type === "TimePicker") return <TimePicker {...attrs} />;
  if (type === "TimePicker.RangePicker") return <TimePicker.RangePicker {...(attrs as TimeRangePickerProps)} />;
  if (type === "DatePicker") return <DatePicker {...attrs} />;
  if (type === "DatePicker.RangePicker") return <DatePicker.RangePicker {...(attrs as DateRangePickerAttrs)} />;
  if (type === "Slider") return <Slider {...attrs} />;
  if (type === "Cascader") return <Cascader {...(attrs as StandFieldAttrs)} />;
  if (type === "Switch") return <Switch {...attrs} />;
  if (type === "Checkbox") return <Checkbox {...attrs} />;
  if (type === "Checkbox.Group") return <Checkbox.Group {...(attrs as CheckboxGroupAttrs)} />;
  if (type === "Custom") return element;
  return <div className="color-danger">不存在该类型：{type}</div>;
};

function getColAttrs(col?: number | ColAttrs) {
  if (typeof col === "number") return { span: col };
  return col;
}

export default ({ className = "", style, field, widthFull = false, pureText, labelWidth, ...restProps }: Props) => {
  const { getOpts, getCascaderOpts } = useDictMap();
  // const optsMap: CommonObj = {
  //   Cascader: (name: CascaderName) => getCascaderOpts(name),
  //   Select: (name: DictName) => getOpts(name),
  // };
  const { colAttrs, otherAttrs, getAttrs, ...newField }: FormItemAttrs = useMemo(() => {
    const { type = "Input", extra } = field;
    const tempField: FormItemAttrs = merge({ type }, defaultFieldAttrs[type], field);
    const { getAttrs } = tempField?.attrs ?? {};
    getAttrs && merge(tempField, { attrs: getAttrs(tempField) }, field);
    const { label = "", attrs = {}, required = false, rules, otherAttrs = {} } = tempField;
    const { valid, example, popover } = otherAttrs;
    const currValidField = valid ? defaultValidTypes[valid] : undefined;
    let { options, placeholder: phr = "" } = attrs;
    if (typeof options === "string")
      // options = optsMap[type]?.(options);
      options = type === "Cascader" ? getCascaderOpts(options as CascaderName) : getOpts(options as DictName);
    phr = phr.includes("${label}") ? phr.replace("${label}", label as string) : phr;
    if (example) phr += `，例：${example}`;
    tempField.attrs = merge(
      // { style: merge({}, { width: widthFull ? "100%" : "none" }) },
      {},
      attrs,
      currValidField?.attrs,
      { placeholder: phr, options },
      restProps
    );
    tempField.rules = [
      ...(currValidField?.rules ?? []),
      ...(required ? [{ required, message: label + "不能为空" }] : []),
      ...(rules || []),
    ];
    if (extra) tempField.extra = typeof extra === "string" ? <>注：{extra}</> : extra;
    if (popover)
      tempField.label = (
        <>
          {label}
          <Popover content={popover}>
            <QuestionCircleFilled className="ml-2 color-info" />
          </Popover>
        </>
      );
    delete tempField?.attrs?.getAttrs;
    return tempField;
  }, [field]);

  return (
    <Col span={24} {...getColAttrs(colAttrs)}>
      {pureText ? (
        <BaseKeyVal className="mb-o" labelStyle={{ width: labelWidth }} {...getKeyVal(newField, pureText)} />
      ) : (
        <Form.Item className={`${className}`} style={style} labelCol={{ style: { width: labelWidth } }} {...newField}>
          <Field field={newField} />
        </Form.Item>
      )}
    </Col>
  );
};
