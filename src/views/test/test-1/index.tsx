/**
 * 测试1
 */

import BaseForm from "@/components/form/BaseForm";
import { FormField } from "@/components/BaseFormItem";
import { CommonObj } from "@/vite-env";
import { Tabs } from "antd";
import { useDictMap, useStoreSpace } from "@/hooks";

interface Props {
  className?: string;
}
function getFields({ regionOpts, genderOpts }: CommonObj): FormField[] {
  return [
    {
      name: "name",
      label: "姓名",
      required: true,
      colAttrs: 12,
    },
    {
      name: "sex",
      label: "性别",
      type: "Radio.Group",
      attrs: {
        optionType: "button",
        buttonStyle: "solid",
        options: genderOpts,
      },
      colAttrs: 12,
    },
    {
      name: "age",
      label: "年龄",
      type: "InputNumber",
      attrs: {},
      colAttrs: {
        span: 12,
      },
      extraAttrs: {
        valid: "age",
      },
    },
    {
      name: "homeAddress",
      label: "家庭住址",
      type: "Cascader",
      attrs: {
        options: regionOpts,
      },
      colAttrs: {
        span: 12,
      },
    },
    {
      name: "height",
      label: "身高",
      type: "Slider",
      attrs: {
        min: 0,
        max: 250,
      },
    },
    // { name: "detail", label: "详细地址", type: "Input" },
    {
      name: "phone",
      label: "电话",
      extraAttrs: {
        valid: "phone",
      },
    },
    {
      name: "password",
      label: "密码",
      type: "Input.Password",
      extraAttrs: {
        valid: "password",
      },
    },
    {
      name: "search",
      label: "搜索",
      type: "Input.Search",
      attrs: { placeholder: "请输入搜索内容" },
    },
    {
      name: "listSearch",
      label: "搜索记忆",
      type: "AutoComplete",
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
      attrs: {
        options: [
          { label: "现场", value: 1 },
          { label: "线上", value: 2 },
        ],
      },
      colAttrs: {
        span: 12,
      },
    },
    {
      name: "signUpFee",
      label: "报名费用",
      type: "InputNumber",
      attrs: {
        disabled: true,
      },
      colAttrs: {
        span: 12,
      },
      extraAttrs: {
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
    },
    {
      name: "attendTime",
      label: "参加活动的时间场次",
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
      attrs: { showCount: false },
    },
  ];
}
export default ({ className = "" }: Props) => {
  const { getOpts, getCascaderOpts } = useDictMap();
  const genderOpts = getOpts("Gender");
  const regionOpts = getCascaderOpts("Region");
  const fields: FormField[] = getFields({ genderOpts, regionOpts });
  const initVals = {
    listSearch: "搜索列表",
    activeType: 1,
    name: "张三",
    sex: 1,
    age: 26,
    homeAddress: [12, 2, 3],
    phone: "18483221518",
    height: 170,
    weight: 62,
    score: 3,
    intendedCity: [1, 2],
    attendDate: "2023-07-03",
    attendTime: "15:33:32",
    signUpDateRange: ["2023-06-01", "2023-06-30"],
    signUpTimeRange: ["09:00:00", "18:00:00"],
    signUpFee: 199.0,
    hasChildren: true,
    isAgree: true,
    note: "暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容暂无备注内容。",
    // date: new Date(),
  };
  const items = [
    {
      key: "1",
      label: "表单可编辑",
      children: (
        <BaseForm className="mr-32 f-1" fields={fields} style={{ height: "calc(100vh - 154px)" }} initialValues={initVals} />
      ),
    },
    {
      key: "2",
      label: "表单只可读",
      children: (
        <BaseForm
          className="mr-32 f-1"
          fields={fields}
          style={{ height: "calc(100vh - 154px)" }}
          initialValues={initVals}
          readOnly
        />
      ),
    },
    {
      key: "3",
      label: "表单纯文本",
      children: (
        <BaseForm className="f-1" fields={fields} style={{ height: "calc(100vh - 154px)" }} initialValues={initVals} pureText />
      ),
    },
  ];
  return <Tabs items={items} defaultActiveKey="1" />;
};
