import BaseFormItem, { FormItem, FormItemAttrs } from "@/components/BaseFormItem";
import { Row } from "antd";

export type AlignType = "top" | "middle" | "bottom" | "stretch";
export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type JustifyType = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";

interface Props {
  fields?: FormItemAttrs[];
  pureText?: boolean;
  readOnly?: boolean;
  labelWidth?: string;
  rowAttrs?: {
    align?: AlignType | { [key in ScreenSize]: AlignType };
    gutter?: number | object | any[];
    justify?: JustifyType | { [key in ScreenSize]: JustifyType };
    wrap?: boolean;
  };
}
export default ({ fields = [], rowAttrs, ...restProps }: Props) => {
  return (
    <Row {...rowAttrs}>
      {fields?.map((field, ind) => {
        if (!field) return null;
        return <BaseFormItem field={field} key={ind} {...restProps} />;
      })}
    </Row>
  );
};
