/**
 * 分块表单 - SectionForm
 */

import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { Button, Form, message } from "antd";
import { CSSProperties } from "react";
import BaseFormItem, { FormField } from "@/components/BaseFormItem";
import { CaretDownOutlined } from "@ant-design/icons";
import { getMaxLength, convertDateField, omitAttrs, printLog } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { SizeType } from "antd/es/config-provider/SizeContext";
import FormFields from "../_components/FormFields";
import FormFoot from "../_components/FormFoot";
import { handleFinish, handleFinishFailed } from "../_utils";
import { CommonObj } from "@/vite-env";
import { BtnAttrs } from "../_types";
import { defaultFormProps } from "@/components/form/_config";
import s from "./index.module.less";

export type FullType = "autoFull" | "allFull" | ""; //autoFull，撑满时，按钮才固定在底部，否则，跟随移动；allFull：按钮始终固定在底部
export interface SectionFormItem {
  title: string;
  fields: FormField[];
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
  loadData?: CommonObj; //请求加载的数据
  sections?: SectionFormItem[];
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  readOnly?: boolean;
  pureText?: boolean;
  // formItemWidthFull?: boolean;
  onSubmit?: (data: CommonObj, next: () => void) => void;
  isOmit?: boolean; //是否剔除属性
  // fullType?: FullType; //是否自动撑满，是否自动滚动
  [key: string]: any;
}

export default forwardRef((props: Props, ref: any) => {
  const {
    className = "",
    initialValues,
    loadData,
    sections = [],
    submitButton,
    resetButton,
    // onSubmit,
    // formItemWidthFull,
    // fullType = "allFull",
    // isOmit = true,
    // log = true,
    ...restProps
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { closePopup } = useContext(PopupContext);
  const allFields = sections.map(it => it.fields).flat(1);
  const newInitVals = convertDateField(allFields, initialValues, "set");
  const newLoadData = convertDateField(allFields, loadData, "set");
  const formData: CommonObj = merge({}, newInitVals, newLoadData);
  const [folds, setFolds] = useState<boolean[]>([]);
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
  useEffect(() => {
    setFolds(Array(sections.length).fill(false));
  }, [sections]);
  // 处理折叠逻辑
  function handleToggleFold(ind: number) {
    folds[ind] = !folds[ind];
    setFolds(folds.slice());
  }
  return (
    <Form
      form={form}
      className={`${className} ${s["section-form"]}  f-fs-s-c`} //${s[fullType]}
      onFinish={(args: CommonObj) => handleFinish(args, allFields, props, { setLoading, closePopup })}
      onFinishFailed={handleFinishFailed}
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
                <FormFields
                  fields={fields}
                  pureText={pureText}
                  formData={formData}
                  readOnly={readOnly}
                  // formItemWidthFull={formItemWidthFull}
                  labelWidth={labelWidth}
                />
              </div>
            </div>
          );
        })}
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
