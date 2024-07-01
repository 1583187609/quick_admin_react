import { CSSProperties } from "react";
import { regexp, typeOf, getTextFromOpts } from "@/utils";
import { merge } from "lodash";
import { defaultFieldAttrs } from "./_config";
import { FormField } from "./_types";

//获取表单键值对的值
export function getKeyVal(field: FormField, val: any) {
  const { type = "Input", label, attrs = {} } = field;
  if (["Select", "Radio.Group"].includes(type)) {
    val = attrs?.options?.find((it: OptionItem) => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("Date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    val = isArr ? val.map((it: any) => it.format(format)).join(" ~ ") : val.format(format);
  } else if (["Checkbox.Group"].includes(type)) {
    val = attrs?.options
      ?.filter((it: OptionItem) => val.includes(it.value))
      ?.map((it: OptionItem) => it.label)
      .join("，");
  } else if (type === "InputNumber") {
    val = val + (attrs?.addonAfter || "");
  } else if (typeOf(val) === "Boolean") {
    if (type === "Switch") {
      const { checkedChildren = "是", unCheckedChildren = "否" } = attrs;
      val = val ? checkedChildren : unCheckedChildren;
    } else {
      val = val ? "是" : "否";
    }
  } else if (type === "Cascader") {
    val = getTextFromOpts(attrs?.options, val);
  } else if (type === "Custom") {
  }
  return { label, value: val };
}
