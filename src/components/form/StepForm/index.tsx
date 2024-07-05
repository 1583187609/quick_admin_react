/**
 * 基础表单 - StepForm
 */

import { useImperativeHandle, forwardRef, useState } from "react";
import { Steps } from "antd";
import { CSSProperties } from "react";
import { FormField } from "@/components/BaseFormItem";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import SectionForm, { SectionFormItem, SectionFormItemAttrs } from "../SectionForm";
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
  stepsAttrs?: CommonObj;
  [key: string]: any;
}

const defaultStepAttrs: CommonObj = {
  direction: "vertical",
};
export default forwardRef(({ className = "", stepsAttrs, ...restProps }: Props, ref: any) => {
  const [currStep, setCurrStep] = useState(0);
  const newStepAttrs = Object.assign({}, defaultStepAttrs, stepsAttrs);
  const isVertical = newStepAttrs.direction === "vertical";
  const steps = restProps?.sections?.map((item: SectionFormItem) => {
    if (!item) return false;
    const { title, popover } = item as SectionFormItemAttrs;
    return { title, description: popover };
  });
  function handleGetInds(inds: number[]) {
    setCurrStep(inds[0] ?? 0);
  }
  return isVertical ? (
    <div className={`${className} ${s["step-form"]} f-sb-s`}>
      <Steps
        className={`${newStepAttrs.className ?? ""} ${s.steps} mr-t f-0`}
        {...newStepAttrs}
        items={steps}
        current={currStep}
      />
      <SectionForm className="f-1" getUnFilledIndexs={handleGetInds} {...restProps} />
    </div>
  ) : (
    <>
      <Steps
        className={`${newStepAttrs.className ?? ""} ${s.steps} ${isVertical ? "mr-t" : "mb-h"} f-0`}
        {...newStepAttrs}
        items={steps}
        current={currStep}
      />
      <SectionForm className="f-1" getUnFilledIndexs={handleGetInds} {...restProps} />
    </>
  );
});
