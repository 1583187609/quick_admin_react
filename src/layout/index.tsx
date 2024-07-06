/**
 * 布局Layout文件
 */

import { Outlet } from "react-router-dom";
import TheMenu from "./_components/TheMenu";
import TheHead from "./_components/TheHead";
import { Suspense, useEffect, useState } from "react";
import { Spin, Watermark } from "antd";
import { useStoreSlice } from "@/hooks";
import BaseImg from "@/components/BaseImg";
import BaseIcon from "@/components/BaseIcon";
import logoImg from "@/assets/images/logo.svg";
import useMenu from "@/layout/_hooks";
import { ResponseMenuItem } from "@/layout/_types";
import s from "./index.module.less";

interface Props {
  className?: string;
}
let reloadCb: undefined | (() => void);
const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "" }: Props) => {
  const { layout } = useStoreSlice("set");
  const { allMenus, activeIndex } = useStoreSlice("menu");
  const { changeActiveIndex } = useMenu();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!show) {
      setShow(true);
      reloadCb?.();
    }
  }, [show]);
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
            )}
            <TheMenu className="f-0" />
          </>
        )}
        <div className={`${s.right} f-1 f-fs-s-c`}>
          <TheHead className="f-0" />
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
