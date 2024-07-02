import { FormField } from "@/components/BaseFormItem";
import { convertDateField, omitAttrs, printLog, showMessage } from "@/utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import { message } from "antd";
import { BtnAttrs } from "@/components/form/_types";
import { ClosePopupType } from "@/components/provider/PopupProvider";

export function getBtnProps(btn: string | BtnAttrs): BtnAttrs {
  if (typeof btn === "string") return { children: btn };
  return btn;
}

export function handleFinish(params: CommonObj, fields: FormField[] = [], props: CommonObj, other: CommonObj) {
  const { readOnly, isOmit = true, log = true, onSubmit, fetch, submitButton = "提交" } = props;
  const text = getBtnProps(submitButton).children;
  const { setLoading, closePopup, fetchSuccess = fetchSucCb, fetchFail } = other;
  //请求成功之后的回调函数
  function fetchSucCb(hint = props.submitText + "成功！", closeType?: ClosePopupType, cb?: () => void, isRefreshList = true) {
    showMessage(hint);
    closePopup(closeType);
    cb?.();
  }
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
        log && printLog(res, "res");
        fetchSuccess?.(`${text}成功！`);
      })
      .catch((err: any) => {
        fetchFail?.(err);
      })
      .finally(() => setLoading(false));
  }
}

// 处理表单提交时，校验未通过时的逻辑
export function handleFinishFailed(err: CommonObj) {
  const tips = err.errorFields?.[0]?.errors?.[0];
  message.error(tips);
}
