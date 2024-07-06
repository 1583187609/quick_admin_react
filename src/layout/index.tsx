/**
 * 布局Layout文件
 */

import { Outlet } from "react-router-dom";
import TheMenu from "./_components/TheMenu";
import TheHead from "./_components/TheHead";
import { Suspense, useEffect, useState } from "react";
import { Spin, Watermark } from "antd";
import { useRouter, useStoreSlice } from "@/hooks";
import BaseImg from "@/components/BaseImg";
import BaseIcon from "@/components/BaseIcon";
import logoImg from "@/assets/images/logo.svg";
import useMenu from "@/layout/_hooks";
import s from "./index.module.less";
import { ResponseMenuItem } from "@/layout/_types";

interface Props {
  className?: string;
}
let reloadCb: undefined | (() => void);
const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "" }: Props) => {
  const { allMenus, sideMenus, activeIndex } = useStoreSlice("menu");
  const { changeActiveIndex } = useMenu();
  // const router = useRouter();
  // const groups = useContext(MenusContext);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!show) {
      setShow(true);
      reloadCb?.();
    }
  }, [show]);
  //处理点击菜单栏
  // function handleClickMenuItem(ind: number, info: CommonObj) {
  //   const subNavs = groups?.[ind]?.children ?? [];
  //   if (subNavs.length) toFirstPath(groups?.[ind]);
  // }
  //跳转到第一个subNavs的第一个地址
  // function toFirstPath(menu: ResponseMenuItem) {
  //   if (menu.children?.length) {
  //     const { children = [], path, label } = menu?.children[0];
  //     if (children.length) {
  //       if (children[0].children?.length) {
  //         toFirstPath(children[0]);
  //       } else {
  //         const { path, label } = children[0];
  //         router.push(path);
  //         document.title = label;
  //       }
  //     } else {
  //       router.push(path);
  //       document.title = label;
  //     }
  //   }
  // }
  //重新加载页面
  // function reloadView(cb?: () => void) {
  //   setShow(false);
  //   reloadCb = cb;
  // }
  return (
    <Watermark content={VITE_APP_NAME} gap={[80, 80]}>
      <div className={`${className} ${s.layout} f-sb-s`}>
        <div className={`${s["main-menu"]} f-0 f-fs-s f-fs-c-c`}>
          <div className={`f-c-c-c f-0 ${s.logo}`}>
            <BaseImg src={logoImg} size="60%" style={{ borderRadius: 0 }} to={{ name: "home" }} />
          </div>
          <ul className={`${s.list} f-fs-c-c f-1 all-hide-scroll`}>
            {allMenus.map((item: ResponseMenuItem, ind: number) => {
              return (
                <li
                  className={`${s.item} ${activeIndex === ind ? s.active : ""} f-c-c-c`}
                  onClick={() => changeActiveIndex(ind)}
                  key={ind}
                >
                  {<BaseIcon size="20" name={item.icon} />}
                  <span className={`${s.text} line-1`}>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <TheMenu className="f-0" />
        <div className={`${s.right} f-1 f-fs-s-c`}>
          <TheHead
            className="f-0"
            // onMenuItem={handleClickMenuItem}
            // reload={reloadView}
          />
          <div className={`${s.main} f-1 f-fs-s-c`}>
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
