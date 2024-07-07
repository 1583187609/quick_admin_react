/**
 * 文件说明-模板文件
 */

import { useRouter, useStoreSlice } from "@/hooks";
import { convertToMenuNavs } from "@/store/modules/menu";
import { CommonObj } from "@/vite-env";
import { Menu } from "antd";
import { CSSProperties, useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import BaseEmpty from "@/components/BaseEmpty";
import useMenu from "@/layout/_hooks";
import { ResponseMenuItem } from "@/layout/_types";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  mode?: "horizontal" | "inline";
  [key: string]: any;
}

const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "", theme = "dark", ...restProps }: Props) => {
  const { layout } = useStoreSlice("set");
  const { seledKeys, openKeys, allMenus, sideMenus, updateMenuState } = useStoreSlice("menu");
  const router = useRouter();
  const location = useLocation();
  const { changeActiveIndex } = useMenu();
  const { pathname } = location;
  const items = convertToMenuNavs(layout.type !== "columns" ? allMenus : sideMenus);
  // 如果是分栏布局展示，则渲染的菜单项只是 sideMenus 的数据，所以openKeys, seledKeys 要区分处理
  const isSubMenu = layout.type === "columns";
  useEffect(() => {
    setOpenAndSeledKeys(allMenus, pathname);
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
  // 设置打开的菜单、被选中的菜单keys
  function setOpenAndSeledKeys(menus: ResponseMenuItem[], pathName: string) {
    let openKeys: string[] | undefined;
    let seledKeys: string[] | undefined;
    let rootInd: number = -1;
    function findTarget(arr: ResponseMenuItem[], level = 0): ResponseMenuItem | undefined {
      return arr.find((item: any, ind: number) => {
        const { children, path, label = VITE_APP_NAME } = item;
        if (children?.length) {
          const target = findTarget(children as ResponseMenuItem[], level + 1);
          if (target) {
            document.title = target.label || VITE_APP_NAME;
            updateMenuState({ updatedTitle: true });
            if (isSubMenu) {
              if (target?.children?.length) {
                openKeys = [target.path];
                seledKeys = [target.children[0]?.path];
                // console.log(openKeys, seledKeys, "seledKeys---------------------1");
              } else {
                seledKeys = [target.path];
                // console.log(openKeys, seledKeys, "seledKeys---------------------2");
              }
            } else {
              openKeys = [target.path];
              const tarPath = target?.children?.[0]?.path;
              if (tarPath) seledKeys = [tarPath];
            }
            if (level === 0) rootInd = ind;
          }
          return !!target;
        } else {
          const isFind = path === pathName;
          if (isFind) {
            document.title = label;
            updateMenuState({ updatedTitle: true });
            if (level === 0) rootInd = ind;
            if (children?.length) {
              openKeys = [path];
            } else {
              seledKeys = [path];
            }
            // console.log(openKeys, seledKeys, "seledKeys---------------------3");
          }
          return isFind;
        }
      });
    }
    const target = findTarget(menus);
    changeActiveIndex(rootInd, false);
    updateMenuState({ openKeys, seledKeys });
    return target?.path; // rootPath
  }
  return items.length > 0 ? (
    <Menu
      style={{ overflow: "auto" }}
      className={`${className}`}
      onSelect={handleSelect}
      onOpenChange={handleOpenChange}
      openKeys={openKeys}
      selectedKeys={seledKeys}
      theme={theme}
      items={items}
      {...restProps}
    />
  ) : (
    <div className={`${s["empty-box"]} f-1 f-fs-c-c`}>
      <BaseEmpty className="mt-h" size="50" tips={<div style={{ color: "#999", fontSize: "12px" }}>无数据</div>} />
    </div>
  );
};
