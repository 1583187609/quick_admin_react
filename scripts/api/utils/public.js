import { t, n, br, baseDataTypes } from "./consts.js";
import { getIndexHeadAnnoTpl } from "./template.js";

/**
 * 将字符串第一个单词大写
 */
export function upperFirst(str) {
  if (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
  return str;
}

/**
 * 将字符串转为小驼峰
 */
export function camelCase(str = "") {
  if (str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      )
      .replace(/\s+|\/|-|}/g, "")
      .replace(/{/g, "By");
  }
  return str;
}

/**
 * index api文件
 */
export function getApiIndexStr(name = "", filesData = [], lang = "js") {
  let total = 0;
  filesData.forEach((item) => {
    total += item.datas.length || 0;
  });
  let indexStr = getIndexHeadAnnoTpl(name, total);
  filesData.forEach((item, ind) => {
    const { id, title = "", datas } = item;
    const titleStr = title ? ` //${title}` : "";
    indexStr += `export * from "./${id}";${titleStr}${n}`;
  });
  return indexStr;
}
