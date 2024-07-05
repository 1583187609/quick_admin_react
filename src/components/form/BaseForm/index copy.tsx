/**
 * 基础表单 - BaseForm
 */

import { useContext, useImperativeHandle, forwardRef, useState, useCallback } from "react";
import { Form } from "antd";
import { CSSProperties } from "react";
import { FormField } from "@/components/BaseFormItem";
import { getMaxLength, convertDateField, debounce } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "@/components/form/_components/FormFields";
import FormFoot from "@/components/form/_components/FormFoot";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import { defaultFormProps } from "@/components/form/_config";
import s from "./index.module.less";

interface Props {
  /**
   * 以下是继承 antd 的属性
   */
  className?: string;
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  disabled?: boolean;
  size?: SizeType;
  /**
   * 以下是自定义的属性
   */
  fields?: FormField[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  readOnly?: boolean;
  pureText?: boolean;
  fetch?: FetchType;
  fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
  fetchFail?: FinallyNext; //fetch请求失败之后的回调方法
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; // 表单提交时，是否剔除空的属性
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const { className = "", initialValues, fields = [], submitButton, resetButton, ...restProps } = props;
  const [form] = Form.useForm();
  const { closePopup } = useContext(PopupContext);
  const [loading, setLoading] = useState(false);
  const labelWidth = getMaxLength(fields) + "em";
  const initVals = convertDateField(fields, initialValues, "set");
  const {
    pureText,
    readOnly = false,
    isOmit,
    log,
    fetch,
    fetchSuccess,
    fetchFail,
    onSubmit,
    onValuesChange,
    ...formProps
  } = merge({ initialValues: initVals }, defaultFormProps, restProps);
  useImperativeHandle(ref, () => ({ form }), [form]);
  const debounceHandleFinish = useCallback(
    debounce((args: CommonObj) => handleFinish(args, fields, props, { setLoading, closePopup, fetchSuccess, fetchFail })),
    []
  );
  // 防抖处理 onValuesChange 事件
  const handelValuesChange = useCallback(
    debounce((vals: CommonObj, allVals: CommonObj) => onValuesChange?.(vals, allVals)),
    []
  );
  return (
    <Form
      form={form}
      className={`${className} ${s["base-form"]}  f-fs-s-c`}
      onFinish={debounceHandleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handelValuesChange}
      {...formProps}
    >
      <div className={`${s.bodyer} all-hide-scroll`}>
        <FormFields fields={fields} pureText={pureText} readOnly={readOnly} labelWidth={labelWidth} />
      </div>
      {!pureText && (
        <FormFoot form={form} loading={loading} submitButton={submitButton} resetButton={resetButton} readOnly={readOnly} />
      )}
    </Form>
  );
});
