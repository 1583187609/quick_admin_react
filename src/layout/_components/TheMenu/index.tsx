/**
 * 文件说明-模板文件
 */
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter, useStoreSpace } from "@/hooks";
import { CommonObj, ShowCodes } from "@/vite-env";
import { IconNames } from "@/components/BaseIcon";
import { getMenuNavs } from "@/store/modules/menu";
import s from "./index.module.less";
import { defaultHomePath } from "@/utils";
import useMenu from "@/layout/_hooks";
import BaseEmpty from "@/components/BaseEmpty";

export type LinkType = 0 | 1 | 2; //1 内部iframe渲染； 2, 新打开一个浏览器标签页展示
export type AntdMenuItem = Required<MenuProps>["items"][number];
export type ResponseMenuItem = {
  id: string;
  label: string; //导航文字
  icon: IconNames; //首字母大写，Antd中有效的图标均可，例：TwitterOutlined
  path: string;
  type: number; //0 目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
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
};
interface Props {
  className?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}
const { VITE_APP_NAME } = import.meta.env;
const title = VITE_APP_NAME;

export default ({ className = "" }: Props) => {
  const { isFold } = useStoreSpace("base");
  const { seledKeys, openKeys, allMenus, sideMenus, updateState: updateMenuState } = useStoreSpace("menu");
  const { setActiveKeys } = useMenu();
  const router = useRouter();
  const location = useLocation();
  const { pathname } = location;
  const items = getMenuNavs(sideMenus);
  useEffect(() => {
    setActiveKeys(allMenus, pathname);
  }, [allMenus, pathname]);

  const handleSelect = useCallback((info: CommonObj) => {
    const { key, selectedKeys, keyPath } = info;
    const openKeys = keyPath.slice(1).reverse();
    updateMenuState({ seledKeys: selectedKeys, openKeys });
    router.push(key);
  }, []);
  const handleOpenChange = useCallback((openKeys: string[]) => {
    updateMenuState({ openKeys });
  }, []);
  return (
    <div className={`${className} ${s.menu} ${isFold ? s.collapsed : ""} f-sb-s-c`}>
      <div onClick={() => router.push(defaultHomePath)} className={`${s.title} f-0 f-c-c line-2`}>
        {isFold ? title?.slice(0, 1) : title}
      </div>
      {items.length > 0 ? (
        <Menu
          style={{ overflow: "auto" }}
          className="f-1 all-hide-scroll"
          onSelect={handleSelect}
          onOpenChange={handleOpenChange}
          openKeys={openKeys}
          selectedKeys={seledKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={isFold}
          items={items}
        />
      ) : (
        <div className={`${s["empty-box"]} f-1 f-fs-c-c`}>
          <BaseEmpty className="mt-h" size="50" tips={<div style={{ color: "#999", fontSize: "12px" }}>无数据</div>} />
        </div>
      )}
    </div>
  );
};
