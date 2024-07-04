/**
 * 分块表单 - SectionForm
 */

import { forwardRef, useState, ReactNode } from "react";
import { Button, Form, Popover } from "antd";
import { CSSProperties } from "react";
import { FormItem, FormItemAttrs } from "@/components/BaseFormItem";
import { CaretDownOutlined } from "@ant-design/icons";
import { getMaxLength } from "@/utils";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "../_components/FormFields";
import FormFoot from "../_components/FormFoot";
import { BaseDataType, CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { BtnAttrs } from "../_types";
import { useInitForm } from "../_hooks";
import { QuestionCircleFilled } from "@ant-design/icons";
import s from "./index.module.less";

export interface SectionFormItemAttrs {
  title: string;
  fields: FormItem[];
  popover?: ReactNode;
}

export type SectionFormItem = BaseDataType | SectionFormItemAttrs;
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

export default forwardRef((props: Props, ref: any) => {
  const { className, loading, submitButton, resetButton, sections = [], pureText, readOnly, formAttrs } = useInitForm(props, ref);
  const [folds, setFolds] = useState<boolean[]>(Array(sections.length).fill(false));
  // 处理折叠逻辑
  function handleToggleFold(ind: number) {
    folds[ind] = !folds[ind];
    setFolds(folds.slice());
  }
  return (
    <Form className={`${className} ${s["section-form"]} f-fs-s-c`} {...formAttrs}>
      <div className={`${s.bodyer} all-hide-scroll`}>
        {sections.map((sItem: SectionFormItemAttrs, sInd: number) => {
          const { title, fields, popover } = sItem;
          const labelWidth = getMaxLength(fields as FormItemAttrs[]) + "em";
          return (
            <div className={`${s.section}`} key={sInd}>
              <div className={`${s.head} f-sb-c`}>
                <div className={`${s.title} f-fs-c`}>
                  {title}
                  {popover && (
                    <Popover content={popover}>
                      <QuestionCircleFilled className="ml-q color-info" />
                    </Popover>
                  )}
                </div>
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
        <FormFoot
          form={formAttrs.form}
          loading={loading}
          submitButton={submitButton}
          resetButton={resetButton}
          readOnly={readOnly}
        />
      )}
    </Form>
  );
});
