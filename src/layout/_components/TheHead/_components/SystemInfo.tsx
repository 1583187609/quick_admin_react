import SectionForm, { SectionFormItem } from "@/components/form/SectionForm";
import { name, version, scripts, dependencies, devDependencies } from "#/package.json";
import { FormItem } from "@/components/BaseFormItem";

const sections: SectionFormItem[] = [
  {
    title: "基础信息",
    fields: [
      { name: "name", label: "系统名称" },
      { name: "version", label: "版本号" },
      {
        name: "env",
        label: "所处环境",
      },
      {
        name: "desc",
        label: "系统概述",
      },
    ],
  },
  {
    title: "脚本命令",
    fields: toFieldItem(scripts),
  },
  {
    title: "开发依赖",
    fields: toFieldItem(dependencies),
  },
  {
    title: "生产依赖",
    fields: toFieldItem(devDependencies),
  },
];
const env = import.meta.env.MODE;
const envMap: CommonObj = {
  development: "开发",
  production: "生产",
  test: "测试",
};
function toFieldItem(obj: CommonObj) {
  const arr: FormItem[] = [];
  for (let key in obj) {
    arr.push({ name: key, label: key });
  }
  return arr;
}
export default () => {
  const inivVals = {
    name,
    version,
    env: `${envMap[env]}（${env}）`,
    desc: "这是系统介绍描述相关的内容展示这是系统介绍描述相关统",
    ...scripts,
    ...dependencies,
    ...devDependencies,
  };
  return <SectionForm style={{ width: "500px" }} initialValues={inivVals} sections={sections} pureText />;
};
