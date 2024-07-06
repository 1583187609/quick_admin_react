import React from "react";
import { ResponseMenuItem } from "@/layout/_types";
import { AntdMenuItem } from "@/layout/_types";
import { createSlice, current } from "@reduxjs/toolkit";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";
import { updateState } from "../_utils";
import * as Icons from "@ant-design/icons";

export function convertToMenuNavs(menus: ResponseMenuItem[] = [], level = 0): AntdMenuItem[] {
  const filterMenus = menus.filter((it: ResponseMenuItem) => it.type !== 2);
  const antdMenus = filterMenus.map((item: ResponseMenuItem) => {
    let { path, icon = "TwitterOutlined", children, label, type } = item;
    const obj: CommonObj = {
      key: path,
      icon: level < 1 ? React.createElement(Icons[icon] ?? Icons.TwitterOutlined) : null, // 为了保持统一美观好看性，菜单多语两级的就不展示图标了
      label,
      type,
    };
    if (children?.length) {
      obj.children = convertToMenuNavs(children, level + 1);
    }
    return obj as AntdMenuItem;
  });
  return antdMenus;
}

const localMenus = storage.getItem("allMenus") || [];
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    openKeys: [], //打开的菜单项
    seledKeys: [], //选中的菜单项
    allMenus: localMenus, // 完整导航数据
    sideMenus: localMenus[0]?.children,
    activeIndex: 0,
  } as CommonObj,
  reducers: {
    // 修改state的值
    updateState,
    // 初始化菜单
    initMenus: (state, { payload = [] }) => {
      state.allMenus = payload;
    },
  },
  selectors: {
    // state: state => state,
    // getActiveKeysTest(state, args) {
    //   console.log(state, args, "args------------");
    //   let openKeys: string[] = [];
    //   let seledKeys: string[] = [];
    //   return { openKeys, seledKeys };
    // },
  },
});

export default menuSlice;
