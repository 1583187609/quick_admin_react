/**
 * 测试1
 */

import { FormItem } from "@/components/BaseFormItem";
import { Tabs, Select } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { PostMockCommon } from "@/api-mock";
import BaseForm from "@/components/form/BaseForm";
import SectionForm, { SectionFormItem } from "@/components/form/SectionForm";
import StepForm from "@/components/form/StepForm";

export const fields: FormItem[] = [
  {
    name: "name",
    label: "姓名",
    required: true,
    extra: "设置 maxLength 属性后，则触发 showCount 属性值为true",
    colAttrs: 12,
    attrs: {
      maxLength: 6,
    },
    otherAttrs: {},
  },
  {
    name: "age",
    label: "年龄",
    type: "InputNumber",
    extra: "设置 valid 属性为age，将获得 age 的所有预设值特性",
    colAttrs: 12,
    attrs: {},
    otherAttrs: {
      valid: "age",
    },
  },
  {
    name: "gender",
    label: "性别",
    type: "Radio.Group",
    extra: "options选项传入数组 genderOpts",
    colAttrs: {
      span: 12,
    },
    attrs: {
      optionType: "button",
      buttonStyle: "solid",
      options: "Gender",
    },
  },

  {
    name: "homeAddress",
    label: "家庭住址",
    type: "Cascader",
    extra: "options选项传入级联名称 Region",
    colAttrs: 12,
    attrs: {
      options: "Region",
    },
  },
  {
    name: "height",
    label: "身高",
    type: "Slider",
    extra: "这是popover的使用示例（鼠标放在label右侧的图标上查看）",
    attrs: {
      min: 0,
      max: 250,
    },
    otherAttrs: {
      popover: "这是popover的使用示例",
    },
  },
  // { name: "detail", label: "详细地址", type: "Input" },
  {
    name: "phone",
    label: "电话",
    colAttrs: 12,
    // extra: `设置 {valid: "phone"} 实现电话号码长度限制、正则校验`,
    extra: `设置prefix、addonAfter属性`,
    attrs: {
      prefix: <UserOutlined />,
      // addonAfter: "+86",
      addonAfter: (
        <Select
          defaultValue={1}
          options={[
            { label: "国内", value: 1 },
            { label: "国外", value: 2 },
          ]}
        ></Select>
      ),
    },
    otherAttrs: {
      valid: "phone",
    },
  },
  {
    name: "password",
    label: "密码",
    type: "Input.Password",
    colAttrs: 12,
    extra: `设置 {valid: "password"} 实现密码长度限制、正则校验`,
    attrs: {
      prefix: <UnlockOutlined />,
    },
    otherAttrs: {
      valid: "password",
    },
  },
  {
    name: "search",
    label: "搜索",
    type: "Input.Search",
    colAttrs: 12,
    required: true,
    extra: "colAttrs为Col的属性，值可为数字或对象",
    attrs: { placeholder: "请输入搜索内容" },
  },
  {
    name: "listSearch",
    label: "搜索记忆",
    type: "AutoComplete",
    colAttrs: 12,
    attrs: {
      options: [
        { label: "搜索提示1", value: "1" },
        { label: "搜索提示2", value: "2" },
        { label: "搜索提示3", value: "3" },
      ],
    },
  },
  {
    name: "activeType",
    label: "报名形式",
    type: "Select",
    colAttrs: 12,
    attrs: {
      options: [
        { label: "现场", value: 1 },
        { label: "线上", value: 2 },
      ],
    },
  },
  {
    name: "signUpFee",
    label: "报名费用",
    type: "InputNumber",
    attrs: {
      disabled: true,
    },
    colAttrs: 12,
    otherAttrs: {
      valid: "rmb",
    },
  },
  {
    name: "score",
    label: "评分",
    type: "Rate",
  },
  {
    name: "intendedCity",
    label: "意向城市",
    type: "Checkbox.Group",
    attrs: {
      options: [
        { label: "成都", value: 1 },
        { label: "杭州", value: 2 },
        { label: "武汉", value: 3 },
      ],
    },
  },
  {
    name: "attendDate",
    label: "参加活动的日期",
    type: "DatePicker",
    required: true,
  },
  {
    name: "attendTime",
    label: "参加活动的时间",
    type: "TimePicker",
  },
  {
    name: "signUpDateRange",
    label: "报名日期",
    type: "DatePicker.RangePicker",
  },
  {
    name: "signUpTimeRange",
    label: "报名时间",
    type: "TimePicker.RangePicker",
  },
  {
    name: "hasChildren",
    label: "是否带有小孩",
    type: "Switch",
    attrs: {
      // checkedChildren: "是",
      // unCheckedChildren: "否",
    },
  },
  {
    name: "isAgree",
    label: "阅读并同意协议",
    type: "Checkbox",
  },
  {
    name: "note",
    label: "备注",
    type: "Input.TextArea",
    attrs: { maxLength: 200 },
  },
  {
    name: "custom",
    label: "自定义项",
    type: "Custom",
    extra: "声明type为Custom，同时写上element属性",
    element: <div className="color-primary">这是一个自定义项</div>,
  },
  {
    name: "error",
    label: "error项",
    type: "Inputt",
    extra: "当type类型拼写错误或不存在时，就会出现此错误提示",
  },
];
export const initVals = {
  listSearch: "搜索列表",
  activeType: 1,
  name: "张三",
  gender: 1,
  age: 26,
  homeAddress: [12, 2, 3],
  phone: "18483221518",
  height: 170,
  weight: 62,
  score: 3,
  intendedCity: [1, 2],
  // attendDate: "2023-07-03",
  attendTime: "15:33:32",
  signUpDateRange: ["2023-06-01", "2023-06-30"],
  signUpTimeRange: ["09:00:00", "18:00:00"],
  signUpFee: 199.0,
  hasChildren: true,
  isAgree: true,
  note: "暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容。",
};
export default () => {
  const sections: SectionFormItem[] = [
    {
      title: "基本信息",
      popover: "这是第一部分内容【基本信息】的介绍",
      fields: fields.slice(0, 7),
    },
    {
      title: "额外信息",
      popover: "这是第二部分内容【额外信息】的介绍",
      fields: fields.slice(7, 13),
    },
    {
      title: "更多信息",
      popover: "这是第三部分内容【更多信息】的介绍",
      fields: fields.slice(13, 20),
    },
    {
      title: "其他信息",
      popover: "这是第四部分内容【其他信息】的介绍",
      fields: fields.slice(20),
    },
  ];
  const items = [
    {
      key: "1",
      label: "基础表单",
      children: (
        <BaseForm fields={fields} initialValues={initVals} fetch={PostMockCommon} style={{ height: "calc(100vh - 160px)" }} />
      ),
    },
    {
      key: "2",
      label: "分块表单",
      children: (
        <SectionForm
          sections={sections}
          initialValues={initVals}
          fetch={PostMockCommon}
          style={{ height: "calc(100vh - 160px)" }}
        />
      ),
    },
    {
      key: "3",
      label: "步骤表单",
      children: (
        <StepForm sections={sections} initialValues={initVals} fetch={PostMockCommon} style={{ height: "calc(100vh - 160px)" }} />
      ),
    },
  ];
  return <Tabs items={items} defaultActiveKey="3" />;
};
