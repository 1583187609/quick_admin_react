/**
 * 布局Layout文件
 */
import { Outlet } from "react-router-dom";
import TheMenu, { MenusItem } from "./_components/TheMenu";
import TheHead from "./_components/TheHead";
import { useContext, useEffect, useMemo, useState, Suspense } from "react";
import { MenusContext } from "@/router";
import { Spin, Watermark } from "antd";
import { useRouter } from "@/hooks";
import { CommonObj } from "@/vite-env";
import s from "./index.module.less";

interface Props {
  className?: string;
}
let reloadCb: undefined | (() => void);
const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "" }: Props) => {
  // const router = useRouter();
  // const groups = useContext(MenusContext);
  // const [rootInd, setRootInd] = useState(0);
  // const [collapsed, setCollapsed] = useState(false);
  // const [show, setShow] = useState(true);
  // const currNavs = useMemo(() => {
  //   return groups?.[rootInd]?.children || [];
  // }, [groups, rootInd]);
  // useEffect(() => {
  //   if (!show) {
  //     setShow(true);
  //     reloadCb?.();
  //   }
  // }, [show]);
  //处理点击菜单栏
  // function handleClickMenuItem(ind: number, info: CommonObj) {
  //   const subNavs = groups?.[ind]?.children ?? [];
  //   if (subNavs.length) toFirstPath(groups?.[ind]);
  // }
  //跳转到第一个subNavs的第一个地址
  // function toFirstPath(menu: MenusItem) {
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
        <TheMenu
          // collapsed={collapsed}
          className="f-0"
          // navs={groups}
          title={VITE_APP_NAME}
        />
        <div className={`${s.right} f-1 f-fs-s-c`}>
          <TheHead
            className="f-0"
            // groups={groups}
            // onMenuItem={handleClickMenuItem}
            // collapsed={collapsed}
            // setCollapsed={setCollapsed}
            // rootInd={rootInd}
            // setRootInd={setRootInd}
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
              {
                // show &&
                <Outlet />
              }
            </Suspense>
          </div>
        </div>
      </div>
    </Watermark>
  );
};
