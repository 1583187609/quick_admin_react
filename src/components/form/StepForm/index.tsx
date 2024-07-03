/**
 * 基础表单 - BaseForm
 */

import { useContext, useImperativeHandle, forwardRef, useState, useMemo, useRef, useEffect } from "react";
import { Steps } from "antd";
import { CSSProperties } from "react";
import { FormItem } from "@/components/BaseFormItem";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import SectionForm, { SectionFormItem } from "../SectionForm";
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
  fields?: FormItem[];
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

export default forwardRef(({ className = "", style, stepsAttrs, ...restProps }: Props, ref: any) => {
  const [currStep, setCurrStep] = useState(0);
  const steps =
    restProps?.sections.map((item: SectionFormItem) => {
      const { title, popover } = item;
      return {
        title,
        description: popover,
      };
    }) ?? [];
  function handleGetInds(inds: number[]) {
    setCurrStep(inds[0] ?? 0);
  }
  return (
    <div className={`${className} ${s["step-form"]} f-sb-s`} style={style}>
      <Steps className={`${s.steps} mr-t f-0`} items={steps} direction="vertical" {...stepsAttrs} current={currStep} />
      <SectionForm className="f-1" getUnFilledIndexs={handleGetInds} {...restProps} />
    </div>
  );
});
