import { cloneDeep, merge } from "lodash";
import dictMap from "../dict";
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
 * @returns {String} 元素类型（string、number、boolean、symbol、undefined、null、function、date、array、object、regexp、error、htmldocument、global）
 */
export function typeOf(ele: any) {
  let endStr = Object.prototype.toString.call(ele);
  let type = endStr.split(" ")[1].slice(0, -1);
  return type;
}
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
    const isIgnoreType = ["Null", "Undefined", "Boolean", "Array"].includes(
      valType
    );
    return isEmptyStr || isIgnoreKey || isIgnoreType;
  }
  for (let key in reqParams) {
    const val = reqParams[key];
    if (isIgnore(key, val)) continue;
    const numVal = Number(val);
    if (!isNaN(numVal)) {
      reqParams[key] = numVal;
    }
  }
  return reqParams;
}
/**
 * 处理数据，转化成vite mock api需要的数据结构
 */
export function toViteMockApi(obj: CommonObj) {
  const arr = [];
  for (let key in obj) {
    let [method, url] = key.split(" ");
    arr.push({
      url,
      method: method.toLowerCase(), //一定要转为小写，不然打包出来会提示404，踩了很久的坑
      response: obj[key],
    });
  }
  return arr;
}
/**
 * 删除对象属性(不改变原数组）
 * @param obj [object] 要删除属性所在的对象
 * @param attrs string[] 要删除的属性名
 */
export function deleteAttrs(obj = {}, attrs: string[] = []) {
  const newObj = cloneDeep(obj);
  attrs.forEach((key, ind) => {
    delete newObj[key];
  });
  return newObj;
}
/**
 * 根据一个或多个条件过滤数组元素
 * @param list [array] 需要过滤的数组
 * @param byConditions [array] 过滤依据的条件，示例：[['type',1],['sex',1]]
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
  function isIncludesKeyword(
    record: CommonObj,
    condition: CommonObj,
    key: string
  ) {
    const {
      type = "blur",
      byKeys,
      keyword,
      range,
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
      const [min, max] = range;
      return (!min && !max) || (record[key] > min && record[key] < max);
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
  const opts = [];
  const map = dictMap[name];
  if (!map) return null;
  for (let key in map) {
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
    return Object.keys(dictMap[name]).map((item) => Number(item));
  } else {
    return [val];
  }
}
