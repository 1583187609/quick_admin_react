import allAddress from "../data/address";
import { CommonObj } from "@/vite-env";
// export type DictNames =
//   | "EnableStatus"
//   | "YesNoStatus"
//   | "Gender"
//   | "RoleType"
//   | "MenuType";
// const dictMap: { [key in DictNames]: CommonObj } = {
export type DictNames = keyof typeof dictMap;
const dictMap: CommonObj = {
  //启用禁用状态（通用）
  EnableStatus: {
    0: "禁用",
    1: "启用",
  },
  //启用禁用状态（通用）
  YesNoStatus: {
    0: "否",
    1: "是",
  },
  //性别
  Gender: {
    0: "未知",
    1: "男",
    2: "女",
  },
  //用户类型
  RoleType: {
    0: "超级管理员",
    1: "普通管理员",
    2: "特殊用户",
    3: "普通用户",
    4: "游客用户",
    5: "开发人员",
  },
  //权限菜单类型
  MenuType: {
    0: "目录",
    1: "菜单",
    2: "按钮",
    3: "外链",
  },
};
//获取字典文本
export function getDictText(name: DictNames, val: string | number) {
  return dictMap[name][val] || "";
}
//获取字典码值
export function getDictCodes(name: DictNames) {
  return Object.keys(dictMap[name]).map(it => Number(it));
}
export default dictMap as CommonObj;

export type CascaderType = keyof typeof cascaderMap;
const cascaderMap = {
  Region: allAddress,
};
//获取级联地址文本
export function getCascadeText(type: CascaderType, ids: [number, number, number] = [0, 0, 0], byKey = "id") {
  const mapOpts = cascaderMap[type];
  if (!mapOpts) return "-";
  const [pId, cId, aId] = ids;
  const pItem = mapOpts.find((it: CommonObj) => it[byKey] === pId);
  const cItem = pItem?.city.find((it: CommonObj) => it[byKey] === cId);
  const aItem = cItem?.area.find((it: CommonObj) => it[byKey] === aId);
  return `${pItem?.name}${cItem?.name}${aItem?.name || ""}`;
}
