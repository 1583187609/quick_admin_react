import { TableCol } from "@/components/table/_types";
import { FormItem } from "@/components/BaseFormItem";
import BaseRange from "@/components/BaseRange";

export const fields: FormItem[] = [
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

export const columns: TableCol[] = [
  {
    dataIndex: "id",
    title: "ID",
    width: 100,
  },
  {
    dataIndex: "name",
    title: "姓名",
    width: 100,
  },
  {
    dataIndex: "gender_text",
    title: "性别",
    width: 100,
  },
  {
    dataIndex: "age",
    title: "年龄",
    width: 50,
  },
  {
    dataIndex: "address_text",
    title: "地址",
    width: 250,
  },
  {
    dataIndex: "phone",
    title: "电话",
    width: 120,
  },
  {
    dataIndex: "type_text",
    title: "用户类型",
    width: 100,
  },
  {
    dataIndex: "status_text",
    title: "账号状态",
    width: 80,
  },
];
