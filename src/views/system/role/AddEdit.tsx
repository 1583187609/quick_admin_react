import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { CommonObj } from "@/vite-env";

interface Props {
  id?: string;
  pureText?: boolean;
}
const fields: FormField[] = [
  {
    name: "role_name",
    label: "角色名称",
    required: true,
    attrs: {
      maxLength: 10,
    },
  },
  {
    name: "role_type",
    label: "角色类型",
    type: "Select",
    required: true,
    attrs: {
      options: "RoleType",
    },
  },
  {
    name: "is_enable",
    label: "是否启用",
    type: "Radio.Group",
    attrs: {
      options: "EnableStatus",
    },
  },
  {
    name: "remark",
    label: "备注",
    type: "Input.TextArea",
    attrs: {
      maxLength: 50,
    },
  },
];
const initVals: CommonObj = {
  is_enable: 1,
  role_type: 1,
};
export default ({ id, pureText }: Props) => {
  return <BaseForm initialValues={initVals} style={{ width: "600px" }} fields={fields} pureText={pureText} />;
};
