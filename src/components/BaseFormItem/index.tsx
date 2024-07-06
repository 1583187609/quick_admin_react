/**
 * 表单字段组件
 */

import { useMemo } from "react";
import { Form, Col } from "antd";
import { CSSProperties } from "react";
import { merge } from "lodash";
import BaseKeyVal from "@/components/BaseKeyVal";
import { ChildrenStyle, FormField, FormFieldAttrs, FormItemType } from "./_types";
import { getColAttrs, getKeyVal } from "./_utils";
import { defaultFieldAttrs, defaultValidTypes, fieldMap } from "./_config";
import { CascaderName, DictName } from "@/dict";
import { useDictMap } from "@/hooks";
import { deleteAttrs } from "../_utils";
import BaseQuestionPopover from "../BaseQuestionPopover";

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

const getSomeRequired = (children?: FormField[]): boolean => {
  if (!children) return false;
  return !!children?.some(it => {
    if (!it) return false;
    const { required, children } = it as FormFieldAttrs;
    return required || getSomeRequired(children);
  });
};

const FieldItem = ({ field, childrenStyle = "custom", ...restProps }: FieldProps) => {
  const { type, attrs, render, children } = field;
  attrs && Object.assign(attrs, restProps);
  const renderField = fieldMap[type as FormItemType];
  if (!renderField) return <div className="color-danger">不存在该类型：{type}</div>;
  if (type === "Custom") return renderField(attrs, render);
  if (type === "Children") return renderField(field, childrenStyle);
  return renderField(attrs);
};

export default ({ className = "", style, field, pureText, labelWidth, isChild, showChildLabel, ...restProps }: Props) => {
  const { getOpts, getCascaderOpts } = useDictMap();
  const fieldInfo: FormFieldAttrs = useMemo(() => {
    const { extra, render, children } = field;
    let { type = "Input" } = field;
    if (render) type = "Custom";
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

  const { colAttrs, otherAttrs, getAttrs, childrenStyle, ...fieldAttrs } = fieldInfo;
  const { render, ...standFieldAttrs } = fieldAttrs;
  return isChild ? (
    <>
      {pureText ? (
        <BaseKeyVal className="mb-o" labelStyle={{ width: labelWidth }} {...getKeyVal(fieldAttrs, pureText)} />
      ) : (
        <Form.Item
          // className={`${className}`}
          style={style}
          labelCol={{ style: { width: labelWidth } }}
          // wrapperCol={getColAttrs(colAttrs)}
          {...(showChildLabel ? fieldAttrs : deleteAttrs(fieldAttrs, ["label"]))}
        >
          <FieldItem field={fieldAttrs} />
        </Form.Item>
      )}
    </>
  ) : (
    <Col span={24} {...getColAttrs(colAttrs)}>
      {pureText ? (
        <BaseKeyVal className="mb-o" labelStyle={{ width: labelWidth }} {...getKeyVal(fieldAttrs, pureText)} />
      ) : (
        <Form.Item className={`${className}`} style={style} labelCol={{ style: { width: labelWidth } }} {...standFieldAttrs}>
          <FieldItem field={fieldAttrs} childrenStyle={childrenStyle} />
        </Form.Item>
      )}
    </Col>
  );
};
