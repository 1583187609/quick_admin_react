import { ShowCodes } from "@/vite-env";
import { IconNames } from "@/components/BaseIcon";
import { MenuProps } from "rc-menu";

export type LinkType = 0 | 1 | 2; //1 内部iframe渲染； 2, 新打开一个浏览器标签页展示

export type MenuEffect = "dark" | "light";
export interface ResponseMenuItem {
  id: string;
  label: string; //导航文字
  icon?: IconNames; //首字母大写，ElementPlus中有效的图标均可，例：Promotion
  path: string;
  type: number; //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
  auth_codes?: number[] | null; //该路由的权限 0超级管理员 1普通管理员 2特殊用户 3普通用户 4游客用户 5开发人员
  status: ShowCodes; //0 禁用 1启用
  is_cache?: ShowCodes; //是否缓存：0否 1是
  link_type?: LinkType;
  disabled?: ShowCodes; //是否禁用：0否 1是
  order?: number; //显示的位置顺序，数值越大越靠后，支持负数
  component?: string;
  children?: ResponseMenuItem[];
  create_time?: string; //创建时间
  update_time?: string; //修改时间
}

export type AntdMenuItem = Required<MenuProps>["items"][number];
