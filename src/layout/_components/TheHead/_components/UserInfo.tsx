import BaseAvatar from "@/components/BaseAvatar";
import { FormItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { getUserInfo } from "@/utils";
import { CommonObj } from "@/vite-env";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}
const fields: FormItem[] = [
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
export default ({ id }: Props) => {
  useEffect(() => {
    getDetail(id);
  }, []);
  const [initVals, setInitVals] = useState(null);
  function getDetail(id: number) {
    setTimeout(() => {
      setInitVals(getUserInfo());
    }, 500);
  }
  return (
    <>
      <BaseAvatar style={{ margin: "0 auto 32px" }} />
      {initVals && <BaseForm initialValues={initVals} style={{ width: "450px" }} fields={fields} />}
    </>
  );
};
