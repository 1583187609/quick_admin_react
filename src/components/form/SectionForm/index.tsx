/**
 * 分块表单 - SectionForm
 */

import { useContext, useEffect, useImperativeHandle, forwardRef, useState, ReactNode } from "react";
import { Button, Form } from "antd";
import { CSSProperties } from "react";
import { FormItem, FormItemAttrs } from "@/components/BaseFormItem";
import { CaretDownOutlined } from "@ant-design/icons";
import { getMaxLength, convertDateField, emptyVals } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "../_components/FormFields";
import FormFoot from "../_components/FormFoot";
import { handleFinish, handleFinishFailed } from "../_utils";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "../_types";
import { defaultFormProps } from "@/components/form/_config";
import s from "./index.module.less";

export interface SectionFormItem {
  title: string;
  fields: FormItem[];
  popover?: ReactNode;
}
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
  sections?: SectionFormItem[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  readOnly?: boolean;
  pureText?: boolean;
  fetch?: FetchType;
  fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
  fetchFail?: FinallyNext; //fetch请求失败之后的回调方法
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; //是否剔除属性
  getUnFilledIndexs?: (inds: number[]) => void;
  [key: string]: any;
}

// 获取未填写完毕的分组的下标
function getUnFilledPartInds(args: CommonObj, sections: SectionFormItem[], form) {
  const inds: number[] = [];
  function getUnFilled(fields: FormItemAttrs[]) {
    if (!fields?.length) return false;
    return fields.some((field: FormItemAttrs) => {
      const { name, required } = field;
      return required && emptyVals.includes(args[name]);
    });
  }
  sections.forEach((sItem: SectionFormItem, sInd: number) => {
    if (getUnFilled(sItem.fields.filter(it => !!it) as FormItemAttrs[])) inds.push(sInd);
  });
  form.scrollToField("search");
  return inds;
}

export default forwardRef((props: Props, ref: any) => {
  const { className = "", initialValues, sections = [], submitButton, resetButton, getUnFilledIndexs, ...restProps } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { closePopup } = useContext(PopupContext);
  const allFields = sections.map(it => it.fields).flat(1);
  const initVals = convertDateField(allFields, initialValues, "set");
  const [folds, setFolds] = useState<boolean[]>([]);
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
  } = merge({ initialValues: initVals }, defaultFormProps, restProps);
  useImperativeHandle(ref, () => ({ form }), [form]);
  useEffect(() => {}, []);
  useEffect(() => {
    setFolds(Array(sections.length).fill(false));
  }, [sections]);
  useEffect(() => {
    getUnFilledIndexs?.(getUnFilledPartInds(initVals, sections, form));
  }, [initialValues, sections]);
  // 处理折叠逻辑
  function handleToggleFold(ind: number) {
    folds[ind] = !folds[ind];
    setFolds(folds.slice());
  }
  return (
    <Form
      form={form}
      className={`${className} ${s["section-form"]}  f-fs-s-c`}
      onFinish={(args: CommonObj) => handleFinish(args, allFields, props, { setLoading, closePopup, fetchSuccess, fetchFail })}
      onFinishFailed={err => handleFinishFailed(err, form)}
      {...formProps}
    >
      <div className={`${s.bodyer} all-hide-scroll`}>
        {sections.map((sItem, sInd) => {
          const { title, fields } = sItem;
          const labelWidth = getMaxLength(fields) + "em";
          return (
            <div className={`${s.section}`} key={sInd}>
              <div className={`${s.head} f-sb-c`}>
                <div className={`${s.title} f-fs-c`}>{title}</div>
                <Button
                  className={`${s["fold-btn"]}`}
                  type="link"
                  onClick={() => handleToggleFold(sInd)}
                  icon={<CaretDownOutlined className={`${s["fold-icon"]} ${folds[sInd] ? "" : "rotate-180"}`} />}
                />
              </div>
              <div className={`${s.body}`} style={{ maxHeight: folds[sInd] ? "0" : "100vh" }}>
                <FormFields fields={fields} pureText={pureText} readOnly={readOnly} labelWidth={labelWidth} />
              </div>
            </div>
          );
        })}
      </div>
      {!pureText && (
        <FormFoot form={form} loading={loading} submitButton={submitButton} resetButton={resetButton} readOnly={readOnly} />
      )}
    </Form>
  );
});
