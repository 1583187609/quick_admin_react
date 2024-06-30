import React, { useEffect, useState } from "react";
import {
  LinkType,
  ResponseMenuItem,
} from "@/layout/_components/SideMenu/_types";
import { AntdMenuItem } from "@/layout/_components/TheMenu";
import { createSlice, current } from "@reduxjs/toolkit";
import { defaultHomePath, storage } from "@/utils";
import baseStore from "@/store/modules/base";
import * as Icons from "@ant-design/icons";
import { CommonObj } from "@/vite-env";

export function getMenuNavs(menus: ResponseMenuItem[] = []): AntdMenuItem[] {
  menus = menus.filter((it: ResponseMenuItem) => it.type !== 2);
  return menus.map((item: ResponseMenuItem) => {
    let { path, icon = "TwitterOutlined", children, label, type } = item;
    const obj: CommonObj = {
      key: path,
      icon: React.createElement(Icons[icon] ?? Icons.TwitterOutlined),
      label,
      type,
    };
    if (children?.length) {
      obj.children = getMenuNavs(children);
    }
    return obj as AntdMenuItem;
  });
}

const localMenus = storage.getItem("allMenus") || [];
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    allMenus: localMenus, // 完整导航数据
    sideMenus: localMenus[0]?.children,
    activeIndex: 0,
  },
  reducers: {
    // 初始化菜单
    initMenus: (state, { payload = [] }) => {
      state.allMenus = payload;
    },
    // 初始化菜单选中项
    initMenusActive: (state, { payload }) => {
      const { pathname } = payload;
      // const { allMenus, activeIndex: activeInd } = state;
      // const subMenus = allMenus;
      // let currPath = defaultHomePath;
      // if (subMenus[activeInd]?.children?.length) {
      //   function isFind(children: ResponseMenuItem[]): boolean {
      //     return !!children.find((sItem, sInd) => {
      //       const { children = [], path, label } = sItem;
      //       if (path === pathname) {
      //         document.title = label;
      //       }
      //       return path === pathname || isFind(children);
      //     });
      //   }
      //   const target = subMenus.find((gItem, gInd) => {
      //     const { children = [] } = gItem;
      //     const find = isFind(children);
      //     if (find) changeActiveIndex(gInd, false);
      //     return find;
      //   });
      //   if (target) currPath = target.path ?? defaultHomePath;
      // } else {
      //   const { VITE_APP_NAME } = import.meta.env;
      //   const { path = defaultHomePath, label = VITE_APP_NAME } =
      //     subMenus?.[activeInd] || {};
      //   document.title = label;
      //   currPath = path;
      // }
      // return currPath;
    },
    // 切换选中的菜单下标
    changeActiveIndex: (state, { payload }) => {
      const { ind, toFirst = true, allNavs = state.allMenus } = payload;
      state.activeIndex = ind;
      // if (ind === -1) baseStore.isFold = true;
      // if (!toFirst) return;
      const subNavs = allNavs[ind]?.children;
      // baseStore.isFold = !subNavs?.length;
      // if (subNavs?.length) toFirstPath(allNavs[ind]);
      state.sideMenus = subNavs;
    },
    // 路由跳转到子级第一个路径对应的页面
    toFirstPath: (state, { payload }) => {
      const { menu } = payload;
      // if (!menu.children?.length) return;
      // const { children = [], path, label, link_type } = menu?.children[0];
      // if (link_type) {
      //   // router.push({ name: "innerLink", query: { url: path } });
      //   // if (link_type === 1) {
      //   //   return (document.title = label);
      //   // }
      //   // if (link_type === 2) {
      //   //   return window.open(path, "_blank");
      //   // }
      //   // throw new Error(`暂不支持code为${link_type}的外链类型`);
      // } else {
      //   if (children.length) {
      //     if (children[0].children?.length) {
      //       toFirstPath(children[0]);
      //     } else {
      //       const { path, label } = children[0];
      //       router.push(path);
      //       document.title = label;
      //     }
      //   } else {
      //     router.push(path);
      //     document.title = label;
      //   }
      // }
    },
  },
});

export default menuSlice;
