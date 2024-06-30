import React, { CSSProperties, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { ResponseMenuItem } from "@/layout/_components/TheMenu";
import { CommonObj } from "@/vite-env";
import { defaultHomePath } from "@/utils";
import { useLocation } from "react-router-dom";
import { useStoreSpace } from "@/hooks";
import BaseIcon from "@/components/BaseIcon";
import useMenu from "@/layout/_hooks";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", ...restProps }: Props) => {
  const { allMenus } = useStoreSpace("menu");
  const { toFirstPath } = useMenu();
  const location = useLocation();
  const { pathname } = location;
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
      className={`${className}`}
      items={breadcrumbs.map((item: ResponseMenuItem, ind: number) => {
        const { path, label, icon } = item;
        return {
          href: path,
          title: (
            <div onClick={() => toFirstPath(item)} style={{ color: "#fff" }}>
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
