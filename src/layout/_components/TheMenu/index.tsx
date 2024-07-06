/**
 * 文件说明-模板文件
 */
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import { useRouter, useStoreSlice } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { convertToMenuNavs } from "@/store/modules/menu";
import { defaultHomePath } from "@/utils";
import useMenu from "@/layout/_hooks";
import BaseEmpty from "@/components/BaseEmpty";
import s from "./index.module.less";

interface Props {
  className?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}
const { VITE_APP_NAME } = import.meta.env;
const title = VITE_APP_NAME;

export default ({ className = "" }: Props) => {
  const { isFold } = useStoreSlice("base");
  const { seledKeys, openKeys, allMenus, sideMenus, updateState: updateMenuState } = useStoreSlice("menu");
  const { setActiveKeys } = useMenu();
  const router = useRouter();
  const location = useLocation();
  const { pathname } = location;
  const items = convertToMenuNavs(sideMenus);
  console.log(sideMenus, items, "items-navs------------------");
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
