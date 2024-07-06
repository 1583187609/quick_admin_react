import { merge } from "lodash";
import dictMap from "../dict";
import { getDictText } from "../dict";
import { CommonObj, OptionItem } from "@/vite-env";
import { typeOf } from "./base";

/**
 * 获取请求参数
 * @param req 请求体
 * @param ignoreKeys [array] 不要转成数字类型的key值数组
 */
export function getRequestParams(req: CommonObj, ignoreKeys = ["phone"]) {
  const { url, body, query, headers } = req;
  const reqParams = merge(body, query);
  //是否忽略掉要转成number类型
  function isIgnore(key: string, val: any) {
    const valType = typeOf(val);
    const isEmptyStr = val === "";
    const isIgnoreKey = ignoreKeys?.includes(key);
    const isIgnoreType = ["Null", "Undefined", "Boolean", "Array"].includes(valType);
    return isEmptyStr || isIgnoreKey || isIgnoreType;
  }
  for (const key in reqParams) {
    const val = reqParams[key];
    if (isIgnore(key, val)) continue;
    const numVal = Number(val);
    if (!isNaN(numVal)) {
      reqParams[key] = numVal;
    } else {
      if (val === "true") {
        reqParams[key] = true;
      } else if (val === "false") {
        reqParams[key] = false;
      }
    }
  }
  return reqParams;
}

/**
 * 处理数据，转化成vite mock api需要的数据结构
 */
export function toViteMockApi(obj: CommonObj) {
  const arr: CommonObj[] = [];
  for (const key in obj) {
    const [method, url] = key.split(" ");
    arr.push({
      url,
      method: method.toLowerCase(), //一定要转为小写，不然打包出来会提示404，踩了很久的坑
      response: obj[key],
    });
  }
  return arr;
}

/**
 * 判断数据是否在数据区间内
 * @param range [any,any] 数据区间
 * @param now 当前数据
 * @param parse 要转换成的格式，之后再进行对比
 */
export type ParseRangeItemType = "date";
export function getIsInDateRange(range: [any, any], now: any, parse?: ParseRangeItemType) {
  if (range?.length) {
    let [min, max] = range;
    if (parse === "date") {
      min = new Date(min).getTime();
      max = new Date(max).getTime();
      now = new Date(now).getTime();
    }
    return now > min && now < max;
  }
  return true;
}

/**
 * 根据一个或多个条件过滤数组元素
 * @param list [array] 需要过滤的数组
 * @param byConditions [array] 过滤依据的条件，示例：[['type',1],['gender',1]]
 */
export function filterByConditions(list: any[], byConditions: any[]) {
  /**
   * @param record object 一条记录数据信息
   * //blur 模糊查询 precise 精准查询 range 区间查询   inArr 指定数组中查询 notInArr 不在指定的数组中
   * @param condition object 依据的字段名，示例：{ type: "blur", byKeys: ["name"], keyword: "范" }]
   * @other type string 模糊查询，可选值：["blur"]
   * @other byKeys string[] 依据的字段名，示例：['name','nickname']
   * @other keyword string 依据的关键词，示例："范"
   */
  function isIncludesKeyword(record: CommonObj, condition: CommonObj, key: string) {
    const {
      type = "blur",
      byKeys,
      keyword,
      range,
      parse, //按某种类型进行转换  例：date: 转换时间
      inArr,
      notInArr,
    } = condition;
    if (["blur", "precise"].includes(type)) {
      if (["", undefined].includes(keyword)) return true;
      return byKeys.some((key: string, ind: number) => {
        if (type === "blur") {
          return record[key].includes(keyword);
        } else if (type === "precise") {
          return record[key] === keyword;
        } else {
          throw new Error(`暂不支持 ${type} 查询`);
        }
      });
    } else if (type === "range") {
      // if (range?.length) {
      //   let [min, max] = range;
      //   let now = record[key];
      //   if (parse === "date") {
      //     min = new Date(min).getTime();
      //     max = new Date(max).getTime();
      //     now = new Date(now).getTime();
      //   }
      //   return now > min && now < max;
      // }
      return getIsInDateRange(range, record[key], parse);
    } else if (type === "inArr") {
      return inArr.includes(record[key]);
    } else if (type === "notInArr") {
      return !notInArr.includes(record[key]);
    }
    return true;
  }
  return list.filter((row, index) => {
    const isValid = byConditions.every(([key, val], aInd) => {
      const valType = typeOf(val);
      if (valType === "Undefined") {
        return true;
      } else if (valType === "Object") {
        return isIncludesKeyword(row, val, key);
      } else {
        return val === "" || row[key] === val;
      }
    });
    return isValid;
  });
}
/**
 * 根据字典获取下拉选项数据
 * @param name string 字典名
 * @param ignoreKeys array 要忽略翻译的键名数组集合
 */
