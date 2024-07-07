/********************************************************************/
/********************** 开发调试相关的系统级方法 **********************/
/********************************************************************/

import { CommonObj } from "@/vite-env";
import { isDev } from "./consts";
// import { ElNotification } from "element-plus";

/**
 * 函数未传必填参数时的校验
 * @param name string 参数名称
 */
export function needParam(name: string = "") {
  throw new Error("请传入参数：" + name);
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
 * @description 全局代码错误捕捉
 * */
export function handleError(error: any) {
  // 过滤 HTTP 请求错误
  if (error.status || error.status === 0) return false;
  const errorMap: CommonObj = {
    InternalError: "Javascript引擎内部错误",
    ReferenceError: "未找到对象",
    TypeError: "使用了错误的类型或对象",
    RangeError: "使用内置对象时，参数超范围",
    SyntaxError: "语法错误",
    EvalError: "错误的使用了Eval",
    URIError: "URI错误",
  };
  // ElNotification({
  //   title: errorMap[error.name] ?? "未知错误",
  //   message: error,
  //   type: "error",
  //   duration: 3000,
  // });
  console.error(errorMap[error.name] ?? "未知错误", error);
}
