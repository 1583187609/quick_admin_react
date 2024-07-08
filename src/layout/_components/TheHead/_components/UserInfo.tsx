import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useStoreSlice } from "@/hooks";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const fields: FormField[] = [
  {
    name: "avatar",
    label: "头像",
    type: "UploadAvatar",
  },
  {
    name: "nickname",
    label: "昵称",
    attrs: {
      maxLength: 6,
    },
  },
  {
    name: "name",
    label: "姓名",
    attrs: {
      maxLength: 6,
    },
  },
  {
    name: "gender",
    label: "性别",
    type: "RadioGroup",
    attrs: {
      options: "Gender",
    },
  },
  {
    name: "age",
    label: "年龄",
    type: "InputNumber",
    attrs: {
      maxLength: 2,
      max: 99,
      min: 0,
    },
    otherAttrs: {
      valid: "age",
    },
  },
  {
    name: "type_text",
    label: "角色",
    attrs: {
      disabled: true,
    },
  },
  {
    name: "address",
    label: "地址",
    type: "Cascader",
    attrs: {
      options: "Region",
    },
  },
  {
    name: "phone",
    label: "电话",
    otherAttrs: {
      valid: "phone",
    },
  },
  {
    name: "password",
    label: "密码",
    otherAttrs: {
      valid: "password",
    },
  },
  {
    name: "signature",
    label: "签名",
    type: "TextArea",
    attrs: {
      maxLength: 50,
    },
  },
];
export default ({ className = "", ...restProps }: Props) => {
  const { userInfo } = useStoreSlice("user");
  return userInfo && <BaseForm initialValues={userInfo} style={{ width: "450px" }} fields={fields} {...restProps} />;
};
