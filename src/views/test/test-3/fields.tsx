import { TableCol } from "@/components/table/_types";
import { FormField } from "@/components/BaseFormItem";
import BaseRange from "@/components/BaseRange";

export const fields: FormField[] = [
  {
    name: "id",
    label: "用户ID",
  },
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
    element: <BaseRange />,
  },
  {
    name: "type",
    label: "用户类型",
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
    name: "zdyzjl",
    title: "自定义组件列-内置[UserInfo]",
    width: 220,
  },
  {
    name: "zdyzj",
    title: "自定义组件-非内置",
    width: 150,
  },
  {
    name: "zdybgt",
    title: "自定义表格头",
    width: 120,
  },
  {
    name: "tp",
    title: "图片[BaseImg]",
    width: 150,
  },
  {
    name: "address_text",
    title: "自我介绍[BaseText]",
    width: 250,
  },
  {
    name: "phone",
    title: "formatter列",
    width: 120,
  },
  {
    name: "type_text",
    title: "状态[BaseTag]",
    width: 150,
  },
  {
    name: "sj",
    title: "时间（内置宽度）",
    width: 150,
  },
  {
    name: "cjsj",
    title: "创建时间[create]",
    width: 150,
  },
  {
    name: "xgsj",
    title: "修改时间[update]",
    width: 150,
  },
  {
    name: "qjy",
    title: "启/禁用",
    width: 100,
  },
  {
    name: "bz",
    title: "备注[remark]",
    width: 100,
  },
];
