import { CommonObj } from "@/vite-env";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { defaultHomePath, getUserInfo, showMessage, storage, urlParamsToSearch } from "../_utils";
import routes from "@/router/routes";
import { ResponseMenuItem } from "@/layout/_types";
import { useStoreSlice } from "@/hooks";

export interface RouteProps {
  name: string;
  query?: CommonObj;
  replace?: boolean;
}

function toPathStr(path: string | RouteProps = "") {
  if (typeof path === "string") return path;
  const { name, query } = path;
  const route = routes[name as string];
  if (!route) throw new Error(`未找到路由名为${name}的路由地址`);
  return `${route}?${urlParamsToSearch(query)}`;
}

/***
 * 获取当前路由页面是否授权
 */
const whiteList = ["/login", "/403", "/404", "/500"];
export function getRouteIsAuth(path: string, allNavs: ResponseMenuItem[] = storage.getItem("allMenus"), type?: number) {
  if (whiteList.some((it: string) => path.startsWith(it))) return true;
  const userType = type ?? getUserInfo()?.type;
  if (!allNavs?.length) return false;
  let isAuth = false;
  const newPath = path.split("?")[0];
  function cycleIsFind(arr: ResponseMenuItem[]): boolean {
    if (!arr) return false;
    return !!arr.find((item: ResponseMenuItem) => {
      const { path, children, auth_codes } = item;
      if (children?.length) {
        isAuth = auth_codes?.length ? auth_codes.includes(userType) : true;
        if (isAuth) return cycleIsFind(children);
        return false;
      } else {
        const isFind = path === newPath;
        if (isFind) {
          isAuth = auth_codes?.length ? auth_codes.includes(userType) : true;
        }
        return isFind;
      }
    });
  }
  cycleIsFind(allNavs);
  return isAuth;
}

export default () => {
  const navigate = useNavigate();
  const { userInfo } = useStoreSlice("user");

  function autoNavigateTo(path: string | RouteProps, other?: CommonObj) {
    if (!path) return navigate(defaultHomePath);
    const newPath = toPathStr(path);
    const noAuthPaths = ["/login"];
    if (noAuthPaths.some((it: string) => newPath.startsWith(it))) return navigate(newPath, other);
    if (userInfo) {
      if (getRouteIsAuth(newPath)) return navigate(newPath, other);
      // navigate(`/403?redirect=${newPath}`, { replace: true });
      navigate(newPath, other);
    } else {
      // showMessage("请登录", "warning");
      // navigate(`/login?redirect=${newPath}`, { replace: true });
      navigate(newPath, other);
    }
  }
  function go(num: number) {
    navigate(num);
  }
  function push(path: string | RouteProps) {
    autoNavigateTo(path);
  }
  function replace(path: string | RouteProps) {
    autoNavigateTo(path, { replace: true });
  }
  function redirect(path: string | RouteProps) {
    console.error("暂未处理重定向路由");
    if (!path) return navigate(defaultHomePath);
  }
  return {
    go,
    push,
    replace,
    redirect,
    autoNavigateTo,
  };
};
