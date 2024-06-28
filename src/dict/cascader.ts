import { GetCascaderRegion } from "@/api-mock";
import { needParam, storage } from "@/utils";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";

export type CascaderName = keyof typeof cascaderMap;

/**
 * 级联的逻辑处理暂时放在这里，后续再改进放置位置
 */

export const cascaderMap = {
  // 地区（省市区）
  Region: await GetCascaderRegion().then((res: any) => res),
};

// 获取级联中的文字
export function getCascaderText(name: CascaderName, val: StrNum, char = "-") {
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

// 获取级联下拉项
export function getCascaderOpts(name: CascaderName): OptionItem[] {
  const opts = cascaderMap[name];
  if (!opts) throw new Error(`未找到name为${name}的字典映射`);
  return opts;
}
