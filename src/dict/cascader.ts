import { GetCascaderRegion } from "@/api-mock";

export type CascaderName = keyof typeof cascader;

/**
 * 级联的逻辑处理暂时放在这里，后续再改进放置位置
 */

export const cascader = {
  // 地区（省市区）
  Region: await GetCascaderRegion().then((res: any) => res),
};
