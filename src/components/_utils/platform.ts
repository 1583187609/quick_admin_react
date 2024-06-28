/********************************************************************/
/*************** 为Vue或React或各UI平台差异化单独写的方法 *************/
/********************************************************************/

// import { RendererElement, RendererNode, VNode, h } from "vue";
// import { ElMessage } from "element-plus";
// import type { MessageParams, TableColumnCtx } from "element-plus";
import cssVars from "@/assets/styles/_css_var.module.less";
import { message } from "antd";
import { typeOf } from "@/utils";
import { PopoverAttrs } from "@/components/BaseFormItem";
import { CommonObj, TostMessageType } from "@/vite-env";

import type { FieldItem } from "@/components/BaseFormItem";
import { merge, omitBy } from "lodash";
import dayjs from "dayjs";
import { defaultFieldAttrs, FormItemType } from "@/components/BaseFormItem";

/**
 * 展示message提示信息
 * @param hint string, MessageParams 提示内容
 * @description 默认展示成功通知
 */
export function showMessage(hint: string, type: TostMessageType = "success") {
  if (!hint) return;
  // if (typeof hint === "string") {
  //   const speed = 7; //速度：7字/秒
  //   let duration = (hint.length / speed) * 1000;
  //   if (duration < 1500) {
  //     duration = 1500;
  //   }
  //   ElMessage({
  //     message: hint,
  //     type,
  //     duration,
  //     grouping: true,
  //     showClose: duration > 2000,
  //   });
  // } else {
  //   ElMessage(hint);
  // }
  message[type](hint);
}

/**
 * 输出请求参数与响应数据的log信息
 * @param data any 要打印的数据
 * @param type PrintLogType 要打印的日志类型 或要输出的文本内容
 */
export type PrintLogType = "req" | "res" | "err";
export type ThemeColorType =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info";
export function printLog(
  data: any,
  type: PrintLogType | ThemeColorType = "req",
  text: string = ""
) {
  if (["req", "res", "err"].includes(type)) {
    const map: CommonObj = {
      req: {
        text: "请求参数",
        bgColor: cssVars.colorPrimary,
      },
      res: {
        text: "响应数据",
        bgColor: cssVars.colorSuccess,
      },
      err: {
        text: "错误数据",
        bgColor: cssVars.colorDanger,
      },
    };
    const { text, bgColor } = map[type];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;`, data);
  } else {
    const themeMap = {
      primary: cssVars.colorPrimary,
      success: cssVars.colorSuccess,
      danger: cssVars.colorDanger,
      warning: cssVars.colorWarning,
      info: cssVars.colorInfo,
    };
    const bgColor = themeMap[type as ThemeColorType];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;`, data);
  }
}

/**
 * 处理时间：后端的时间为 1000-01-01 00:00:00 时，实际上是空值
 * @param text 要显示的文本内容
 * @param color 文本颜色
 * @param elTag 元素标签类型
 */
// export function devErrorTips(
//   text: string,
//   attrs: CommonObj | null = {
//     style: `color: ${cssVars.colorDanger};font-weight:600;`,
//   },
//   elTag: string | null = "span"
// ): string | VNode<RendererNode, RendererElement, { [key: string]: any }> {
//   if (!elTag) return `~~${text}~~`;
//   return h(elTag, attrs, `~~${text}~~`);
// }

/**
 * 防抖：指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @param {Function} fn 回调函数
 * @param {Boolean} immediate 是否立即执行
 * @param {Number} delay 延迟时间
 * @param {*} params 传入的参数
 * @example methods: {onSubmit: debounce((event, param) => {console.log("防抖测试");})}
 */
