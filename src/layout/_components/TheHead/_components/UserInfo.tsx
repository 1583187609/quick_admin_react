import BaseAvatar from "@/components/BaseAvatar";
import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useDictMap, useStoreSpace } from "@/hooks";
import { getUserInfo } from "@/utils";
import { CommonObj } from "@/vite-env";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}
function getFields({ genderOpts }: CommonObj): FormField[] {
  return [
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
      name: "sex",
      label: "性别",
      type: "Radio.Group",
      attrs: {
        options: genderOpts,
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
      type: "Input.TextArea",
      attrs: {
        maxLength: 50,
      },
    },
  ];
}
export default ({ id }: Props) => {
  const { getOpts, getCascaderOpts } = useDictMap();
  const getderOpts = getOpts("Gender");
  const [loadData, setLoadData] = useState<CommonObj>({});
  useEffect(() => {
    getDetail(id);
  }, []);
  function getDetail(id: number) {
    setTimeout(() => {
      setLoadData(getUserInfo());
    }, 500);
  }
  return (
    <>
      <BaseAvatar style={{ margin: "0 auto 32px" }} />
      <BaseForm initialValues={{ sex: 0 }} style={{ width: "450px" }} fields={getFields({ getderOpts })} loadData={loadData} />
    </>
  );
};
