import { CSSProperties, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { ResponseMenuItem } from "@/layout/_types";
import { CommonObj } from "@/vite-env";
import { defaultHomePath } from "@/utils";
import { useLocation } from "react-router-dom";
import { useStoreSlice } from "@/hooks";
import BaseIcon from "@/components/BaseIcon";
import useMenu from "@/layout/_hooks";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", ...restProps }: Props) => {
  const { allMenus } = useStoreSlice("menu");
  const { layout } = useStoreSlice("set");
  const { toFirstPath } = useMenu();
  const location = useLocation();
  const { pathname } = location;
  const isDark = ["vertical", "horizontal"].includes(layout.type);
  const [breadcrumbs, setBreadcrumbs] = useState<ResponseMenuItem[]>([
    {
      id: "0",
      icon: "HomeOutlined",
      path: defaultHomePath,
      label: "首页",
      type: 0,
      status: 1,
    },
  ]);
  useEffect(() => {
    const list = breadcrumbs.slice(0, 1);
    if (pathname !== defaultHomePath) {
      list.push(...(getAllBreadcrumbs(allMenus)[pathname] ?? []));
    }
    setBreadcrumbs(list);
  }, [pathname]);
  function getAllBreadcrumbs(menus: ResponseMenuItem[], parent = [], result: CommonObj = {}) {
    for (const item of menus) {
      result[item.path] = [...parent, item];
      if (item.children) getAllBreadcrumbs(item.children, result[item.path], result);
    }
    return result;
  }
  return (
    <Breadcrumb
      className={`${className} ${s["path-breadcrumb"]}`}
      separator={<span className={`${s.item} ${isDark ? s.dark : s.light}`}>/</span>}
      // params={{}} //路由参数
      items={breadcrumbs.map((item: ResponseMenuItem, ind: number) => {
        const { path, label, icon } = item;
        return {
          title: (
            <div
              onClick={() => toFirstPath(item)}
              className={`${s.item} ${isDark ? s.dark : s.light} ${ind == breadcrumbs.length - 1 ? s.active : ""} ${
                ind === 0 ? s.home : ""
              } ${ind !== 0 && ind !== breadcrumbs.length - 1 ? s.link : ""}`}
            >
              {icon && <BaseIcon className="mr-4" name={icon} />}
              {label}
            </div>
          ),
        };
      })}
      {...restProps}
    />
  );
};