export function debounce(
  fn: (e: any, params?: object) => void,
  immediate = true,
  delay = 1000,
  params?: object
) {
  let timer: any = null;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const canExe = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (canExe) {
        fn(event, params);
      }
    } else {
      timer = setTimeout(() => {
        fn(event, params);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 防抖处理
 * @param fn 要执行的函数
 * @param delay 延迟执行时间
 * @returns 返回执行函数
 */
export function debounceHandler(fn: Function, delay = 500) {
  let timer: number | null = null;
  return function (...args: any) {
    const _this = this;
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(_this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流：指连续触发事件，但是在 n 秒内只执行一次函数
 * @param {Function} fn 回调函数
 * @param {Boolean} immediate 是否立即执行
 * @param {Number} delay 延迟时间
 * @param {*} params 传入的参数
 * @example methods: {onSubmit: throttle((event, param) => {console.log("节流测试");})}
 */
export function throttle(
  fn: (e: any, params?: object) => void,
  immediate = true,
  delay = 1000,
  params?: object
) {
  if (immediate) {
    let previous = 0;
    return function (event: any) {
      const now = Date.now();
      if (now - previous > delay) {
        fn(event, params);
        previous = now;
      }
    };
  } else {
    let timer: any = null;
    return function (event: any) {
      if (!timer) {
        timer = setTimeout(() => {
          fn(event, params);
          timer = null;
        }, delay);
      }
    };
  }
}

/**
 * 处理ElementPlus表格的汇总
 * @param exceptKeys 要排除掉的不进行汇总的列prop
 */
export interface SummaryMethodProps<T = CommonObj> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
export function handleTableSummary(
  param: SummaryMethodProps,
  exceptKeys?: string[]
) {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    const values = data.map((item) => Number(item[column.property]));
    if (values.every((value) => Number.isNaN(value))) {
      sums[index] = "-"; //N/A
    } else {
      if (exceptKeys?.includes(column.property)) {
        sums[index] = "-";
      } else {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0)}`;
      }
    }
  });
  return sums;
}

/**
 * 获取屏幕大小的类型，对应着element-plus定义的屏幕类型
 * @return string 屏幕类型
 */
export type ScreenSizeType = "xs" | "sm" | "md" | "lg" | "xl";
export function getScreenSizeType(): ScreenSizeType {
  let size = "";
  const width = document.body.offsetWidth;
  if (width < 768) {
    size = "xs";
  } else if (width >= 768 && width < 992) {
    size = "sm";
  } else if (width >= 992 && width < 1200) {
    size = "md";
  } else if (width >= 1200 && width < 1920) {
    size = "lg";
  } else if (width >= 1920) {
    size = "xl";
  }
  return size as ScreenSizeType;
}

/**
 * 获取popover的属性值
 * @param popover
 * @returns
 */
export function getPopoverAttrs(
  popover?: string | PopoverAttrs
): PopoverAttrs | undefined {
  if (!popover) return;
  const t = typeOf(popover);
  if (t === "String") return { content: popover as string };
  if (t === "Object") return popover as PopoverAttrs;
  throw new Error(`暂不支持此popover类型：${t}`);
}

/********************************************************************/
/************************** 下面是新添加的 **************************/
/********************************************************************/

/**
 * 过滤筛选日期字段
 * @param fields 字段数组
 */
function getDateFields(fields: FieldItem[]) {
  return fields.filter(({ type }: FieldItem) => {
    return type?.includes("Date") || type?.includes("Time");
  });
}

/**
 * 转换日期
 * @param dateFields Array 日期字段数组
 * @param key 对象属性名
 */
function getDateFormat(dateFields: FieldItem[], key: string) {
  const { type, attrs } = dateFields.find((it) => it.name === key) || {};
  const newAttrs = merge(
    {},
    defaultFieldAttrs[type as FormItemType]?.attrs,
    attrs
  );
  return newAttrs.format || "YYYY-MM-DD";
}

/**
 * 转换日期
 * @param fields Array 表单字段数组
 * @param params Object 要整理的参数
 * @param type 日期转换类型, set 设置值， get 获取值
 */
export function convertDateField(
  fields: FieldItem[],
  params: CommonObj = {},
  type: "set" | "get" = "get"
) {
  const dateFields = getDateFields(fields);
  const dateNames = dateFields.map((it) => it.name);
  for (let key in params) {
    if (dateNames.includes(key)) {
      const format = getDateFormat(dateFields, key);
      const val = params[key];
      const isArr = typeOf(val) === "Array";
      let date: any = isArr
        ? val.map((it: string) => dayjs(it, format))
        : dayjs(val, format);
      if (type === "get") {
        date = isArr
          ? date.map((it: any) => it.format(format))
          : date.format(format);
      }
      params[key] = date;
    }
  }
  return params;
}
