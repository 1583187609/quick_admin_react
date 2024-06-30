import { storage, typeOf, printLog } from "@/utils";
import { createSlice, current } from "@reduxjs/toolkit";
import { merge } from "lodash";
import dict, { DictName } from "@/dict";
import { CommonObj } from "@/vite-env";

/**
 * 将对象按属性排序（整理文件按属性排序的时候会用到）
 * @param map CommonObj
 */
function sortMapByKey(map: CommonObj) {
  const keys = Object.keys(map);
  keys.sort();
  const obj: CommonObj = {};
  keys.forEach((key, ind) => {
    obj[key] = map[key];
  });
  return obj;
}

export default createSlice({
  name: "dict",
  initialState: {
    dictMap: dict,
  },
  reducers: {
    /**
     * 获取tagMap
     * @param name 映射map的名称
     * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
     */
    getMap: (state, { payload }) => {
      const { name, codeMap } = payload;
      const { dictMap } = current(state);
      const currMap = dictMap[name];
      if (currMap) {
        if (codeMap) {
          const tempMap: CommonObj = {};
          for (const key in codeMap) {
            tempMap[key] = currMap[codeMap[key]];
          }
          return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
        }
        return currMap;
      } else {
        console.error("未找到name为" + name + "的tagMap");
        return {};
      }
    },
    /**
     * 获取字典文本内容
     * @param name string 字典名称
     * @param key string 字典中的建名
     * @param char string 为空时的占位符号
     */
    getText: (state, { payload }) => {
      const { name, key, char = "-" } = payload;
      // const currMap = getMap(name);
      // return currMap[key]?.text || char;
    },
    /**
     * 获取字典下拉项
     * @param name DictName 字典名称
     * @param includeKeys string[] 过滤时要包含的keys
     * @param isExclude boolean 是否排除掉要包含的keys
     */
    getOpts: (state, { payload }) => {
      const { name, includeKeys = [], isExclude = false } = payload;
      // const currMap = getMap(name);
      // let opts: OptionItem[] = [];
      // for (let key in currMap) {
      //   const { text, disabled } = currMap[key];
      //   const val = isNaN(Number(key)) ? key : Number(key);
      //   const opt: OptionItem = { label: text, value: val };
      //   if (disabled !== undefined) {
      //     opt.disabled = disabled;
      //   }
      //   opts.push(opt);
      // }
      // if (typeOf(includeKeys) !== "Array") {
      //   throw new Error("请传入一个数组");
      // }
      // if (includeKeys?.length) {
      //   opts = opts.filter((it) => {
      //     const isInclude = includeKeys.includes(it.value as StrNum);
      //     return isExclude ? !isInclude : isInclude;
      //   });
      // }
      // return opts;
      return [];
    },
  },
});