export function getOptsFromDict(name: string, ignoreKeys: string[]) {
  const opts: OptionItem[] = [];
  const map = dictMap[name];
  if (!map) return null;
  for (const key in map) {
    if (!ignoreKeys?.includes(key)) {
      opts.push({ value: Number(key), label: map[key] });
    }
  }
  return opts;
}
/**
 * 获取字典映射中的keys值
 * @param name string 字典名
 * @param val number 指定值
 */
export function getDictMapKeys(name: string, val: string | number) {
  if (val === undefined) {
    return Object.keys(dictMap[name]).map(item => Number(item));
  } else {
    return [val];
  }
}

/**
 * 修改一个对象，例：用户
 * @param newObj object 新传入的对象
 * @param oldObj object 对象默认（初始）值
 * @return object 返回合并之后的对象
 */
export function addObj(newObj: CommonObj, oldObj: CommonObj, othObj: CommonObj) {
  // const obj: CommonObj = {};
  // for (const key in oldObj) {
  //   obj[key] = newObj[key] ?? oldObj[key];
  // }
  // return obj;
  return merge({}, oldObj, newObj);
}

/**
 * 获取构造对象
 * @param obj object 要依照的对象
 * @param excludes string[] 要排除生成的属性名
 * @return object 构造好之后的新对象
 */
export function getConstructorObj(obj: CommonObj = {}, excludes?: string[]) {
  const newObj: CommonObj = {};
  const typeMap: CommonObj = {
    Undefined: undefined,
    Boolean: false,
    Number: NaN,
    String: "",
    Function: () => {},
  };
  for (const key in obj) {
    // if (!excludes?.includes(key)) {
    const type = typeOf(obj[key]);
    newObj[key] = typeMap[type];
    // }
  }
  return newObj;
}

/**
 * 获取NavsTree
 * @param navs object[] 原始导航树数据
 */
export function getNavsTree(navs?: CommonObj[]): CommonObj[] | undefined {
  if (!navs) return;
  return navs.map((item: CommonObj, ind) => {
    const { label, component = "", path, children, status, is_cache, type, ...rest } = item;
    return {
      name: label,
      menu_path: path,
      component_path: component,
      children: getNavsTree(children),
      remark: "", //备注
      order: 1,
      perms: "menu:list:auth",
      status,
      status_text: getDictText("EnableStatus", status),
      type,
      type_text: getDictText("MenuType", type),
      is_link: type === 2 ? 1 : 0,
      is_cache,
      ...rest,
    };
  });
}

/**
 * 修改一个对象，例：用户
 * @param arr object[] 树形数据数组
 * @param byId string 查找时要依据的id
 * @param propsMap object 属性映射
 * @return object 查找到的树节点
 */
export function findTreeNode(arr: any[], byId: string, propsMap: CommonObj = { id: "id", children: "children" }) {
  let node = null;
  function getFindInfo(arr: any[], byId: string): any {
    arr?.find((item: any, ind: number) => {
      const isFind = byId === item[propsMap.id];
      if (isFind) {
        node = item;
        return isFind;
      } else {
        return !!getFindInfo(item[propsMap.children], byId);
      }
    });
  }
  getFindInfo(arr, byId);
  return node;
}

/**
 * 获取域名+pathname
 * @example 发布到gitee上的有效地址：https://fanlichuan.gitee.io/quick_admin_vue3/dist/static/imgs/girl-1.jpg
 * @example VsCode Live Sever打开的有效地址：http://127.0.0.1:5500/dist/static/imgs/boy-6.jpg
 */
export function getBasePath(projectName = "quick_admin_vue3", rootPath = "/dist") {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return ""; //开发模式
  const { origin, host } = location;
  const isLiveSever = host.startsWith("127");
  return `${origin}/${isLiveSever ? "" : projectName}${rootPath}`;
}

/**
 * 获取图片地址
 * @tips  性别： 0未知 1男 2女
 * @params maxNum 跟性别头像的最大下标值保持一致
 */
export function getAvatarUrl(gender: 0 | 1 | 2, maxNum = 6) {
  //性别 0未知 1男 2女
  const max = maxNum + 1;
  const ind = Math.floor(Math.random() * max);
  const genderMap = {
    1: "boy",
    2: "girl",
  };
  if (gender === 0) return "";
  return `${getBasePath()}/static/imgs/${genderMap[gender]}-${ind}.jpg`;
}
