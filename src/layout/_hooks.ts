import { useRouter, useStoreSlice } from "@/hooks";
import { ResponseMenuItem } from "@/layout/_types";

export default () => {
  const router = useRouter();
  const { toggleFold } = useStoreSlice("base");
  const { allMenus, updateState: updateMenuState } = useStoreSlice("menu");

  //设置打开的菜单、被选中的菜单keys
  function setActiveKeys(navs: ResponseMenuItem[], pathName: string) {
    let openKeys: string[] = [];
    let seledKeys: string[] = [];
    let rootInd: number = -1;
    function findTarget(arr: any, level = 0) {
      return arr.find((item: any, ind: number) => {
        const { children, path } = item;
        if (children?.length) {
          const target = findTarget(children, level + 1);
          if (target) {
            if (target?.children) {
              openKeys = [target.path];
              seledKeys = [target.children[0]?.path];
            } else {
              openKeys = [path];
              seledKeys = [target.path];
            }
            if (level === 0) rootInd = ind;
          }
          return !!target;
        } else {
          const isFind = path === pathName;
          if (isFind) {
            seledKeys = [path];
            if (level === 0) rootInd = ind;
          }
          return isFind;
        }
      });
    }
    findTarget(navs);
    changeActiveIndex(rootInd, false);
    updateMenuState({ seledKeys, openKeys });
    return { openKeys, seledKeys };
  }

  // 路由跳转到子级第一个路径对应的页面
  function toFirstPath(menu: ResponseMenuItem) {
    if (!menu.children?.length) return;
    const { children = [], path, label, link_type } = menu?.children[0];
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
      if (children.length) {
        if (children[0].children?.length) {
          toFirstPath(children[0]);
        } else {
          const { path, label } = children[0];
          router.push(path);
          updateMenuState({ seledKeys: [path] });
          document.title = label;
        }
      } else {
        router.push(path);
        updateMenuState({ seledKeys: [path] });
        document.title = label;
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
    setActiveKeys,
    changeActiveIndex,
  };
};
