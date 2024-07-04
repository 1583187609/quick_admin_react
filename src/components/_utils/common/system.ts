/********************************************************************/
/**************** 系统级别的方法，可能因工程改变而改变 ****************/
/********************************************************************/

import { typeOf } from "@/utils";
import { FormItemAttrs } from "@/components/BaseFormItem";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import { emptyVals, emptyTime } from "./consts";
import dayjs from "dayjs";
import * as xlsx from "xlsx";

/**
 * 导入excel中的数据
 * @param fileBuffer
 * @returns {unknown[]}
 */
export function importExcel(
  fileBuffer: any,
  opts = {
    defval: "", //默认值配置
  }
): CommonObj[] {
  const workbook = xlsx.read(fileBuffer, { type: "buffer" }); // 获取 workbook
  const firstSheetName = workbook.SheetNames[0]; // 获取第一张表名
  const firstSheet = workbook.Sheets[firstSheetName]; // 获取第一张表
  return xlsx.utils.sheet_to_json(firstSheet, opts); // 获取数据
}

/**
 * 导出（下载）Excel数据表
 * @param data array 要下载的数据  例：[["A1", "B1", "C1"], ["A2", "B2", "C2"],["A3", "B3", "C3"]]   通常第一行是表头，可以单独拼接
 * @param {string} fileName 文件名称
 * @param {string} sheetName 表名称
 * @param {Function} callback 回调函数
 * @link 参考链接 https://www.jianshu.com/p/f9ba3dd3cd4f
 */
export function exportExcel(
  data: string[][] = [],
  fileName = dayjs().format("YYYYMMDD"),
  sheetName = "表1",
  callback?: () => void
) {
  const wb = xlsx.utils.book_new(); // 创建workbook
  // const ws = xlsx.utils.aoa_to_sheet(data); // 创建sheet
  const ws = xlsx.utils.json_to_sheet(data, {
    // header: ["A", "B", "C", "D", "E", "F", "G"],
    skipHeader: true,
  }); // 创建sheet
  xlsx.utils.book_append_sheet(wb, ws, sheetName); // 把sheet放入workbook
  xlsx.writeFile(wb, fileName + ".xls"); // 写入文件(通过文件名控制导出的类型)
  callback?.();
}

/**
 * 获取时间（几年/月/天/小时/分钟前）
 */
export function getTimeAgo(time: any) {
  if (!time) return "";
  time = dayjs().diff(time) / 1000;
  let unit = "";
  let num = 0;
  const y = Math.floor(time / (60 * 60 * 24 * 365));
  if (y > 0) {
    unit = "年";
    num = y;
    return `${num}${unit}前`;
  } else {
    const M = Math.floor(time / (60 * 60 * 24 * 30));
    if (M > 0) {
      unit = "月";
      num = M;
      return `${num}${unit}前`;
    } else {
      const d = Math.floor(time / (60 * 60 * 24));
      if (d > 0) {
        unit = "天";
        num = d;
      } else {
        const h = Math.floor(time / (60 * 60));
        if (h > 0) {
          unit = "小时";
          num = h;
        } else {
          const m = Math.floor(time / 60);
          if (m > 0) {
            unit = "分钟";
            num = m;
          } else {
            return "刚刚";
          }
        }
      }
      return `${num}${unit}前`;
    }
  }
}

/**
 * 获取过去时间距离现在的文本字符
 * @param time 能被new Date()解析的时间格式
 * @return string  //刚刚  XX分钟前 XX小时前 XX天前
 */
export function getLastTimeStr(time: any) {
  const lastTime = new Date(time).getTime();
  const diffTime = (Date.now() - lastTime) / 1000;
  if (diffTime < 0) {
    console.error("传入时间不能大于当前时间值");
    return "-";
  } else {
    // const M = Math.trunc(diffTime / (30 * 24 * 60 * 60));
    // if (M > 0) {
    //   return `${M}月前`;
    // } else {
    const d = Math.trunc(diffTime / (24 * 60 * 60));
    if (d > 0) {
      return `${d}天前`;
    } else {
      const h = Math.trunc(diffTime / (60 * 60));
      if (h > 0) {
        return `${h}小时前`;
      } else {
        const m = Math.trunc(diffTime / 60);
        return m > 0 ? `${m}分钟前` : "刚刚";
      }
    }
    // }
  }
}

/**
 * 处理平台默认值问题 Form echo data
 * @description 后端的数据库日期必须有一个默认值，回显的时候会显示这个默认值，因为数据量较多，改动较大，所以由前端统一处理
 */
