/********************************************************************/
/******** vite.config.ts初始化时会用到的方法，同时给其他地方使用 *******/
/********************************************************************/

/**
 * 将字符串转为驼峰
 * @param {string} str 要转换的字符串
 * @param {boolean} isBig 是否转成大驼峰，否则转成小驼峰
 */
export function toCamelCase(str: string, isBig = false) {
  str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, ind) => {
    if (ind === 0) return letter[isBig ? "toUpperCase" : "toLowerCase"]();
    return letter.toUpperCase();
  });
  str = str.replace(/\s+|\/|-|}/g, "");
  return str;
}
