import BaseFormItem, { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import BaseEmpty from "@/components/BaseEmpty";
import { Row } from "antd";
import { CommonObj } from "@/vite-env";

export type AlignType = "top" | "middle" | "bottom" | "stretch";
export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type JustifyType = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";

interface Props {
  fields: FormField[];
  pureText: boolean;
  readOnly: boolean;
  // formItemWidthFull?: boolean;
  // showCount: boolean;
  formData: CommonObj;
  labelWidth: string;
  rowAttrs?: {
    align?: AlignType | { [key in ScreenSize]: AlignType };
    gutter?: number | object | any[];
    justify?: JustifyType | { [key in ScreenSize]: JustifyType };
    wrap?: boolean;
  };
}
export default ({
  fields,
  pureText = false,
  formData = {},
  readOnly = false,
  // formItemWidthFull,
  // showCount,
  labelWidth,
  rowAttrs,
  ...restProps
}: Props) => {
  return (
    <Row {...rowAttrs}>
      {fields?.map((field, ind) => {
        if (!field) return null;
        const newPureText = pureText ? formData[(field as FormFieldAttrs).name as string] ?? "-" : undefined;
        return (
          <BaseFormItem
            field={field}
            readOnly={readOnly}
            pureText={newPureText}
            // widthFull={formItemWidthFull}
            labelWidth={labelWidth}
            // showCount={showCount}
            key={ind}
            {...restProps}
          />
        );
      })}
      {/* ?? <BaseEmpty /> */}
    </Row>
  );
};
