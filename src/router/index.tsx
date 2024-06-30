/**
 * @link 嵌套路由配置：https://blog.csdn.net/Snow_GX/article/details/123656412
 * @link 动态路由参考：https://juejin.cn/post/7132393527501127687 和 https://blog.csdn.net/Miketutu/article/details/130445743
 */

import { useRoutes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import { ResponseMenuItem } from "@/layout/_components/TheMenu";
import Login from "@/views/login";
import { CommonObj } from "@/vite-env";
import { useStoreSpace } from "@/hooks";

export interface RouteItem {
  path: string;
  element?: any;
  children?: RouteItem[];
  meta?: {
    title?: string;
    cache?: boolean;
    auth?: boolean;
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

//将菜单allMenus处理成路由routes
function getRoutes(menus: ResponseMenuItem[]): RouteItem[] {
  const routes: RouteItem[] = [];
  menus.forEach((menu: ResponseMenuItem) => {
    const { children } = menu;
    children?.forEach(child => getRoutes(child));
    function getRoutes(menu: ResponseMenuItem) {
      const { label, path, component, children } = menu;
      const route: RouteItem = {
        path,
      };
      if (children?.length) {
        route.children = children.map(child => getRoutes(child));
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

export default () => {
  const { allMenus } = useStoreSpace("menu");
  const [routes, setRoutes] = useState<RouteItem[]>([
    {
      path: "/",
      element: <Layout />,
      // element: <Navigate to="home" />,
      children: [],
    },
    // { path: "/login", element: LazyLoad("/views/login/index.tsx") }, //使用懒加载会一直执行，导致页面一直处在加载中状态
    { path: "/login", element: <Login /> },
  ]);

  useEffect(() => {
    createRoutes(allMenus);
  }, [allMenus]);

  function createRoutes(menus: ResponseMenuItem[]) {
    routes[0].children = [
      { path: "", element: LazyLoad("/home/index.tsx") },
      ...getRoutes(menus),
      {
        path: "*",
        element: LazyLoad("/error.tsx"),
      },
    ];
    //重置一下，解决刷新后，初次加载会白屏的问题
    setRoutes([...routes, { path: "*", element: LazyLoad("/error.tsx") }]);
  }
  return useRoutes(routes);
};
