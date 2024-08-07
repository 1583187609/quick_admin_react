import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";

const fields: FormField[] = [
  {
    name: "pheon",
    label: "电话",
    otherAttrs: {
      valid: "phone",
    },
  },
  {
    name: "psd",
    label: "密码",
    type: "Password",
    otherAttrs: {
      valid: "password",
    },
  },
  { name: "captcha", label: "验证码" },
];
export default () => {
  return <BaseForm style={{ width: 450 }} fields={fields} submitButton="注册" />;
};
