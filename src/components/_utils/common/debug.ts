/********************************************************************/
/********************** 开发调试相关的系统级方法 **********************/
/********************************************************************/

import { CommonObj } from "@/vite-env";
import { isDev } from "./consts";
import { showMessage } from "@/utils";

/**
 * 函数未传必填参数时的校验
 * @param name string 参数名称
 */
export function needParam(name: string) {
  throw new Error("请传入参数：" + name);
}

/**
 * 接口暂未联调
 */
export function noHandleFetch() {
  return new Promise(() => {
    showMessage("接口暂未联调", "warning");
  });
}

/**
 * 检查对象2的属性在对象1上是否存在，即以对象1的属性为准
 */
export function checkObjKeyError(obj_1: CommonObj = {}, obj_2: CommonObj = {}) {
  if (!isDev) return;
  for (const key in obj_2) {
    if (obj_1[key] === undefined) {
      throw new Error(`不存在属性名：${key}，请检查`);
    }
  }
}

/**
 * 计算src/components下开发的有效页面
 * @return
 */
export function getDevelopComponents() {
  const comps = import.meta.glob("@/components/**/**/*.vue");
  const allNames = Object.keys(comps);
  const unValidNames: string[] = []; //无效页面
  //有效页面
  const valideNames = allNames.filter((key: string) => {
    if (key.includes(" ")) unValidNames.push(key);
    return !key.includes(" ");
  });
  return {
    valideNames,
    unValidNames,
  };
}
