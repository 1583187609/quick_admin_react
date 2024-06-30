import { createSlice, current } from "@reduxjs/toolkit";
import dict, { DictName } from "@/dict";
import { cascader, type CascaderName } from "@/dict/cascader";
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
    cascaderMap: cascader,
  },
  reducers: {},
});
