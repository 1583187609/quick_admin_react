import { TagType, TagEffect } from "@/components/BaseTag";
import dict from ".";
import colors from "./colors";

export type DictName = keyof typeof dict;
export type TagColorName = keyof typeof colors;
// export type DictName = keyof InstanceType<typeof dict>;
// export type TagColorName = keyof InstanceType<typeof colors>;
export interface DictItemProps {
  text: string;
  disabled?: boolean; //作为下拉选项时是否禁用
  //下面 elementPlus 标签 el-tag 的属性
  attrs?: {
    color?: string;
    type?: TagType;
    style?: any;
    effect?: TagEffect;
  };
}

export interface DictMap {
  [key: string]: {
    [key: string]: DictItemProps;
  };
}
