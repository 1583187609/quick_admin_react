import * as Icons from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { upperFirst, camelCase } from "lodash";
import { MenusItem, MenuItem } from "./_components/TheMenu";

export function handleNavs(navs: MenusItem[] = []): MenuItem[] {
  return navs?.map((item: any) => {
    let { path, icon = null, children, label, type } = item;
    if (icon) {
      const iconName = upperFirst(camelCase(icon));
      const Icon: any = Icons[iconName as keyof typeof Icons];
      icon = React.createElement(Icon);
    }
    if (children) {
      children = handleNavs(children);
    }
    const obj = {
      key: path,
      icon,
      children,
      label,
      type,
    };
    return obj as MenuItem;
  });
}
