import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../_utils";

// const modules = import.meta.glob("../../views/**/*.tsx");
/**
 * 将菜单拉平成一级
 * @param menus 菜单数据
 * @notice //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
 * @returns
 */
// function getFlatMenus(menus?: ResponseMenuItem[]): ResponseMenuItem[] {
//   const _menus: ResponseMenuItem[] = [];
//   function flatMenus(menus: ResponseMenuItem[] = []) {
//     menus.forEach((menu: ResponseMenuItem) => {
//       const { type, auth_codes, children } = menu;
//       if (type === 0) {
//         flatMenus(children);
//       } else {
//         _menus.push(menu);
//       }
//     });
//   }
//   flatMenus(menus);
//   return _menus;
// }
/**
 * 获取route信息
 * @param menu 单个菜单数据
 * @returns
 */
// function getRoute(menu: ResponseMenuItem): RouteItem {
//   const { label, path, auth_codes, link_type, component, icon, is_cache } = menu;
//   return {
//     path,
//     name: camelCase(path), //小驼峰路由名，大驼峰组件名
//     // component: () => import(`@/views${item.path}.vue`); //webpack用这种方式
//     component: modules[`../../views${component}`], //vite用这种方式
//     meta: {
//       title: label,
//       cache: !!is_cache,
//       icon,
//       linkType: link_type,
//     },
//   };
// }
export default createSlice({
  name: "route",
  initialState: {
    // isCreatedRoute: false, // 路由是否已创建完毕
  },
  reducers: {
    // updateRouteState: updateState,
  },
});
