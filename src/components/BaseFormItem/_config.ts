import { FormItemType } from "./_types";

//覆盖重写el-form-item 的默认属性值
export const defaultFieldAttrs: {
  [key in FormItemType]: {
    valuePropName?: string;
    attrs: CommonObj;
  };
} = {
  Input: {
    attrs: {
      placeholder: "请输入${label}",
      // maxLength: 30,
      allowClear: true,
      // showCount: true,
    },
  },
  Select: {
    attrs: {
      // style: { width: "100%" },
      placeholder: "请选择${label}",
      allowClear: true,
      // options: [],
    },
  },
  "DatePicker.RangePicker": {
    attrs: {
      // style: { width: "100%" },
      // mode: "date", //time, date, month, year, decade
      format: "YYYY-MM-DD", //用于设置展示和传值的效果值，
      placeholder: ["开始日期", "结束日期"],
      allowClear: true,
    },
  },
  DatePicker: {
    attrs: {
      // style: { width: "100%" },
      // mode: "date", //time, date, month, year, decade
      format: "YYYY-MM-DD", //用于设置展示和传值的效果值，
      placeholder: "请选择${label}",
      allowClear: true,
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
  "Radio.Group": {
    attrs: {
      optionType: "button",
      buttonStyle: "solid",
      // options: [{ label: "单选项1" }],
    },
  },
  "Checkbox.Group": {
    attrs: {
      // options: [{ label: "多选项1" }],
    },
  },
  InputNumber: {
    attrs: {
      style: { width: "100%" },
      placeholder: "${label}",
    },
  },
  "Input.TextArea": {
    attrs: {
      placeholder: "请输入${label}",
      maxLength: 100,
      allowClear: true,
      // showCount: true,
    },
  },
  "Input.Password": {
    attrs: {
      placeholder: "请输入${label}",
      // maxLength: 30,
      allowClear: true,
      // iconRender: (visible: boolean) => {
      //   return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
      // },
      // showCount: true,
    },
  },
  AutoComplete: {
    attrs: {
      placeholder: "请输入${label}",
      // maxLength: 30,
      allowClear: true,
    },
  },
  Cascader: {
    attrs: {
      // style: { width: "100%" },
      placeholder: "请选择${label}",
      allowClear: true,
      // options: [],
    },
  },
  "Input.Search": {
    attrs: {
      placeholder: "请输入${label}",
      // maxLength: 30,
      allowClear: true,
      // showCount: true,
    },
  },
  Slider: {
    attrs: {},
  },
  TimePicker: {
    attrs: {
      // style: { width: "100%" },
      format: "HH:mm:ss",
      placeholder: "请选择${label}",
      allowClear: true,
    },
  },
  "TimePicker.RangePicker": {
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
//默认的校验类型
export const defaultValidTypes: CommonObj = {
  //手机号
  phone: {
    rules: [
      {
        // pattern: regexp.phone,
        message: "请输入正确的11位电话号码",
      },
    ],
    attrs: {
      maxLength: 11,
    },
  },
  //密码
  password: {
    rules: [
      {
        min: 6,
        message: "密码长度不能小于6位",
      },
      {
        // pattern: regexp.password,
        message: "请输入正确的6~16位字母 + 数字组合密码",
      },
    ],
    attrs: {
      type: "password",
      maxLength: 16,
    },
  },
  //用户姓名
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
  //年龄
  age: {
    type: "InputNumber",
    attrs: {
      maxLength: 2,
      min: 0,
      max: 99,
      addonAfter: "岁",
    },
  },
  //人民币
  rmb: {
    type: "InputNumber",
    attrs: {
      min: 0,
      step: 0.01,
      addonAfter: "￥",
    },
  },
};