export function handleFormInitData(field: FormItemAttrs, modelValue?: CommonObj) {
  if (!modelValue || emptyVals.includes(emptyTime)) return;
  const { type, prop } = field;
  const propType = typeOf(prop);
  if (type?.includes("date")) {
    if (propType === "String") {
      if (modelValue[prop as string] === emptyTime) {
        modelValue[prop as string] = "";
      }
    } else if (propType === "Array") {
      (prop as string[]).forEach((key: string) => {
        if (modelValue[key] === emptyTime) {
          modelValue[key] = "";
        }
      });
    }
  }
}

/**
 * 计算弹性布局时，末尾需要的空盒子个数
 * @param {number} total  总共多少个元素
 * @param {number} cols   多少列布局
 * @returns
 */
export function getEmptyNum(total: number, cols: number) {
  return cols - (total % cols);
}

/**
 * 对象数组排序（默认order）
 * @param opts {}[] 要排序的数组
 * @param inds number[] 排序依据的对象属性键名
 */
export function getTextFromOpts(opts: OptionItem[] = [], inds: number[] = []) {
  let text = "";
  function cycle(opts: OptionItem[], ind: number = 0) {
    const { label = "", children = [] } = opts?.[inds[ind]] || {};
    text += label;
    if (children?.length) {
      cycle(children, ind + 1);
    }
  }
  cycle(opts);
  return text;
}

/**
 * 获取图片的http请求路径
 * @param path {string} 图片路径
 * @returns
 */
export const getImgUrl = (path: string) => {
  return new URL(path, import.meta.url).href;
};

/**
 * 从树形数组中根据id获取菜单文本
 * @param tree {}[] 树形数据
 * @param {string | number} id  id
 * @param key 要获取的文本的键名
 * @param keyMap 键名映射
 */
export function getTextFromTreeByKey(
  tree: CommonObj[] = [],
  val: StrNum,
  key: string,
  keyMap: CommonObj = { id: "id", children: "children" }
) {
  if (!val) return "";
  let text = "";
  tree?.find(item => {
    if (item[keyMap.id] == val) {
      text = item[key];
      return !!text;
    } else {
      text = getTextFromTreeByKey(item[keyMap.children], val, key);
      return !!text;
    }
  });
  return text;
}

/**
 * 根据值(非数组)从options获取label文本
 */
export function getLabelFromOptionsByLastValue(
  options: CommonObj[],
  val: StrNum,
  propsMap: CommonObj = {
    label: "label",
    value: "value",
    children: "children",
  },
  emptyChar = "-"
) {
  const { label: labelKey, value: valueKey, children: childrenKey } = propsMap;
  let target: CommonObj | undefined;
  function getLabel(opts: CommonObj[]): boolean {
    return !!opts.find(item => {
      const children = item[childrenKey];
      const value = item[valueKey];
      const isFind = value === val;
      if (isFind) {
        target = item;
      } else {
        if (children?.length) {
          return getLabel(children);
        }
      }
      return isFind;
    });
  }
  getLabel(options);
  return target?.[labelKey] ?? emptyChar;
}

/**
 * 根据值（数组）从options获取label文本
 */
export function getLabelFromOptionsByAllValues(
  options: CommonObj[],
  values: StrNum[],
  propsMap: CommonObj = {
    label: "label",
    value: "value",
    children: "children",
  },
  char = ""
) {
  const { label: labelKey, value: valueKey, children: childrenKey } = propsMap;
  const labels: string[] = [];
  function getLabel(opts: CommonObj[], level = 0) {
    opts.find(item => {
      const children = item[childrenKey];
      const value = item[valueKey];
      const label = item[labelKey];
      const isFind = value === values[level];
      if (isFind) {
        labels.push(label);
        if (children) {
          getLabel(children, ++level);
        }
      }
      return isFind;
    });
  }
  getLabel(options);
  return labels.join(char);
}

/**
 * 根据url地址下载文件
 * @param {string} url  下载地址
 * @param {string} name  文件名称
 */
export function downloadByUrl(url: string, name: string = dayjs().format("YYYY-MM-DD")) {
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  a.style.display = "none";
  a.click();
  a.remove();
}

/**
 * 根据 bufferData 下载文件
 * @param {string} buffer  Buffer数据
 * @param {string} name  文件名称
 */
export function downloadByBuffer(buffer, name?: string) {
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = window.URL.createObjectURL(blob);
  downloadByUrl(url, name);
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  const lang = (navigator.language ?? navigator.browserLanguage).toLowerCase();
  return ["cn", "zh", "zh-cn"].includes(lang) ? "zh" : "en";
}
