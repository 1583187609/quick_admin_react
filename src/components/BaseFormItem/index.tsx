/**
 * 文件说明-模板文件
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
} from "antd";
import { CSSProperties } from "react";
import { merge } from "lodash";
import BaseKeyVal from "../BaseKeyVal";
import s from "./index.module.less";
import { FieldItem } from "./_types";
import { getKeyVal } from "./_utils";
import { defaultFieldAttrs, defaultValidTypes } from "./_config";

export * from "./_types";
export * from "./_config";

interface Props {
  className?: string;
  style?: CSSProperties;
  field: FieldItem;
  widthFull?: boolean;
  readOnly?: boolean;
  pureText?: any;
  labelWidth?: string;
  showCount?: boolean;
  [key: string]: any;
}

const Field = ({
  field,
  ...restProps
}: {
  field: FieldItem;
  [key: string]: any;
}) => {
  const { type, attrs, custom } = field;
  Object.assign(attrs, restProps);
  if (type === "Input") return <Input {...attrs} />;
  if (type === "Input.Password") return <Input.Password {...attrs} />;
  if (type === "Input.TextArea") return <Input.TextArea {...attrs} />;
  if (type === "Input.Search") return <Input.Search {...attrs} />;
  if (type === "InputNumber") return <InputNumber {...attrs} />;
  if (type === "AutoComplete") return <AutoComplete {...attrs} />;
  if (type === "Select") return <Select {...attrs} />;
  if (type === "Radio.Group") return <Radio.Group {...attrs} />;
  if (type === "Rate") return <Rate {...attrs} />;
  if (type === "TimePicker") return <TimePicker {...attrs} />;
  if (type === "TimePicker.RangePicker")
    return <TimePicker.RangePicker {...attrs} />;
  if (type === "DatePicker") return <DatePicker {...attrs} />;
  if (type === "DatePicker.RangePicker")
    return <DatePicker.RangePicker {...attrs} />;
  if (type === "Slider") return <Slider {...attrs} />;
  if (type === "Cascader") return <Cascader {...attrs} />;
  if (type === "Switch") return <Switch {...attrs} />;
  if (type === "Checkbox") return <Checkbox {...attrs} />;
  if (type === "Checkbox.Group") return <Checkbox.Group {...attrs} />;
  if (type === "Custom") return custom;
  return <div className={s.error}>类型错误：{type}</div>;
};

export default ({
  className = "",
  style,
  field,
  widthFull = false,
  pureText,
  labelWidth,
  // showCount = false,
  ...restProps
}: Props) => {
  const { colAttrs, ...newField }: FieldItem = useMemo(() => {
    const type = field.type || "Input";
    const tempField: FieldItem = merge(
      {},
      { type, ...defaultFieldAttrs[type] },
      field
    );
    const {
      label = "",
      attrs,
      required = false,
      rules,
      valid,
      example,
    } = tempField;
    const currValidField = (valid ? defaultValidTypes[valid] : {}) || {};
    let phr = attrs?.placeholder || "";
    phr = phr.includes("${label}") ? phr.replace("${label}", label) : phr;
    if (example) {
      phr += `，例：${example}`;
    }
    tempField.attrs = merge(
      // { style: merge({}, { width: widthFull ? "100%" : "none" }) },
      {},
      attrs,
      currValidField.attrs,
      {
        placeholder: phr,
        // showCount,
      },
      restProps
    );
    tempField.rules = [
      ...(currValidField.rules || []),
      ...(required ? [{ required, message: label + "不能为空" }] : []),
      ...(rules || []),
    ];
    return tempField;
  }, [field]);

  return (
    <Col span={24} {...colAttrs}>
      {pureText ? (
        <BaseKeyVal
          className="mb-one"
          labelStyle={{ width: labelWidth }}
          {...getKeyVal(newField, pureText)}
        />
      ) : (
        <Form.Item
          className={`${className}`}
          style={style}
          labelCol={{ style: { width: labelWidth } }}
          {...newField}
        >
          <Field field={newField} />
        </Form.Item>
      )}
    </Col>
  );
};
