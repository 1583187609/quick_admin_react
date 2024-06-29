import * as Icons from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { MenusItem, MenuItem } from "./_components/TheMenu";
import { CommonObj } from "@/vite-env";

export function handleNavs(navs: MenusItem[] = []): MenuItem[] {
  return navs.map((item: MenusItem) => {
    let { path, icon = "TwitterOutlined", children, label, type } = item;
    const obj: CommonObj = {
      key: path,
      icon: React.createElement(Icons[icon] ?? Icons.TwitterOutlined),
      label,
      type,
    };
    if (children) {
      obj.children = handleNavs(children) ?? null;
    }
    return obj as MenuItem;
  });
}
