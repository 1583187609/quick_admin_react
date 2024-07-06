import { Form } from "antd";
import { useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { CommonObj } from "@/vite-env";
import { convertDateField, debounce, emptyVals, omitAttrs, printLog, showMessage } from "@/components/_utils";
import { SectionFormField, SectionFormFieldAttrs } from "../SectionForm";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { ClosePopupType, PopupContext } from "@/components/provider/PopupProvider";
import { defaultFormProps } from "../_config";
import { getBtnProps } from "../_utils";
import { BtnAttrs } from "../_types";

// 获取未填写完毕的分组的下标
const getUnFilledInds = (sections: SectionFormField[], args: CommonObj) => {
  const inds: number[] = [];
  const getUnFilled = (fields: FormFieldAttrs[]) => {
    if (!fields?.length) return false;
    return fields.some((field: FormFieldAttrs) => {
      const { name, required } = field;
      return required && emptyVals.includes(args[name]);
    });
  };
  sections.forEach((sItem: SectionFormField, sInd: number) => {
    if (!sItem) return;
    if (getUnFilled((sItem as SectionFormFieldAttrs).fields.filter(it => !!it) as FormFieldAttrs[])) inds.push(sInd);
    const maxInd = sections.length - 1;
    if (sInd === maxInd && !inds.length) inds.push(maxInd);
  });
  return inds;
};

/**
 * 表单初始化数据处理
 */
export interface UseInitFormReturns {
  className: string;
  loading: boolean;
  pureText: boolean;
  readOnly: boolean;
  submitButton: string | BtnAttrs;
  resetButton: string | BtnAttrs;
  fields?: FormFieldAttrs[];
  sections?: SectionFormFieldAttrs[];
  formAttrs: CommonObj;
  [key: string]: any;
}

function getFilterSections(sections: SectionFormField[]): SectionFormFieldAttrs[] {
  return sections?.filter((sItem: SectionFormField) => {
    if (!sItem) return false;
    const { fields } = sItem as SectionFormFieldAttrs;
    (sItem as SectionFormFieldAttrs).fields = fields.filter((fItem: FormField) => !!fItem) as FormFieldAttrs[];
    return true;
  }) as SectionFormFieldAttrs[];
}

function getFilterFields(fields: FormField[], newSections: SectionFormFieldAttrs[]): FormFieldAttrs[] {
  return newSections?.length
    ? (newSections.map((it: SectionFormFieldAttrs) => it.fields).flat(1) as FormFieldAttrs[])
    : (fields.filter((it: FormField) => !!it) as FormFieldAttrs[]);
}

function getInfo(fields: FormField[], sections: SectionFormField[], initVals: CommonObj) {
  const newSections: SectionFormFieldAttrs[] = getFilterSections(sections);
  const newFields: FormFieldAttrs[] = getFilterFields(fields, newSections);
  const newInitVals = convertDateField(newFields, initVals, "set");
  return {
    initVals: newInitVals,
    sections: newSections,
    fields: newFields,
  };
}

export const useInitForm = (props: CommonObj, ref: any): UseInitFormReturns => {
  const {
    className = "",
    getUnFilledIndexs,
    submitButton = "提交",
    resetButton = "重置",
    fetchSuccess,
    fetchFail,
    fields = [],
    fetch,
    onSubmit,
    sections,
    initialValues,
    onValuesChange,
    isOmit = true,
    log = true,
    pureText = false,
    readOnly = false,
    extraParams,
    footer = true,
    ...restProps
  } = Object.assign({}, defaultFormProps, props);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { closePopup } = useContext(PopupContext);
  const isSectionForm = !!sections;

  const { initVals, sections: newSections, fields: newFields } = getInfo(fields, sections, initialValues);

  useImperativeHandle(ref, () => ({ form }), [form]);

  const debounceInitInds = useCallback(
    debounce((args = form.getFieldsValue(true)) => {
      isSectionForm && getUnFilledIndexs?.(getUnFilledInds(newSections, args));
    }),
    []
  );

  useEffect(() => {
    debounceInitInds();
  }, []);

  // 防抖处理 onFinish 事件
  const debounceHandleFinish = useCallback(
    debounce((params: CommonObj) => {
      const text = getBtnProps(submitButton).children;
      //请求成功之后的回调函数
      function fetchSucCb(hint = text + "成功！", closeType?: ClosePopupType, cb?: () => void, isRefreshList = true) {
        showMessage(hint);
        closePopup(closeType);
        cb?.();
      }
      if (readOnly) return showMessage("只读模式 - 不可提交", "info");
      const newParams = convertDateField(newFields, isOmit ? omitAttrs(params) : params);
      log && printLog(newParams, "req");
      setLoading(true);
      if (!fetch && !onSubmit) {
        setLoading(false);
        return showMessage(`暂未处理【${text}】事件`, "error");
      }
      if (onSubmit) {
        onSubmit(newParams, (msg = `${text}成功！`, closeType?: ClosePopupType, cb?: () => void) => {
          showMessage(msg);
          setLoading(false);
          closePopup?.(closeType);
          cb?.();
        });
      } else {
        fetch(newParams)
          .then((res: any) => {
            log && printLog(res, "res");
            if (!fetchSuccess) fetchSucCb(`${text}成功！`);
            fetchSuccess();
          })
          .catch((err: any) => {
            fetchFail?.(err);
          })
          .finally(() => setLoading(false));
      }
    }),
    []
  );

  // 防抖处理 onFinish 事件
  const debounceHandleFinishFailed = useCallback(
    debounce((err: CommonObj) => {
      const { values, errorFields, outOfDate } = err;
      const tips = errorFields?.[0]?.errors?.[0];
      showMessage(tips, "error");
    }),
    []
  );

  // 防抖处理表单值change事件
  const handelValuesChange = (vals: CommonObj, allVals: CommonObj) => {
    debounceInitInds();
    onValuesChange?.(vals, allVals);
  };

  return {
    className,
    loading,
    pureText,
    readOnly,
    footer,
    submitButton,
    resetButton,
    ...(isSectionForm ? { sections: newSections } : { fields: newFields }),
    formAttrs: {
      form,
      initialValues: initVals,
      onFinish: debounceHandleFinish,
      onFinishFailed: debounceHandleFinishFailed,
      onValuesChange: handelValuesChange,
      ...restProps,
    },
  };
};
