// import { useUserStore, useRouteStore, useBaseStore } from "@/store";
// import { useRoute, useRouter } from "vue-router";
import { LinkType, MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import { createSlice } from "@reduxjs/toolkit";
import { defaultHomePath, storage } from "@/utils";
import { baseStore } from "@/store";

export interface RouteItem {
  path: string;
  name: string;
  children?: string;
  component?: () => Promise<unknown>;
  meta: {
    title: string;
    icon?: string;
    cache?: boolean;
    tagIdKey?: string; //默认键名id。用keep-alive缓存同组件但不同id的页面组件时，需要依据唯一值来生成新的组件，这个唯一值的键名默认取的 id
    linkType?: LinkType;
  };
}

export default createSlice({
  name: "menu",
  initialState: {
    allMenus: storage.getItem("allMenus") || [], // 完整导航数据
    sideMenus: [],
    activeIndex: 0,
  },
  reducers: {
    // 初始化菜单
    initAllMenus: (state, { payload = [] }) => {
      console.log(payload, "init-menus------------");
      state.allMenus = payload;
    },
    // 初始化菜单选中项
    initMenusActive: (state, { payload }) => {
      const { pathname } = payload;
      // const { allMenus, activeIndex: activeInd } = state;
      // const subMenus = allMenus;
      // let currPath = defaultHomePath;
      // if (subMenus[activeInd]?.children?.length) {
      //   function isFind(children: MenusItem[]): boolean {
      //     return !!children.find((sItem, sInd) => {
      //       const { children = [], path, label } = sItem;
      //       if (path === pathname) {
      //         document.title = label;
      //       }
      //       return path === pathname || isFind(children);
      //     });
      //   }
      //   const target = subMenus.find((gItem, gInd) => {
      //     const { children = [] } = gItem;
      //     const find = isFind(children);
      //     if (find) changeActiveIndex(gInd, false);
      //     return find;
      //   });
      //   if (target) currPath = target.path ?? defaultHomePath;
      // } else {
      //   const { VITE_APP_NAME } = import.meta.env;
      //   const { path = defaultHomePath, label = VITE_APP_NAME } =
      //     subMenus?.[activeInd] || {};
      //   document.title = label;
      //   currPath = path;
      // }
      // return currPath;
    },
    // 切换选中的菜单下标
    changeActiveIndex: (state, { payload }) => {
      const { ind, toFirst = true, allNavs = state.allMenus } = payload;
      // state.activeIndex = ind;
      // if (ind === -1) baseStore.isFold = true;
      // if (!toFirst) return;
      // const subNavs = allNavs[ind]?.children;
      // baseStore.isFold = !subNavs?.length;
      // if (subNavs?.length) toFirstPath(allNavs[ind]);
    },
    // 路由跳转到子级第一个路径对应的页面
    toFirstPath: (state, { payload }) => {
      const { menu } = payload;
      // if (!menu.children?.length) return;
      // const { children = [], path, label, link_type } = menu?.children[0];
      // if (link_type) {
      //   // router.push({ name: "innerLink", query: { url: path } });
      //   // if (link_type === 1) {
      //   //   return (document.title = label);
      //   // }
      //   // if (link_type === 2) {
      //   //   return window.open(path, "_blank");
      //   // }
      //   // throw new Error(`暂不支持code为${link_type}的外链类型`);
      // } else {
      //   if (children.length) {
      //     if (children[0].children?.length) {
      //       toFirstPath(children[0]);
      //     } else {
      //       const { path, label } = children[0];
      //       router.push(path);
      //       document.title = label;
      //     }
      //   } else {
      //     router.push(path);
      //     document.title = label;
      //   }
      // }
    },
  },
});
