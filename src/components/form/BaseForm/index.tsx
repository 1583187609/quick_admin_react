/**
 * 基础表单 - BaseForm
 */

import { ReactNode, forwardRef } from "react";
import { Form } from "antd";
import { CSSProperties } from "react";
import { FormField } from "@/components/BaseFormItem";
import { getMaxLength } from "@/components/_utils";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "@/components/form/_components/FormFields";
import FormFoot from "@/components/form/_components/FormFoot";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import { useInitForm } from "../_hooks";
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
  footer?: ReactNode;
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const { className, loading, submitButton, resetButton, fields, pureText, readOnly, footer, formAttrs } = useInitForm(
    props,
    ref
  );
  const labelWidth = getMaxLength(fields) + "em";
  return (
    <Form className={`${className} ${s["base-form"]}  f-fs-s-c`} {...formAttrs}>
      <div className={`${s.bodyer} all-hide-scroll`}>
        <FormFields fields={fields} pureText={pureText} readOnly={readOnly} labelWidth={labelWidth} />
      </div>
      {!pureText && footer === true ? (
        <FormFoot
          form={formAttrs.form}
          loading={loading}
          submitButton={submitButton}
          resetButton={resetButton}
          readOnly={readOnly}
        />
      ) : (
        footer
      )}
    </Form>
  );
});
