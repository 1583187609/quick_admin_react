/**
 * 基础表单 - BaseForm
 */

import { useContext, useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { Button, Form, message } from "antd";
import { CSSProperties } from "react";
import BaseFormItem, { FormItem } from "@/components/BaseFormItem";
import { getMaxLength, convertDateField, omitAttrs, printLog } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "@/components/form/_components/FormFields";
import FormFoot from "@/components/form/_components/FormFoot";
// import { handleFinish, handleFinishFailed } from "@/components/form/_utils";
import { CommonObj, FetchType } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import s from "./index.module.less";
import { defaultFormProps } from "@/components/form/_config";
import { useInitForm } from "@/components/form/_hooks";

interface Props {
  className?: string;
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  fields?: FormItem[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  disabled?: boolean;
  readOnly?: boolean;
  pureText?: boolean;
  size?: SizeType;
  fetch?: FetchType;
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; //是否剔除属性
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const {
    className = "",
    fields = [],
    submitButton,
    resetButton,
    // fetch,
    // onSubmit,
    // initialValues,
    // isOmit = true,
    // log = true,
    // ...restProps
  } = props;
  const { loading, form, formProps, pureText, readOnly, labelWidth, handleFinish, handleFinishFailed } = useInitForm(props, ref);
  // const [form] = Form.useForm();
  // const { closePopup } = useContext(PopupContext);
  // const [loading, setLoading] = useState(false);
  // const labelWidth = getMaxLength(fields) + "em";
  // const newInitVals = convertDateField(fields, initialValues, "set");
  // const {
  //   pureText,
  //   readOnly = false,
  //   isOmit,
  //   log,
  //   fetch,
  //   onSubmit,
  //   ...formProps
  // } = merge({ initialValues: newInitVals }, defaultFormProps, restProps);
  // useImperativeHandle(ref, () => {
  //   form;
  // });
  return (
    <Form
      form={form}
      className={`${className} ${s["base-form"]}  f-fs-s-c`}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
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
