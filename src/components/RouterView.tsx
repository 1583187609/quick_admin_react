/**
 * @link 嵌套路由配置：https://blog.csdn.net/Snow_GX/article/details/123656412
 * @link 动态路由参考：https://juejin.cn/post/7132393527501127687 和 https://blog.csdn.net/Miketutu/article/details/130445743
 */

import { useRoutes, Navigate } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import Layout from "@/layout";
import { ResponseMenuItem } from "@/layout/_types";
import { CommonObj } from "@/vite-env";
import { useStoreSlice } from "@/hooks";
import { camelCase } from "lodash";
import Login from "@/views/login";

export interface RouteItem {
  name: string; // 路由名称
  path: string;
  element?: ReactNode;
  children?: RouteItem[];
  meta?: {
    title?: string;
    cache?: boolean; // 是否缓存该页面
    auth?: boolean; // 是否需要授权才能访问
  };
}

const modules: CommonObj = import.meta.glob("../views/**/**.tsx");

export const LazyLoad = (path: string) => {
  /**
   * 不能直接使用模板字符串拼接，const Module = React.lazy(() => import(`..${path}`));
   * 故用import.meta.glob导入模块的方式
   * */
  const Module = React.lazy(modules[`../views${path}`]);
  return <Module />;
};

//将菜单allMenus处理成路由routes，将多层嵌套路由拉平成一级
function getFlatRoutes(menus: ResponseMenuItem[]): RouteItem[] {
  const routes: RouteItem[] = [];
  menus.forEach((menu: ResponseMenuItem) => {
    const { children } = menu;
    children?.forEach(child => pushRoutes(child));
    function pushRoutes(menu: ResponseMenuItem) {
      const { label, path, component, children, link_type } = menu;
      const route: RouteItem = {
        name: link_type ? "" : camelCase(path), //外部连接不生成路由信息
        path,
      };
      if (children?.length) {
        children.forEach(child => pushRoutes(child));
      } else {
        route.element = LazyLoad(component as string);
        route.meta = {
          title: label,
          // cache: true,
          // auth: true,
        };
        routes.push(route);
      }
    }
  });
  return routes;
}

const notFoundRoute = {
  path: "*",
  name: "notFound",
  element: LazyLoad("/error.tsx"),
};

// function getRoutesMap(routes: RouteItem[], map: CommonObj = {}) {
//   routes.forEach((item: RouteItem) => {
//     const { name, path, children } = item;
//     if (!name) return; // 外部连接不生成路由信息
//     if (!children?.length) {
//       map[name] = path || "/";
//     } else {
//       getRoutesMap(children, map);
//     }
//   });
//   return map;
// }

export default () => {
  const { allMenus } = useStoreSlice("menu");
  // const { updateRoutesState } = useStoreSlice("routes");
  const [routes, setRoutes] = useState<RouteItem[]>([
    {
      name: "root",
      path: "/",
      element: <Layout />,
      // element: <Navigate to="home" />,
      children: [],
    },
    // { path: "/login", element: LazyLoad("/views/login/index.tsx") }, //使用懒加载会一直执行，导致页面一直处在加载中状态
    { name: "login", path: "/login", element: <Login /> },
  ]);

  useEffect(() => {
    createRoutes(allMenus);
  }, [allMenus]);
  function createRoutes(menus: ResponseMenuItem[]) {
    routes[0].children = [
      { path: "", name: "home", element: LazyLoad("/home/index.tsx") },
      ...getFlatRoutes(menus),
      notFoundRoute,
    ];
    const newRoutes = [...routes, notFoundRoute];
    // updateRoutesState({ routes: getRoutesMap(newRoutes) });
    //重置一下，解决刷新后，初次加载会白屏的问题
    setRoutes(newRoutes);
  }
  return useRoutes(routes);
};
