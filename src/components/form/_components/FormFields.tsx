import BaseFormItem, { FieldItem } from "@/components/BaseFormItem";
import BaseEmpty from "@/components/BaseEmpty";
import { Row } from "antd";

export type AlignType = "top" | "middle" | "bootom" | "stretch";
export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type JustifyType =
  | "start"
  | "end"
  | "center"
  | "spance-around"
  | "space-between"
  | "space-evenly";

interface Props {
  fields: FieldItem[];
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
        const newPureText = pureText
          ? formData[field.name as string] ?? "-"
          : undefined;
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
