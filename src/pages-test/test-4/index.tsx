/**
 * 文件说明-模板文件
 */

import React, { useContext } from "react";
import SectionForm, { SectionFormItem } from "@/components/form/SectionForm";
interface Props {
  className?: string;
}
const isRequired = false;
const sections: SectionFormItem[] = [
  {
    title: "基础信息",
    fields: [
      {
        name: "xm",
        label: "姓名",
        required: isRequired,
        colAttrs: { span: 12 },
      },
      {
        name: "xb",
        label: "性别",
        required: isRequired,
        type: "Select",
        // type: "Radio.Group",
        // attrs: { options: [] },
        colAttrs: { span: 12 },
      },
      {
        name: "nl",
        label: "年龄",
        required: isRequired,
        type: "InputNumber",
        attrs: { min: 0, max: 100 },
        colAttrs: { span: 8 },
      },
      {
        name: "sg",
        label: "身高",
        required: isRequired,
        type: "InputNumber",
        attrs: { min: 140, max: 220 },
        colAttrs: { span: 8 },
      },
      {
        name: "tz",
        label: "体重",
        required: isRequired,
        type: "InputNumber",
        attrs: { min: 30, max: 300 },
        colAttrs: { span: 8 },
      },
      {
        name: "jg",
        label: "籍贯",
        required: isRequired,
        type: "Cascader",
        colAttrs: { span: 12 },
      },
      { name: "zz", label: "住址", type: "Cascader", colAttrs: { span: 12 } },
      { name: "dh", label: "电话", valid: "phone" },
      { name: "sfzh", label: "身份证号", attrs: { disabled: true } },
    ],
  },
  {
    title: "教育经历",
    fields: [
      { name: "jdyx", label: "就读院校", type: "Input.Search" },
      { name: "xzlx", label: "学制类型" },
      { name: "jdsj", label: "就读时间" },
    ],
  },
  {
    title: "工作经历",
    fields: [
      {
        name: "gsmc",
        label: "公司名称",
        required: isRequired,
        type: "Input.Search",
      },
      {
        name: "sjfw",
        label: "工作时间",
        required: isRequired,
      },
      {
        name: "lzyy",
        label: "离职原因",
        type: "Input.TextArea",
      },
    ],
  },
  {
    title: "家庭信息",
    fields: [{ name: "jtcy", label: "家庭成员" }],
  },
  {
    title: "其他信息",
    fields: [
      { name: "xqah", label: "兴趣爱好" },
      { name: "jlzs", label: "奖励证书" },
      { name: "zwjs", label: "自我介绍", type: "Input.TextArea" },
      { name: "bz", label: "备注", type: "Input.TextArea" },
      { name: "fj", label: "附件" },
    ],
  },
];
export default ({ className = "" }: Props) => {
  return (
    <>
      <div className="f-0 f-sb-c mb-16 mt-4">
        <strong className="f-1 mr-32 f-c-c">表单可编辑</strong>
        <strong className="f-1 mr-32 f-c-c">表单纯文本</strong>
      </div>
      <div className="f-fs-fs f-1 all-hide-scroll" style={{ overflow: "auto" }}>
        <SectionForm
          style={{ height: "100%" }}
          className="f-3 mr-32"
          sections={sections}
        />
        <SectionForm
          style={{ height: "100%" }}
          className="f-2"
          sections={sections}
          pureText
        />
      </div>
    </>
  );
};
