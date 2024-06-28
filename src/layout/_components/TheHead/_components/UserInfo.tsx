import BaseAvatar from "@/components/BaseAvatar";
import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
// import { useDictMap } from "@/hooks";
import { getUserInfo } from "@/utils";
import { CommonObj } from "@/vite-env";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}
function getFields({ getOpts }: CommonObj): FieldItem[] {
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
        options: [
          { label: "未知", value: 0 },
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "InputNumber",
      valid: "age",
      attrs: {
        maxLength: 2,
        max: 99,
        min: 0,
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
        options: getOpts("address"),
      },
    },
    { name: "phone", label: "电话", valid: "phone" },
    { name: "password", label: "密码", valid: "password" },
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
  // const { getOpts } = useDictMap();
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
      <BaseForm
        initialValues={{ sex: 0 }}
        style={{ width: "450px" }}
        // fields={getFields({ getOpts })}
        loadData={loadData}
      />
    </>
  );
};
