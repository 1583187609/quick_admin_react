/****************************************************************************************************/
/*************** 此处的方法可能与src/components/_utils中的方法重名，故单独提取出来进行维护 ***************/
/****************************************************************************************************/

import { CommonObj } from "@/vite-env";

/**
 * 检测元素所属类型
 * Object.prototype.toString.call(*)的可能结果如下所示：
 * @example null             [object Null]
 * @example undefined        [object Undefined]
 * @example Symbol());       [object Symbol]
 * @example true             [object Boolean]
 * @example ''               [object String]
 * @example 1                [object Number]
 * @example []               [object Array]
 * @example {}               [object Object]
 * @example new Date()       [object Date]
 * @example new Function()   [object Function]
 * @example new RegExp()     [object RegExp]
 * @example new Error()      [object Error]
 * @example document         [object HTMLDocument]
 * @example window           [object global] window 是全局对象 global 的引用
 * @param {*} ele 待检测的对象、字符串、数组等
 * @returns {String} 元素类型（String、Number、Boolean、Symbol、Undefined、Null、Function、Date、Array、Object、Regexp、Error、HtmlDocument、Global）
 */
export function typeOf(ele: any) {
  const endStr = Object.prototype.toString.call(ele);
  const type = endStr.split(" ")[1].slice(0, -1);
  return type;
}

/**
 * 删除对象属性(不改变原数组）
 * @param obj [object] 要删除属性所在的对象
 * @param keys string[] 要删除的属性名
 */
export function deleteAttrs(obj: CommonObj = {}, keys: string | string[]) {
  const newObj = JSON.parse(JSON.stringify(obj));
  if (!keys?.length) return newObj;
  if (typeof keys === "string") return delete newObj[keys];
  keys.forEach(key => delete newObj[key]);
  return newObj;
}
