import { CommonObj } from "@/vite-env";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { defaultHomePath, getUserInfo, noAuthPaths, showMessage, storage, urlParamsToSearch } from "../_utils";
import routes from "@/router";
import { ResponseMenuItem } from "@/layout/_types";

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

export function hasRouteAuth(
  path: string,
  type = getUserInfo()?.type,
  allNavs: ResponseMenuItem[] = storage.getItem("allMenus")
) {
  if (path === defaultHomePath || path === "") return true;
  if (!allNavs?.length) return true;
  let isAuth = false;
  const newPath = path.split("?")[0];
  function getIsFind(arr: ResponseMenuItem[]): boolean {
    if (!arr) return false;
    return !!arr.find((item: ResponseMenuItem) => {
      const { path, children, auth_codes } = item;
      if (children?.length) {
        const isMenuAuth = auth_codes?.length ? auth_codes.includes(type) : true;
        if (isMenuAuth) return getIsFind(children);
        return false;
      } else {
        const isFind = path === newPath;
        if (isFind) isAuth = auth_codes?.length ? auth_codes.includes(type) : true;
        return isFind;
      }
    });
  }
  getIsFind(allNavs);
  return isAuth;
}

export default () => {
  const navigate = useNavigate();
  /**
   * 路由跳转处理，拦截并跳转到错误页（403,404等）
   */
  function handleNavTo(path?: string | RouteProps, cfg?: NavigateOptions) {
    if (!path) return navigate(defaultHomePath);
    const pathStr = toPathStr(path);
    const noAuth = noAuthPaths.some((it: string) => pathStr.startsWith(it));
    if (noAuth) return navigate(pathStr, cfg);
    const userInfo = getUserInfo();
    if (userInfo) {
      if (hasRouteAuth(pathStr, userInfo.type)) return navigate(pathStr, cfg);
      const redirectStr = pathStr.split("?")[1];
      navigate(`/403?${redirectStr || `redirect=${pathStr}`}`, { replace: true });
    } else {
      const redirectStr = pathStr.split("?")[1];
      showMessage("请登录", "warning");
      navigate(`/login?${redirectStr || `redirect=${pathStr}`}`);
    }
  }
  function go(num: number) {
    navigate(num);
  }
  function push(path: string | RouteProps, cfg?: NavigateOptions) {
    handleNavTo(path, cfg);
  }
  function replace(path: string | RouteProps, cfg?: NavigateOptions) {
    handleNavTo(path, Object.assign({ replace: true }, cfg));
  }
  return {
    go,
    push,
    replace,
    handleNavTo,
  };
};
