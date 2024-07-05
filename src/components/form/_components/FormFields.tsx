import BaseFormItem, { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { Row } from "antd";
import { Gutter } from "antd/es/grid/row";

export type AlignType = "top" | "middle" | "bottom" | "stretch";
export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type JustifyType = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";

interface Props {
  fields?: FormField[];
  pureText?: boolean;
  readOnly?: boolean;
  labelWidth?: string;
  rowAttrs?: {
    align?: AlignType | { [key in ScreenSize]: AlignType };
    gutter?: Gutter | [Gutter, Gutter];
    justify?: JustifyType | { [key in ScreenSize]: JustifyType };
    wrap?: boolean;
  };
}
export default ({ fields = [], rowAttrs, ...restProps }: Props) => {
  return (
    <Row {...rowAttrs}>
      {fields?.map((field, ind) => {
        if (!field) return null;
        return <BaseFormItem field={field as FormFieldAttrs} key={ind} {...restProps} />;
      })}
    </Row>
  );
};
