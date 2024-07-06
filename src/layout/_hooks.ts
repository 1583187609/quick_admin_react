import { useRouter, useStoreSlice } from "@/hooks";
import { ResponseMenuItem } from "@/layout/_types";

const { VITE_APP_NAME } = import.meta.env;

export default () => {
  const router = useRouter();
  const { toggleFold } = useStoreSlice("base");
  const { allMenus, updateMenuState } = useStoreSlice("menu");
  /**
   * 路由跳转到子级第一个路径对应的页面
   * @param menu
   * @returns
   */
  function toFirstPath(menu: ResponseMenuItem) {
    if (!menu?.children?.length) return;
    const { children = [], path, label, link_type } = menu?.children[0];
    // 0 | 1 | 2; //1 内部iframe渲染； 2, 新打开一个浏览器标签页展示
    if (link_type) {
      // router.push({ name: "innerLink", query: { url: path } });
      // if (link_type === 1) {
      //   return (document.title = label);
      // }
      // if (link_type === 2) {
      //   return window.open(path, "_blank");
      // }
      // throw new Error(`暂不支持code为${link_type}的外链类型`);
    } else {
      if (children?.length) {
        if (children[0]?.children?.length) {
          toFirstPath(children[0]);
        } else {
          const { path, label } = children[0];
          document.title = label || VITE_APP_NAME;
          updateMenuState({ seledKeys: [path], updatedTitle: true });
          router.push(path);
        }
      } else {
        document.title = label || VITE_APP_NAME;
        updateMenuState({ seledKeys: [path], updatedTitle: true });
        router.push(path);
      }
    }
  }
  // 改变选中的菜单项
  function changeActiveIndex(ind: number, toFirst = true, menus = allMenus) {
    const subNavs = menus[ind]?.children ?? [];
    updateMenuState({ activeIndex: ind, sideMenus: subNavs });
    toggleFold(!subNavs?.length);
    if (subNavs?.length && toFirst) toFirstPath(menus[ind]);
  }
  return {
    toFirstPath,
    changeActiveIndex,
  };
};
