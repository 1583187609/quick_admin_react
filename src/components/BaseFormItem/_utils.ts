import { typeOf, getTextFromOpts } from "@/utils";
import { merge } from "lodash";
import { defaultFieldAttrs } from "./_config";
import { ColAttrs, FormItemAttrs } from "./_types";
import { OptionItem } from "@/vite-env";

//获取表单键值对的值
export function getKeyVal(field: FormItemAttrs, val: any) {
  const { type = "Input", label, attrs = {} } = field;
  const options = attrs.options as OptionItem[];
  if (["Select", "RadioGroup"].includes(type)) {
    val = options?.find((it: OptionItem) => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("Date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    val = isArr ? val.map((it: any) => it.format(format)).join(" ~ ") : val.format(format);
  } else if (["CheckboxGroup"].includes(type)) {
    val = options
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
    val = getTextFromOpts(options, val);
  } else if (type === "Custom") {
  }
  return { label, value: val };
}

export function getColAttrs(col?: number | ColAttrs) {
  if (typeof col === "number") return { span: col };
  return col;
}
