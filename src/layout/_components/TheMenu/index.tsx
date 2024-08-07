/**
 * 文件说明-模板文件
 */

import { useRouter, useStoreSlice } from "@/hooks";
import { defaultHomePath } from "@/utils";
import SideMenu from "../SideMenu";
import s from "./index.module.less";

interface Props {
  className?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}
const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "" }: Props) => {
  const { isCollapse } = useStoreSlice("menu");
  const router = useRouter();
  return (
    <div className={`${className} ${s.menu} ${isCollapse ? s.collapsed : ""} f-sb-s-c`}>
      <div onClick={() => router.push(defaultHomePath)} className={`${s.title} f-0 f-c-c line-2`}>
        {isCollapse ? VITE_APP_NAME?.slice(0, 1) : VITE_APP_NAME}
      </div>
      <SideMenu className="f-1 all-hide-scroll" inlineCollapsed={isCollapse} mode="inline" />
    </div>
  );
};
