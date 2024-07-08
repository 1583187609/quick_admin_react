import React from "react";
import { ResponseMenuItem } from "@/layout/_types";
import { AntdMenuItem } from "@/layout/_types";
import { createSlice, current } from "@reduxjs/toolkit";
import { getUserInfo, storage } from "@/utils";
import { CommonObj } from "@/vite-env";
import { updateState } from "../_utils";
import * as Icons from "@ant-design/icons";

export function convertToMenuNavs(menus: ResponseMenuItem[] = [], userType = getUserInfo()?.type, level = 0): AntdMenuItem[] {
  const filterMenus = menus.filter((it: ResponseMenuItem) => {
    const { type, auth_codes } = it;
    if (!auth_codes?.length) return true;
    return type !== 2 && auth_codes.includes(userType);
    // return it.type !== 2;
  });
  const antdMenus = filterMenus.map((item: ResponseMenuItem) => {
    let { path, icon = "TwitterOutlined", children, label, type } = item;
    const obj: CommonObj = {
      key: path,
      icon: level < 1 ? React.createElement(Icons[icon] ?? Icons.TwitterOutlined) : null, // 为了保持统一美观好看性，菜单多语两级的就不展示图标了
      label,
      type,
    };
    if (children?.length) {
      obj.children = convertToMenuNavs(children, userType, level + 1);
    }
    return obj as AntdMenuItem;
  });
  return antdMenus;
}

const localMenus = storage.getItem("allMenus") || [];
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isCollapse: storage.getItem("isCollapse", "session") ?? false, //是否折叠菜单
    updatedTitle: false, // 是否已经更新了document.title
    openKeys: [], //打开的菜单项
    seledKeys: [], //选中的菜单项
    activeIndex: 0, // 当前选中根菜单的下标项
    allMenus: localMenus, // 完整导航数据
    sideMenus: localMenus[0]?.children,
  } as CommonObj,
  reducers: {
    // 修改state的值
    updateMenuState: updateState,
    // 初始化菜单
    initMenus: (state, { payload = [] }) => {
      state.allMenus = payload;
    },
  },
});

export default menuSlice;
