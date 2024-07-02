/**
 * 基础表单 - BaseForm
 */

import { useContext, useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { Button, Form, message } from "antd";
import { CSSProperties } from "react";
import BaseFormItem, { FormField } from "@/components/BaseFormItem";
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

export type FullType = "autoFull" | "allFull" | ""; //autoFull，撑满时，按钮才固定在底部，否则，跟随移动；allFull：按钮始终固定在底部
interface Props {
  className?: string;
  loadData?: CommonObj; //请求加载的数据
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  fields?: FormField[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  disabled?: boolean;
  readOnly?: boolean;
  pureText?: boolean;
  // formItemWidthFull?: boolean;
  size?: SizeType;
  fetch?: FetchType;
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; //是否剔除属性
  // fullType?: FullType; //是否自动撑满，是否自动滚动
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const {
    className = "",
    loadData,
    fields = [],
    submitButton,
    resetButton,
    // fetch,
    // onSubmit,
    // formItemWidthFull,
    // fullType = "allFull",
    // initialValues,
    // isOmit = true,
    // log = true,
    // ...restProps
  } = props;
  const { loading, form, formProps, pureText, formData, readOnly, labelWidth, newLoadData, handleFinish, handleFinishFailed } =
    useInitForm(props, ref);
  // const [form] = Form.useForm();
  // const { closePopup } = useContext(PopupContext);
  // const [loading, setLoading] = useState(false);
  // const labelWidth = getMaxLength(fields) + "em";
  // const newInitVals = convertDateField(fields, initialValues, "set");
  // const newLoadData = convertDateField(fields, loadData, "set");
  // const formData: CommonObj = merge({}, newInitVals, newLoadData);
  // const {
  //   pureText,
  //   readOnly = false,
  //   isOmit,
  //   log,
  //   fetch,
  //   onSubmit,
  //   ...formProps
  // } = merge({ initialValues: newInitVals }, defaultFormProps, restProps);
  // useEffect(() => {
  //   form.setFieldsValue(newLoadData);
  // }, [newLoadData]);
  // useImperativeHandle(ref, () => {
  //   form;
  // });
  return (
    <Form
      form={form}
      className={`${className} ${s["base-form"]}  f-fs-s-c`} //${s[fullType]}
      onFinish={handleFinish}
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
        <FormFoot
          form={form}
          loading={loading}
          submitButton={submitButton}
          resetButton={resetButton}
          readOnly={readOnly}
          loadData={loadData}
          newLoadData={newLoadData}
        />
      )}
    </Form>
  );
});
