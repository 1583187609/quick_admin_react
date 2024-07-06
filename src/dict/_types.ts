import dict from ".";
import { tagColorMap } from "./_config";
import { ReactNode } from "react";

export type DictName = keyof typeof dict;
export type TagColorName = keyof typeof tagColorMap;
// export type DictName = keyof InstanceType<typeof dict>;
// export type TagColorName = keyof InstanceType<typeof tagColorMap>;

export interface DictItemProps {
  text: string;
  disabled?: boolean; //作为下拉选项时是否禁用
  //下面 elementPlus 标签 el-tag 的属性
  attrs?: {
    color?: string | "success" | "processing" | "error" | "warning" | "default";
    icon?: ReactNode;
    closeIcon?: ReactNode;
    bordered?: boolean;
  };
}

export interface DictMap {
  [key: string]: {
    [key: string]: DictItemProps;
  };
}
