import { ColItem } from "@/components/BaseCrud/_components/QueryTable";
import { FormField } from "@/components/BaseFormItem";
import BaseRange from "@/components/BaseRange";

export const fields: FormField[] = [
  {
    name: "id",
    label: "用户ID",
  },
  {
    name: "name",
    label: "用户姓名",
  },
  {
    name: "gender",
    label: "性别",
    type: "Select",
    attrs: {
      options: "Gender",
    },
  },
  {
    name: "age",
    label: "年龄",
    type: "Custom",
    element: <BaseRange attrs={{ min: 1, max: 100, maxLength: 3 }} />,
  },
  {
    name: "type",
    label: "角色类型",
    type: "Select",
    attrs: {
      options: "RoleType",
    },
  },
  {
    name: "status",
    label: "账号状态",
    type: "Select",
    attrs: {
      options: "EnableStatus",
    },
  },
];

export const columns: ColItem[] = [
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
    name: "gender_text",
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
    name: "status_text",
    title: "账号状态",
    width: 80,
  },
];
