/**
 * 基础表单 - BaseForm
 */

import { useContext, useImperativeHandle, forwardRef, useState } from "react";
import { Form } from "antd";
import { CSSProperties } from "react";
import { FormField } from "@/components/BaseFormItem";
import { getMaxLength, convertDateField } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "@/components/form/_components/FormFields";
import FormFoot from "@/components/form/_components/FormFoot";
import { handleFinish, handleFinishFailed } from "@/components/form/_utils";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import { defaultFormProps } from "@/components/form/_config";
import s from "./index.module.less";

export type FullType = "autoFull" | "allFull" | ""; //autoFull，撑满时，按钮才固定在底部，否则，跟随移动；allFull：按钮始终固定在底部
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
  // formItemWidthFull?: boolean;
  fetch?: FetchType;
  fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
  fetchFail?: FinallyNext; //fetch请求失败之后的回调方法
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; // 表单提交时，是否剔除空的属性
  // fullType?: FullType; //是否自动撑满，是否自动滚动
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const {
    className = "",
    initialValues,
    fields = [],
    submitButton,
    resetButton,
    // fetch,
    // onSubmit,
    // formItemWidthFull,
    // fullType = "allFull",
    // isOmit = true,
    // log = true,
    ...restProps
  } = props;
  const [form] = Form.useForm();
  const { closePopup } = useContext(PopupContext);
  const [loading, setLoading] = useState(false);
  const labelWidth = getMaxLength(fields) + "em";
  const newInitVals = convertDateField(fields, initialValues, "set");
  const formData: CommonObj = merge({}, newInitVals);
  const {
    pureText,
    readOnly = false,
    isOmit,
    log,
    fetch,
    fetchSuccess,
    fetchFail,
    onSubmit,
    ...formProps
  } = merge({ initialValues: newInitVals }, defaultFormProps, restProps);
  useImperativeHandle(ref, () => {
    form;
  });
  return (
    <Form
      form={form}
      className={`${className} ${s["base-form"]}  f-fs-s-c`} //${s[fullType]}
      onFinish={(args: CommonObj) => handleFinish(args, fields, props, { setLoading, closePopup, fetchSuccess, fetchFail })}
      onFinishFailed={handleFinishFailed}
      {...formProps}
    >
      <div className={`${s.bodyer} all-hide-scroll`}>
        <FormFields
          fields={fields}
          pureText={pureText}
          formData={formData}
          readOnly={readOnly}
          // formItemWidthFull={formItemWidthFull}
          labelWidth={labelWidth}
        />
      </div>
      {!pureText && (
        <FormFoot form={form} loading={loading} submitButton={submitButton} resetButton={resetButton} readOnly={readOnly} />
      )}
    </Form>
  );
});
