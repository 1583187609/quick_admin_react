/**
 * 布局Layout文件
 */

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TheMenu from "./_components/TheMenu";
import TheHead from "./_components/TheHead";
import { Suspense, useEffect, useState } from "react";
import { Spin, Watermark } from "antd";
import { useStoreSlice } from "@/hooks";
import BaseImg from "@/components/BaseImg";
import logoImg from "@/assets/images/logo.svg";
import useMenu from "@/layout/_hooks";
import { AntdMenuItem, ResponseMenuItem } from "@/layout/_types";
import cssVars from "@/assets/styles/_var.module.less";
import { CommonObj } from "@/vite-env";
import { convertToMenuNavs } from "@/store/modules/menu";
import BaseEmpty from "@/components/BaseEmpty";
import { defaultHomePath, errorPaths, getUserInfo, showMessage } from "@/utils";
import { hasRouteAuth } from "@/components/_hooks/router";
import s from "./index.module.less";

interface Props {
  className?: string;
}

let reloadCb: undefined | (() => void);
const { VITE_APP_NAME } = import.meta.env;
const { mainMenuWidth, asiderWidth, asiderWidthFold } = cssVars;
function getIsExist(byPath: string, allMenus: ResponseMenuItem[]) {
  function getIsFound(menus: ResponseMenuItem[]): boolean {
    return !!menus.find((item: ResponseMenuItem) => {
      const { path, children, link_type } = item;
      if (children?.length) {
        return getIsFound(children);
      } else {
        if (link_type) return false;
        return path === byPath;
      }
    });
  }
  return getIsFound(allMenus);
}

export default ({ className = "" }: Props) => {
  const { layout } = useStoreSlice("set");
  const { isCollapse, allMenus, activeIndex } = useStoreSlice("menu");
  const { changeActiveIndex } = useMenu();
  const [show, setShow] = useState(true);
  const location = useLocation();
  const items = convertToMenuNavs(allMenus);
  const navigate = useNavigate();
  const { pathname } = location;
  useEffect(() => {
    watchToErrorRoute(pathname);
  }, [pathname]);
  useEffect(() => {
    if (!show) {
      setShow(true);
      reloadCb?.();
    }
  }, [show]);
  const maxWidthMap: CommonObj = {
    columns: `calc(100vw - ${mainMenuWidth} - ${isCollapse ? asiderWidthFold : asiderWidth})`,
    classics: `calc(100vw - ${isCollapse ? asiderWidthFold : asiderWidth})`,
    vertical: `calc(100vw - ${isCollapse ? asiderWidthFold : asiderWidth})`,
    horizontal: `100vw`,
  };

  /***
   * 检测并自动跳转到对应的错误页（403,404等）
   */
  function watchToErrorRoute(path?: string) {
    if (!path) return;
    if (errorPaths.some((it: string) => path.startsWith(it)) || defaultHomePath === path) return;
    const userInfo = getUserInfo();
    if (userInfo) {
      const isExist = getIsExist(pathname, allMenus);
      if (!isExist) return navigate(`/404?redirect=${path}`);
      if (hasRouteAuth(path, userInfo.type)) return;
      navigate(`/403?redirect=${path}`, { replace: true });
    } else {
      showMessage("请登录", "warning");
      navigate(`/login?redirect=${path}`);
    }
  }
  return (
    <Watermark content={VITE_APP_NAME} gap={[80, 80]}>
      <div className={`${className} ${s.layout} f-sb-s`}>
        {layout.type !== "horizontal" && (
          <>
            {layout?.type === "columns" && (
              <div className={`${s["main-menu"]} f-0 f-fs-s f-fs-c-c`}>
                <div className={`f-c-c-c f-0 ${s.logo}`}>
                  <BaseImg src={logoImg} size="30px" style={{ borderRadius: 0 }} to={{ name: "home" }} />
                </div>
                <div className={`${s.list} f-fs-c-c f-1 all-hide-scroll`}>
                  {items.length > 0 ? (
                    items.map((item: AntdMenuItem, ind: number) => {
                      const { icon, label } = item;
                      return (
                        <div
                          className={`${s.item} ${activeIndex === ind ? s.active : ""} f-c-c-c`}
                          onClick={() => changeActiveIndex(ind)}
                          key={ind}
                        >
                          {icon}
                          <span className={`${s.text} line-1`}>{label}</span>
                        </div>
                      );
                    })
                  ) : (
                    <BaseEmpty size={40} />
                  )}
                </div>
              </div>
            )}
            <TheMenu className="f-0" />
          </>
        )}
        <div className={`${s.right} f-1 f-fs-s-c`}>
          <TheHead className="f-0" />
          <div className={`${s.main} f-1 f-fs-s-c`} style={{ maxWidth: maxWidthMap[layout.type] }}>
            {/* 需要使用Suspense包裹，不然会出现闪屏现象 */}
            <Suspense
              fallback={
                <Spin
                  // tip="路由加载中……"
                  className="f-c-c"
                  size="large"
                  style={{ height: "100%", width: "100%" }}
                />
              }
            >
              {show && <Outlet />}
            </Suspense>
          </div>
        </div>
      </div>
    </Watermark>
  );
};
