import { CommonObj } from "@/vite-env";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { urlParamsToSearch } from "../_utils";
import routes from "@/router/routes";
// import { useStoreSlice } from "@/hooks";

export interface RouteProps {
  name: string;
  query?: CommonObj;
  replace?: boolean;
}

export default () => {
  const navigate = useNavigate();
  // const { routes } = useStoreSlice("routes");
  function toPathStr(path: string | RouteProps = "") {
    if (typeof path === "string") return path;
    const { name, query } = path;
    const route = routes[name as string];
    if (!route) throw new Error(`未找到路由名为${name}的路由地址`);
    return `${route}?${urlParamsToSearch(query)}`;
  }
  return {
    go(num: number) {
      navigate(num);
    },
    push(path: string | RouteProps) {
      if (!path) return;
      navigate(toPathStr(path));
    },
    replace(path: string | RouteProps) {
      if (!path) return;
      navigate(toPathStr(path), { replace: true });
    },
    redirect(path: string | RouteProps) {
      console.error("暂未处理重定向路由");
      // if (!path) return;
      // const newPath = toPathStr(path);
      // navigate(newPath, { redirect: true } as NavigateOptions); // 不存在 redirect 属性
    },
  };
};
