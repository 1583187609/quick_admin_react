export type DictNames =
  | "enableStatus"
  | "yesNoStatus"
  | "sex"
  | "userType"
  | "roleType"
  | "menuType";
const dictMap: { [key in DictNames]: CommonObj } = {
  //启用禁用状态（通用）
  enableStatus: {
    1: "启用",
    2: "禁用",
  },
  //启用禁用状态（通用）
  yesNoStatus: {
    1: "是",
    2: "否",
  },
  //性别
  sex: {
    0: "未知",
    1: "男",
    2: "女",
  },
  //用户类型
  userType: {
    0: "超级管理员",
    1: "普通管理员",
    2: "特别用户",
    3: "普通用户",
  },
  //角色类型
  roleType: {
    0: "超级管理员",
    1: "普通管理员",
    2: "开发者",
    3: "客户",
    4: "游客",
  },
  //权限菜单类型
  menuType: {
    1: "目录",
    2: "菜单",
    3: "按钮",
  },
};
//获取字典文本
export function getDictText(name: DictNames, val: string | number) {
  return dictMap[name][val];
}
//获取字典码值
export function getDictCodes(name: DictNames) {
  return Object.keys(dictMap[name]).map((it) => Number(it));
}
export default dictMap as CommonObj;
