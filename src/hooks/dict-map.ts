import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import { merge } from "lodash";
import { useStoreSlice } from ".";
import { DictName } from "@/dict";
import { CascaderName } from "@/dict/cascader";
import { typeOf } from "@/utils";

export default () => {
  const { dictMap, cascaderMap } = useStoreSlice("dict");
  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DictName, codeMap?: CommonObj) {
    const currMap = dictMap[name];
    if (!currMap) return console.error("未找到name为" + name + "的tagMap");
    if (codeMap) {
      const tempMap: CommonObj = {};
      for (const key in codeMap) {
        tempMap[key] = currMap[codeMap[key]];
      }
      return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
    }
    return currMap;
  }

  /**
   * 获取字典文本内容
   * @param name string 字典名称
   * @param key string 字典中的建名
   * @param char string 为空时的占位符号
   */
  function getText(name: DictName, key: StrNum, char = "-"): string {
    const currMap = getMap(name);
    return currMap[key]?.text || char;
  }

  /**
   * 获取字典下拉项
   * @param name DictName 字典名称
   * @param includeKeys string[] 过滤时要包含的keys
   * @param isExclude boolean 是否排除掉要包含的keys
   */
  function getOpts(name: DictName, includeKeys: StrNum[] = [], isExclude = false): OptionItem[] {
    const currMap = getMap(name);
    let opts: OptionItem[] = [];
    for (let key in currMap) {
      const { text, disabled } = currMap[key];
      const val = isNaN(Number(key)) ? key : Number(key);
      const opt: OptionItem = { label: text, value: val };
      if (disabled !== undefined) {
        opt.disabled = disabled;
      }
      opts.push(opt);
    }
    if (typeOf(includeKeys) !== "Array") {
      throw new Error("请传入一个数组");
    }
    if (includeKeys?.length) {
      opts = opts.filter(it => {
        const isInclude = includeKeys.includes(it.value as StrNum);
        return isExclude ? !isInclude : isInclude;
      });
    }
    return opts;
  }

  /**
   * 获取级联中的文字
   * @param name 级联名称
   * @param val 查找文本时依据的code值
   * @param char 连接多个文本的字符串
   * @returns
   */
  function getCascaderText(name: CascaderName, val: StrNum, char = "-") {
    if (typeof val === "undefined") return char;
    const regions: OptionItem[] = cascaderMap[name];
    if (!regions) throw new Error(`未找到name为${name}的字典映射`);
    let text = "";
    regions.find(item => {
      const { label, children = [] } = item;
      const target = children.find((it: OptionItem) => it.value === val);
      if (target) {
        text = `${label}${char}${target.label}`;
      }
      return !!target;
    });
    return text;
  }

  /**
   * 获取级联下拉项
   * @param name 级联名称
   * @returns
   */
  function getCascaderOpts(name: CascaderName): OptionItem[] {
    const opts = cascaderMap[name];
    if (!opts) throw new Error(`未找到name为${name}的字典映射`);
    return opts;
  }

  return {
    getMap,
    getText,
    getOpts,
    getCascaderText,
    getCascaderOpts,
  };
};
