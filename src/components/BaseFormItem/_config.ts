import { CommonObj } from "@/vite-env";
import { FieldAttrs, FormItemAttrs, FormItemType } from "./_types";
import type { TimePickerProps, TimeRangePickerProps } from "antd";
import { regexp } from "../_utils";
import dayjs from "dayjs";

const datePresets: TimePickerProps["presets"] = [
  { label: "昨天", value: dayjs().add(-1, "d") },
  { label: "上周", value: dayjs().add(-7, "d") },
  { label: "上月", value: dayjs().add(-1, "month") },
];

const dateRangePresets: TimeRangePickerProps["presets"] = [
  { label: "近7天", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "近14天", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "近30天", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "近90天", value: [dayjs().add(-90, "d"), dayjs()] },
];

//覆盖重写el-form-item 的默认属性值
export const defaultFieldAttrs: {
  [key in FormItemType]: {
    valuePropName?: string;
    attrs?: {
      getAttrs?: (field: FormItemAttrs) => FieldAttrs | undefined;
      [key: string]: any;
    };
  };
} = {
  Input: {
    attrs: {
      placeholder: "请输入{label}",
      // maxLength: 30,
      allowClear: true,
      getAttrs(field: FormItemAttrs) {
        const { attrs } = field;
        if (attrs) attrs.showCount = !!attrs.maxLength;
        return attrs;
      },
    },
  },
  Select: {
    attrs: {
      // style: { width: "100%" },
      placeholder: "请选择{label}",
      allowClear: true,
      // options: [],
    },
  },
  DateRangePicker: {
    attrs: {
      // style: { width: "100%" },
      // mode: "date", //time, date, month, year, decade
      format: "YYYY-MM-DD", //用于设置展示和传值的效果值，
      placeholder: ["开始日期", "结束日期"],
      allowClear: true,
      presets: dateRangePresets,
    },
  },
  DatePicker: {
    attrs: {
      // style: { width: "100%" },
      // mode: "date", //time, date, month, year, decade
      format: "YYYY-MM-DD", //用于设置展示和传值的效果值，
      placeholder: "请选择{label}",
      allowClear: true,
      presets: datePresets,
    },
  },
  Switch: {
    valuePropName: "checked", //必须设置，不然会触发警告
    attrs: {
      checkedChildren: "是",
      unCheckedChildren: "否",
    },
  },
  Checkbox: {
    valuePropName: "checked", //必须设置，不然会触发警告
    attrs: {},
  },
  RadioGroup: {
    attrs: {
      optionType: "button",
      buttonStyle: "solid",
      // options: [{ label: "单选项1" }],
    },
  },
  CheckboxGroup: {
    attrs: {
      // options: [{ label: "多选项1" }],
    },
  },
  InputNumber: {
    attrs: {
      style: { width: "100%" },
      placeholder: "{label}",
    },
  },
  TextArea: {
    attrs: {
      placeholder: "请输入{label}",
      maxLength: 100,
      allowClear: true,
      // showCount: true,
      getAttrs(field: FormItemAttrs) {
        const { attrs } = field;
        if (attrs) attrs.showCount = !!attrs.maxLength;
        return attrs;
      },
    },
  },
  Password: {
    attrs: {
      placeholder: "请输入{label}",
      // maxLength: 30,
      allowClear: true,
      // iconRender: (visible: boolean) => {
      //   return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
      // },
      // showCount: true,
      getAttrs(field: FormItemAttrs) {
        const { attrs } = field;
        if (attrs) attrs.showCount = !!attrs.maxLength;
        return attrs;
      },
    },
  },
  AutoComplete: {
    attrs: {
      placeholder: "请输入{label}",
      // maxLength: 30,
      allowClear: true,
    },
  },
  Cascader: {
    attrs: {
      // style: { width: "100%" },
      placeholder: "请选择{label}",
      allowClear: true,
      // options: [],
    },
  },
  Search: {
    attrs: {
      placeholder: "请输入{label}",
      // maxLength: 30,
      allowClear: true,
      // showCount: true,
      getAttrs(field: FormItemAttrs) {
        const { attrs } = field;
        if (attrs) attrs.showCount = !!attrs.maxLength;
        return attrs;
      },
    },
  },
  Slider: {
    attrs: {
      style: { width: "calc(100% - 20px)" },
    },
  },
  TimePicker: {
    attrs: {
      // style: { width: "100%" },
      format: "HH:mm:ss",
      placeholder: "请选择{label}",
      allowClear: true,
    },
  },
  TimeRangePicker: {
    attrs: {
      // style: { width: "100%" },
      format: "HH:mm:ss",
      placeholder: ["开始时间", "结束时间"],
      allowClear: true,
    },
  },
  Rate: {
    attrs: {},
  },
  Custom: {
    attrs: {},
  },
};
// 默认的校验类型
export const defaultValidTypes: CommonObj = {
  // 手机号
  phone: {
    rules: [
      {
        pattern: regexp.phone,
        message: "请输入正确的11位电话号码",
      },
    ],
    attrs: {
      maxLength: 11,
    },
  },
  // 密码
  password: {
    rules: [
      {
        min: 6,
        message: "密码长度不能小于6位",
      },
      {
        pattern: regexp.password,
        message: "请输入正确的6~16位字母 + 数字组合密码",
      },
    ],
    attrs: {
      type: "password",
      maxLength: 16,
    },
  },
  // 用户姓名
  userName: {
    rules: [
      {
        min: 2,
        message: "不能少于一个字符",
      },
    ],
    attrs: {
      maxLength: 5,
    },
  },
  // 身高
  height: {
    type: "InputNumber",
    attrs: {
      min: 0,
      max: 200,
      addonAfter: "cm",
    },
  },
  // 年龄
  age: {
    type: "InputNumber",
    attrs: {
      min: 0,
      max: 100,
      addonAfter: "岁",
    },
  },
  // 体重
  weight: {
    type: "InputNumber",
    attrs: {
      min: 0,
      max: 180,
      addonAfter: "kg",
    },
  },
  // 人民币
  rmb: {
    type: "InputNumber",
    attrs: {
      min: 0,
      step: 0.01,
      addonAfter: "￥",
    },
  },
};
