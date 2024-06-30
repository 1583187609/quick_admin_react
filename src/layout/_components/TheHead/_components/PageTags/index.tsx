/**
 * 页面标签组件
 */
import { HomeOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { storage, copyText, defaultHomePath } from "@/utils";
import { useEventListener, useRouter } from "@/hooks";
import { useLocation } from "react-router-dom";
import PageTagItem from "./TagItem";
import { ResponseMenuItem } from "@/layout/_components/TheMenu";
import { CloseMenuType } from "./TagItem/menus";
import { Button, message } from "antd";
import s from "./index.module.less";

// export interface MenusDisabledCase { [key in CloseMenuType]: boolean }
export interface MenusDisabledCase {
  [key: string]: boolean;
}
interface Props {
  className?: string;
  updatedTitle?: boolean;
  reload?: (cb?: () => void) => void;
}
interface PageTagItem {
  text: string;
  path: string;
}
export default ({ className = "", updatedTitle, reload }: Props) => {
  const location = useLocation();
  const router = useRouter();
  const contMenuIndRef = useRef(-2);
  const scrollRef = useRef<any>(null);
  const [disabled, setDisabled] = useState({
    left: true,
    right: true,
  });
  const [tags, setTags] = useState<PageTagItem[]>(storage.getItem("pageTags") || []);
  const [menusDisabledCase, setMenusDisabledCase] = useState<MenusDisabledCase>({});
  const { pathname } = location;
  function getMenusDisabledCase() {
    const menuInd = contMenuIndRef.current;
    const menuPath = menuInd < 0 ? defaultHomePath : tags[menuInd].path;
    const isHome = menuPath === defaultHomePath;
    const isFirst = menuInd === 0;
    const isLast = menuInd === tags.length - 1;
    const isEmpty = !tags.length;
    const isOnly = tags.length === 1;
    const isActive = pathname === menuPath;
    const map: MenusDisabledCase = {
      closeCurrent: isHome,
      closeOther: isHome ? isEmpty : isOnly,
      closeToRight: isLast,
      closeToLeft: isHome || isFirst,
      closeAll: isEmpty,
      closeSaved: true,
      copyPath: false,
      copyWholePath: false,
      reload: !isActive,
    };
    return map;
  }
  useEventListener("beforeunload", () => storage.setItem("pageTags", tags), [tags]);
  // onResize 和 tags 长度变化时，都要执行一次initDisabled 函数
  useEventListener("resize", initDisabled, []);
  useEffect(() => {
    initDisabled();
  }, [tags]);
  //监听路由变化
  useEffect(() => {
    updatedTitle && addRoute({ text: document.title, path: pathname });
  }, [pathname, updatedTitle]);
  function initDisabled() {
    //必须要使用setTimeout，不然会引起bug（貌似onArrowBtn 中的 ele.scrollTo(left, 0) 是个异步函数，暂不清楚原因）
    setTimeout(() => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth, offsetWidth, scrollLeft } = scrollRef.current;
      const width = clientWidth || offsetWidth;
      setDisabled({
        left: scrollLeft <= 0,
        right: scrollLeft + width >= scrollWidth,
      });
    }, 300);
  }
  //点击左右箭头按钮
  function onArrowBtn(direction = 1, num = 300) {
    const ele = scrollRef?.current;
    const { scrollLeft } = ele;
    const left = scrollLeft + num * direction;
    ele.scrollTo(left, 0);
    initDisabled();
  }
  //将路由添加进历史记录
  function addRoute(data: PageTagItem) {
    const { text, path } = data;
    const target = tags.find(it => it.path === path);
    if (!target && path !== defaultHomePath) {
      if (text === "404") {
        data.text = path;
      }
      setTags(tags.concat(data));
    }
  }
  //处理右键菜单的关闭事件
  function handleClose(type: CloseMenuType, ind: number) {
    let cloneTags = tags.slice(); //深拷贝
    let newPath = "";
    const menuInd = type === "closeSelf" ? ind : contMenuIndRef.current;
    const isHome = menuInd === -1;
    const isActive = pathname === tags[menuInd].path;
    if (["closeCurrent", "closeSelf"].includes(type)) {
      cloneTags.splice(ind, 1);
      if (isActive) {
        const nextInd = ind < cloneTags.length ? ind : ind - 1;
        newPath = cloneTags?.[nextInd]?.path || defaultHomePath;
      }
    } else if (type === "closeOther") {
      cloneTags = isHome ? [] : cloneTags.slice(menuInd, menuInd + 1);
      newPath = isHome ? defaultHomePath : cloneTags[0].path;
    } else if (type === "closeToRight") {
      cloneTags = cloneTags.slice(0, ind + 1);
      const findInd = cloneTags.findIndex(it => it.path === pathname);
      const isExist = findInd > 0 && findInd < cloneTags.length;
      if (!isExist) {
        newPath = cloneTags.slice(-1)?.[0].path || defaultHomePath;
      }
    } else if (type === "closeToLeft") {
      cloneTags = cloneTags.slice(ind);
      const findInd = cloneTags.findIndex(it => it.path === pathname);
      const isExist = findInd > 0 && findInd < cloneTags.length;
      if (!isExist) {
        newPath = cloneTags[0].path;
      }
    } else if (type === "closeAll") {
      cloneTags = [];
      newPath = defaultHomePath;
    } else if (type === "reload") {
      reload?.(() => message.success("刷新成功"));
    } else if (type === "copyPath") {
      copyText(cloneTags[ind]?.path || defaultHomePath);
    } else if (type === "copyWholePath") {
      const path = isHome ? defaultHomePath : cloneTags[menuInd]!.path;
      copyText(window.location.origin + path);
    } else if (type === "closeSaved") {
      message.warning("暂未开通关闭已保存功能");
    } else {
      message.error("暂不支持此类型：" + type);
    }
    setTags(cloneTags);
    // router.push(newPath);
    contMenuIndRef.current = -2;
  }
  function handleOpenChange(ind: number, open: boolean) {
    contMenuIndRef.current = open ? ind : -2;
    setMenusDisabledCase(getMenusDisabledCase());
  }

  return (
    <div className={`${className} ${s["page-tags"]} page-tags f-sb-c`}>
      <PageTagItem
        onClick={() => router.push(defaultHomePath)}
        className={`${s["tag-item"]} f-0`}
        style={{ marginInlineStart: 8, marginInlineEnd: 0 }}
        active={pathname === defaultHomePath}
        icon={<HomeOutlined />}
        closable={false}
        onClose={(type: CloseMenuType) => handleClose(type, -1)}
        open={contMenuIndRef.current === -1}
        onOpenChange={(open: boolean) => handleOpenChange(-1, open)}
        disabledCase={menusDisabledCase}
      >
        首页
      </PageTagItem>
      {/* 给定一个宽度技术（例：1px）才能按预期撑开 */}
      <div className="f-sb-c f-1" style={{ width: "1px" }}>
        <Button
          type="link"
          size="small"
          className={`f-0`}
          style={{ marginRight: 0, width: "32px" }}
          onClick={() => onArrowBtn(-1)}
          icon={<DoubleLeftOutlined />}
          disabled={disabled.left}
        />
        <div className={`${s["scroll-bar"]} all-hide-scroll f-1`} ref={scrollRef}>
          {tags.map((item: any, ind: number) => {
            return (
              <PageTagItem
                onClick={() => router.push(item.path)}
                className={`${s["tag-item"]}`}
                active={pathname === item.path}
                onClose={(type: CloseMenuType) => handleClose(type, ind)}
                open={contMenuIndRef.current === ind}
                onOpenChange={(open: boolean) => handleOpenChange(ind, open)}
                disabledCase={menusDisabledCase}
                key={item.path}
              >
                {item.text}
              </PageTagItem>
            );
          })}
        </div>
        <Button
          type="link"
          size="small"
          className={`f-0`}
          style={{ width: "32px" }}
          onClick={() => onArrowBtn(1)}
          icon={<DoubleRightOutlined />}
          disabled={disabled.right}
        />
      </div>
    </div>
  );
};
