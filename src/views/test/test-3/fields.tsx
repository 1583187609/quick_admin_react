import { ColItem } from "@/components/BaseCrud/_components/QueryTable";
import { FieldItem } from "@/components/BaseFormItem";
import BaseRange from "@/components/BaseRange";
import { CommonObj } from "@/vite-env";

export function getFormFields({ genderOpts, roleTypeOpts, enableStatusOpts }: CommonObj): FieldItem[] {
  return [
    {
      name: "id",
      label: "用户ID",
    },
    {
      name: "name",
      label: "用户姓名",
    },
    {
      name: "sex",
      label: "性别",
      type: "Select",
      attrs: {
        options: genderOpts,
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "Custom",
      custom: <BaseRange />,
    },
    {
      name: "type",
      label: "用户类型",
      type: "Select",
      attrs: {
        options: roleTypeOpts,
      },
    },
    {
      name: "status",
      label: "账号状态",
      type: "Select",
      attrs: {
        options: enableStatusOpts,
      },
    },
  ];
}

export const getTableFields = ({}: CommonObj): ColItem[] => {
  return [
    {
      name: "id",
      title: "ID",
      width: 100,
    },
    {
      name: "name",
      title: "姓名",
      width: 100,
    },
    {
      name: "sex",
      title: "性别",
      width: 100,
    },
    {
      name: "age",
      title: "年龄",
      width: 50,
    },
    {
      name: "address_text",
      title: "地址",
      width: 250,
    },
    {
      name: "phone",
      title: "电话",
      width: 120,
    },
    {
      name: "type_text",
      title: "用户类型",
      width: 100,
    },
    {
      name: "status",
      title: "账号状态",
      width: 80,
    },
  ];
};
