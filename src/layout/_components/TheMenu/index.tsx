/**
 * 文件说明-模板文件
 */
import React, { useCallback, useEffect, useState } from "react";
import BaseImg from "@/components/BaseImg";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter, useStoreSpace } from "@/hooks";
import { CommonObj, ShowCodes } from "@/vite-env";
import { IconNames } from "@/components/BaseIcon";
import { getMenuNavs } from "@/store/modules/menu";
import s from "./index.module.less";

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
  title?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}
export default ({ className = "", title }: Props) => {
  const { isFold } = useStoreSpace("base");
  // const [isFold, setIsFold] = useState(false);
  // const toggleFold = () => setIsFold(!isFold);
  const { allMenus, sideMenus } = useStoreSpace("menu");
  const router = useRouter();
  const location = useLocation();
  const { pathname } = location;
  const [seledKeys, setSeledKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    const { seledKeys, openKeys } = getActiveKeys(allMenus, pathname);
    setSeledKeys(seledKeys);
    setOpenKeys(openKeys);
  }, [allMenus, pathname]);
  //获取被选中的菜单keys
  function getActiveKeys(navs: ResponseMenuItem[], pathName: string) {
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
  const handleSelect = useCallback((info: CommonObj) => {
    const { key, selectedKeys } = info;
    router.push(key);
  }, []);
  const handleOpenChange = useCallback((openKeys: string[]) => {
    setOpenKeys(openKeys);
  }, []);
  return (
    <div
      className={`${className} ${s.menu} ${isFold ? s.collapsed : ""} f-sb-s-c`}
    >
      <div
        onClick={() => router.push("/")}
        className={`${s.title} f-0 f-c-c line-2`}
      >
        {isFold ? title?.slice(0, 1) : title}
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
        inlineCollapsed={isFold}
        items={getMenuNavs(sideMenus)}
      />
    </div>
  );
};
