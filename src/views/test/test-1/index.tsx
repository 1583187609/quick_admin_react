/**
 * 测试1
 */

import BaseForm from "@/components/form/BaseForm";
import { FormField } from "@/components/BaseFormItem";
import { CommonObj } from "@/vite-env";
import { Tabs, Select } from "antd";
import { useDictMap } from "@/hooks";
import { PostMockCommon } from "@/api-mock";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";

function getFields({ regionOpts, genderOpts }: CommonObj): FormField[] {
  return [
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
      name: "sex",
      label: "性别",
      type: "Radio.Group",
      extra: "options选项传入数组 genderOpts",
      colAttrs: {
        span: 12,
      },
      attrs: {
        optionType: "button",
        buttonStyle: "solid",
        options: genderOpts,
      },
    },

    {
      name: "homeAddress",
      label: "家庭住址",
      type: "Cascader",
      extra: "options选项传入级联名称 Region",
      colAttrs: 12,
      attrs: {
        // options: regionOpts,
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
}
export default () => {
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
        <BaseForm
          className="mr-32 f-1"
          fetch={PostMockCommon}
          fields={fields}
          style={{ height: "calc(100vh - 160px)" }}
          initialValues={initVals}
        />
      ),
    },
    {
      key: "2",
      label: "表单只可读",
      children: (
        <BaseForm
          className="mr-32 f-1"
          fetch={PostMockCommon}
          fields={fields}
          style={{ height: "calc(100vh - 160px)" }}
          initialValues={initVals}
          readOnly
        />
      ),
    },
    {
      key: "3",
      label: "表单纯文本",
      children: (
        <BaseForm
          className="f-1"
          fetch={PostMockCommon}
          fields={fields}
          style={{ height: "calc(100vh - 160px)" }}
          initialValues={initVals}
          pureText
        />
      ),
    },
  ];
  return <Tabs items={items} defaultActiveKey="1" />;
};
