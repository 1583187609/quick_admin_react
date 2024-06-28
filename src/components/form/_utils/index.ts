import { FieldItem } from "@/components/BaseFormItem";
import { convertDateField, omitAttrs, printLog, showMessage } from "@/utils";
import { message } from "antd";

export function handleFinish(
  params: CommonObj,
  fields: FieldItem[] = [],
  props: CommonObj,
  other: CommonObj
) {
  const {
    readOnly,
    isOmit = true,
    log = true,
    onSubmit,
    fetch,
    submitText = "提交",
  } = props;
  const { setLoading, closePopup } = other;
  if (readOnly) return message.info("只读模式 - 不可提交");
  const newParams = convertDateField(
    fields,
    isOmit ? omitAttrs(params) : params
  );
  log && printLog(newParams, "req");
  setLoading(true);
  if (!fetch && !onSubmit) {
    setLoading(false);
    return showMessage(`暂未处理【${submitText}】事件`, "error");
  }
  if (onSubmit) {
    onSubmit(newParams, (msg = `${submitText}成功！`) => {
      showMessage(msg);
      setLoading(false);
      closePopup?.();
    });
  } else {
    fetch(newParams)
      .then((res: any) => {
        message.success(`${submitText}成功！`);
        closePopup?.();
      })
      .finally(() => setLoading(false));
  }
}

// 处理表单提交时，校验未通过时的逻辑
export function handleFinishFailed(err: CommonObj) {
  const tips = err.errorFields?.[0]?.errors?.[0];
  message.error(tips);
}
