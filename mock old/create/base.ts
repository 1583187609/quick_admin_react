import Mock from "mockjs";
import dayjs from "dayjs";
import { getDictText } from "../dict";
import { getDictMapKeys } from "../utils";
const { Random } = Mock;
/**
 * 生成正式用户列表数据
 * @param num [string] 生成数量
 * @param defObj [object] 模板默认值
 */
export function createPhone(phonePre = "135") {
  const reg = new RegExp(`\\d{${11 - phonePre.length}}`);
  return phonePre + Mock.mock(reg);
}
/**
 * 生成常用字段
 * @param fields string[字段名][指定值] 示例：[["phone"],["name"]]
 * @param
 */
// createCommonFields(fields = [[]]) {
//   const fieldObj = {};
//   const keyMap = {
//     phone: {
//       key: "phone",
//       val: () => phonePre + Mock.mock(/\d{8}/),
//     },
//     sex: {
//       key: "sex|1",
//       val: getDictMapKeys("sex", sex),
//     },
//     name: {
//       key: "name",
//       val: () => Random.cname(),
//     },
//     // sex_text(res) {
//     //   const { sex } = res.context.currentContext;
//     //   return getDictText('sex',sex);
//     // },
//   };
//   fields.forEach((item, ind) => {
//     const [fieKey, fieVal] = item;
//     const key = keyMap[fieKey];
//     if (key) {
//       // fieldObj[key]=
//     }
//   });
//   // const reg = new RegExp(`/\d{${11 - phonePre.length}}/`);
//   // return phonePre + Mock.mock(reg);
//   return fieldObj;
// },
