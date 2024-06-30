/**
 * @link 嵌套路由配置：https://blog.csdn.net/Snow_GX/article/details/123656412
 * @link 动态路由参考：https://juejin.cn/post/7132393527501127687 和 https://blog.csdn.net/Miketutu/article/details/130445743
 */

import { useRoutes, Navigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Layout from "@/layout";
import { MenusItem } from "@/layout/_components/TheMenu";
import Login from "@/views/login";
import { CommonObj } from "@/vite-env";
import { useStoreSpace } from "@/hooks";

export const MenusContext = createContext<MenusItem[]>([]);

const modules: CommonObj = import.meta.glob("../views/**/**.tsx");

export const lazyLoad = (path: string) => {
  /**
   * 不能直接使用模板字符串拼接，const Module = React.lazy(() => import(`..${path}`));
   * 故用import.meta.glob导入模块的方式
   * */
  const Module = React.lazy(modules[`../views${path}`]);
  return <Module />;
};

//将菜单allMenus处理成路由routes
function getHandleRoutes(menus: MenusItem[]): any[] {
  const routes: any[] = [];
  menus.map((menu: MenusItem) => {
    const { children } = menu;
    children?.map((child) => {
      getRoutes(child);
    });
    function getRoutes(menu: MenusItem) {
      const { label, path, component, children } = menu;
      const route: any = {
        path,
      };
      if (children?.length) {
        route.children = children.map((child) => {
          getRoutes(child);
        });
      } else {
        route.element = lazyLoad(component as string);
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
  const [routes, setRoutes] = useState<any[]>([
    {
      path: "/",
      element: <Layout />,
      // element: <Navigate to="home" />,
      children: [],
    },
    // { path: "/login", element: lazyLoad("/views/login/index.tsx") }, //使用懒加载会一直执行，导致页面一直处在加载中状态
    { path: "/login", element: <Login /> },
  ]);

  useEffect(() => {
    getNavs();
  }, []);

  function getNavs() {
    const tempRoutes = getHandleRoutes(allMenus);
    routes[0].children = [
      { path: "", element: lazyLoad("/home/index.tsx") },
      ...tempRoutes,
      {
        path: "*",
        element: lazyLoad("/error.tsx"),
      },
    ];
    //重置一下，解决刷新后，初次加载会白屏的问题
    setRoutes([...routes, { path: "*", element: lazyLoad("/error.tsx") }]);
  }
  return useRoutes(routes);
};
