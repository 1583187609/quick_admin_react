import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";

const fields: FieldItem[] = [
  { name: "pheon", label: "电话", valid: "phone" },
  { name: "psd", label: "密码", type: "Input.Password", valid: "password" },
  { name: "captcha", label: "验证码" },
];
export default () => {
  return <BaseForm style={{ width: 450 }} fields={fields} />;
};
