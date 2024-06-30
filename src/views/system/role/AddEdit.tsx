import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useStoreSpace } from "@/hooks";
import { CommonObj } from "@/vite-env";
// import { useDictMap } from "@/hooks";

interface Props {
  id?: string;
  pureText?: boolean;
}
function getFields({ roleTypeOpts, enableStatusOpts }: CommonObj): FieldItem[] {
  return [
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
        options: roleTypeOpts,
      },
    },
    {
      name: "is_enable",
      label: "是否启用",
      type: "Radio.Group",
      attrs: {
        options: enableStatusOpts,
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
}
const initVals: CommonObj = {
  is_enable: 1,
  role_type: 1,
};
export default ({ id, pureText }: Props) => {
  const { getOpts } = useStoreSpace("dict");
  const roleTypeOpts = [] ?? getOpts("RoleType");
  const enableStatusOpts = [] ?? getOpts("EnableStatus");
  return (
    <>
      <BaseForm
        initialValues={initVals}
        style={{ width: "600px" }}
        fields={getFields({ roleTypeOpts, enableStatusOpts })}
        pureText={pureText}
      />
    </>
  );
};
