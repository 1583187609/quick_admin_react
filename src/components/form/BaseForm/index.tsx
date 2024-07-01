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
import FormFields from "../_components/FormFields";
import FormFoot from "../_components/FormFoot";
import { handleFinish, handleFinishFailed } from "../_utils";
import { CommonObj, FetchType } from "@/vite-env";
import { BtnAttrs } from "../_types";
import s from "./index.module.less";
import { defaultFormProps } from "@/components/form/_config";

export type FullType = "autoFull" | "allFull" | ""; //autoFull，撑满时，按钮才固定在底部，否则，跟随移动；allFull：按钮始终固定在底部
interface Props {
  className?: string;
  loadData?: CommonObj; //请求加载的数据
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  autoComplete?: string;
  fields?: FormField[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  // showCount?: boolean;
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
    // showCount = true,
    // fetch,
    // onSubmit,
    // formItemWidthFull,
    // fullType = "allFull",
    initialValues,
    // isOmit = true,
    // log = true,
    ...restProps
  } = props;
  const [form] = Form.useForm();
  const { closePopup } = useContext(PopupContext);
  const [loading, setLoading] = useState(false);
  const labelWidth = getMaxLength(fields) + "em";
  const newInitVals = convertDateField(fields, initialValues, "set");
  const newLoadData = convertDateField(fields, loadData, "set");
  const formData: CommonObj = merge({}, newInitVals, newLoadData);
  const {
    pureText,
    readOnly = false,
    isOmit,
    log,
    fetch,
    onSubmit,
    ...formProps
  } = merge({ initialValues: newInitVals }, defaultFormProps, restProps);
  useImperativeHandle(ref, () => {
    form;
  });
  useEffect(() => {
    form.setFieldsValue(newLoadData);
  }, [newLoadData]);
  return (
    <Form
      form={form}
      className={`${className} ${s["base-form"]}  f-fs-s-c`} //${s[fullType]}
      onFinish={(args: CommonObj) => handleFinish(args, fields, props, { setLoading, closePopup })}
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
          // showCount={showCount}
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
