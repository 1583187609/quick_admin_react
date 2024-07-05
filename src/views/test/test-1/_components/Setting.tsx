/**
 * 文件说明-模板文件
 */

import { FormItemAttrs } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const fields: FormItemAttrs[] = [
  {
    name: "useSectionName",
    // label: "使用SectionName",
    type: "Select",
    label: "",
    attrs: {
      placeholder: "请输入使用SectionName",
      options: "YesNoStatus",
    },
  },
  //   {
  //     name: "temp",
  //     // label: "临时的",
  //     label: "",
  //     attrs: {
  //       placeholder: "请输入临时的",
  //     },
  //   },
];
export default ({ className = "", children, ...restProps }: Props) => {
  return (
    <BaseForm
      className={`${className}`}
      fields={fields}
      layout="inline"
      size="small"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 12 }}
      footer={null}
      //   onValuesChange={(vals: any) => console.log(vals, "vals---------")}
      {...restProps}
    />
  );
};
