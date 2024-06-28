/**
 * 文件说明-模板文件
 */
import React, { useEffect, useMemo, useState } from "react";
import BaseImg from "@/components/BaseImg";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { handleNavs } from "../../_help";
import s from "./index.module.less";
import { useRouter } from "@/hooks";

export type MenuItem = Required<MenuProps>["items"][number];
export type MenusItem = {
  id: string;
  path: string;
  label: string;
  icon?: string | null;
  // type?: "group";
  status?: number;
  component?: string; //组件路径
  children?: MenusItem[];
};
interface Props {
  className?: string;
  navs?: MenusItem[];
  collapsed?: boolean;
  title?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}
export default ({
  className = "",
  navs = [],
  collapsed = false,
  title,
}: Props) => {
  const router = useRouter();
  const location = useLocation();
  const { pathname } = location;
  const [seledKeys, setSeledKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const items: MenuItem[] = handleNavs(navs as MenusItem[]);
  useEffect(() => {
    const { seledKeys, openKeys } = getActiveKeys(navs, pathname);
    setSeledKeys(seledKeys);
    setOpenKeys(openKeys);
  }, [navs, pathname]);
  //获取被选中的菜单keys
  function getActiveKeys(navs: MenusItem[], pathName: string) {
    let openKeys: string[] = [];
    let seledKeys: string[] = [];
    function findTarget(arr: any) {
      return arr.find((item: any) => {
        const { children, path } = item;
        if (children) {
          let target = findTarget(children);
          if (target) {
            openKeys = [path];
            seledKeys = [target.path];
          }
          return !!target;
        } else {
          let isFind = path === pathName;
          isFind && (seledKeys = [path]);
          return isFind;
        }
      });
    }
    findTarget(navs);
    return { openKeys, seledKeys };
  }
  function handleSelect(info: CommonObj) {
    const { key, selectedKeys } = info;
    router.push(key);
  }
  function handleOpenChange(openKeys: string[]) {
    setOpenKeys(openKeys);
  }
  return (
    <div
      className={`${className} ${s.menu} ${
        collapsed ? s.collapsed : ""
      } f-sb-s-c`}
    >
      <div onClick={() => router.push("/")} className={`${s.title} f-0 f-c-c`}>
        <BaseImg className="f-0" size="26" round></BaseImg>
        {!collapsed && <span className="ml-h line-2">{title}</span>}
      </div>
      <Menu
        style={{ overflow: "auto" }}
        className="f-1 all-hide-scroll"
        onSelect={handleSelect}
        onOpenChange={handleOpenChange}
        openKeys={openKeys}
        selectedKeys={seledKeys}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
