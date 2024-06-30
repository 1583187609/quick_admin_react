// import { useUserStore, useRouteStore, useBaseStore } from "@/store";
// import { useRoute, useRouter } from "vue-router";
import { LinkType, MenusItem } from "@/layout/_components/SideMenu/_types";
import { createSlice } from "@reduxjs/toolkit";
import { defaultHomePath, storage } from "@/utils";
import { camelCase } from "lodash";
import { baseStore, menuStore } from "@/store";

export interface RouteItem {
  path: string;
  name: string;
  children?: string;
  component?: () => Promise<unknown>;
  meta: {
    title: string;
    icon?: string;
    cache?: boolean;
    tagIdKey?: string; //默认键名id。缓存同组件但不同id的页面组件时，需要依据唯一值来生成新的组件，这个唯一值的键名默认取的 id
    linkType?: LinkType;
  };
}

const modules = import.meta.glob("../../views/**/*.tsx");
/**
 * 将菜单拉平成一级
 * @param menus 菜单数据
 * @notice //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
 * @returns
 */
function getFlatMenus(menus?: MenusItem[]): MenusItem[] {
  const _menus: MenusItem[] = [];
  function flatMenus(menus: MenusItem[] = []) {
    menus.forEach((menu: MenusItem) => {
      const { type, auth_codes, children } = menu;
      if (type === 0) {
        flatMenus(children);
      } else {
        _menus.push(menu);
      }
    });
  }
  flatMenus(menus);
  return _menus;
}
/**
 * 获取route信息
 * @param menu 单个菜单数据
 * @returns
 */
function getRoute(menu: MenusItem): RouteItem {
  const { label, path, auth_codes, link_type, component, icon, is_cache } =
    menu;
  return {
    path,
    name: camelCase(path), //小驼峰路由名，大驼峰组件名
    // component: () => import(`@/views${item.path}.vue`); //webpack用这种方式
    component: modules[`../../views${component}`], //vite用这种方式
    meta: {
      title: label,
      cache: !!is_cache,
      icon,
      linkType: link_type,
    },
  };
}
export default createSlice({
  name: "route",
  initialState: {
    isCreatedRoute: false, //路由是否已创建完毕
  },
  reducers: {
    // // 初始化菜单
    // initAllMenus: (state, { payload = [] }) => {
    //   console.log(payload, "init-menus------------");
    //   state.allMenus = payload;
    // },
    /**
     * 创建路由
     */
    // createRoutes(menus = menuStore.allMenus) {
    //   const routes = getFlatMenus(menus).map((it: MenusItem) => getRoute(it));
    //   routes.forEach((item: any) => {
    //     router.addRoute("layout", item);
    //   });
    //   isCreatedRoute.value = true;
    // },
  },
});
