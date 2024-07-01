/**
 * 基础表单 - BaseForm
 */

import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { Form, message } from "antd";
import { getMaxLength, convertDateField, omitAttrs, printLog, showMessage } from "@/utils";
import { merge } from "lodash";
import { PopupContext } from "@/components/provider/PopupProvider";
import { CommonObj } from "@/vite-env";
import { BtnAttrs } from "@/components/form/_types";
import { defaultFormProps } from "@/components/form/_config";

export function getBtnProps(btn: string | BtnAttrs): BtnAttrs {
  if (typeof btn === "string") return { children: btn };
  return btn;
}

export default (props: CommonObj, ref: any) => {
  const { className = "", loadData, fields = [], submitButton, resetButton, initialValues, ...restProps } = props;
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
  // 暂时先不使用，后面看情况再提取复用逻辑
  return {
    form,
    loading,
    labelWidth,
    formData,
    formProps,
    pureText,
    readOnly,
    newLoadData,
    // 处理提交校验成功时的逻辑
    handleFinish(params: CommonObj) {
      const { readOnly, isOmit = true, log = true, onSubmit, fetch, submitButton = "提交" } = props;
      const text = getBtnProps(submitButton).children;
      if (readOnly) return message.info("只读模式 - 不可提交");
      const newParams = convertDateField(fields, isOmit ? omitAttrs(params) : params);
      log && printLog(newParams, "req");
      setLoading(true);
      if (!fetch && !onSubmit) {
        setLoading(false);
        return showMessage(`暂未处理【${text}】事件`, "error");
      }
      if (onSubmit) {
        onSubmit(newParams, (msg = `${text}成功！`) => {
          showMessage(msg);
          setLoading(false);
          closePopup?.();
        });
      } else {
        fetch(newParams)
          .then((res: any) => {
            message.success(`${text}成功！`);
            closePopup?.();
          })
          .finally(() => setLoading(false));
      }
    },
    // 处理表单提交时，校验未通过时的逻辑
    handleFinishFailed(err: CommonObj) {
      const tips = err.errorFields?.[0]?.errors?.[0];
      message.error(tips);
    },
  };
};
