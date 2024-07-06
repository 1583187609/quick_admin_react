/**
 * store状态管理
 * @link 使用参考：https://blog.csdn.net/kkkys_kkk/article/details/135442628,
 * @link 使用参考：https://blog.csdn.net/weixin_47002803/article/details/137052547
 * @link 使用示例：https://blog.csdn.net/Tory2/article/details/137491641
 * @link 使用示例: https://zhuanlan.zhihu.com/p/686433365
 * @link redux-persist 持久化储存(选学) https://blog.csdn.net/weixin_47002803/article/details/137052547
 */

import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import demo from "./modules/demo";
import base from "./modules/base";
import menu from "./modules/menu";
import dict from "./modules/dict";
import user, { userExpose } from "./modules/user";
import routes from "./modules/routes";
// import logger from 'redux-logger'; // 想要添加的中间件
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: combineReducers({
    demo: demo.reducer,
    base: base.reducer,
    menu: menu.reducer,
    dict: dict.reducer,
    user: user.reducer,
    routes: routes.reducer,
  }),
  // 使用回调函数来自定义中间件
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware()
  //     .configure({ serializableCheck: false }) // 你可以禁用或配置默认中间件
  //     .concat(logger), // 你可以添加更多中间件
});
export default store;

export type SliceNames = keyof typeof sliceMap;
export const sliceMap = {
  menu,
  demo,
  base,
  dict,
  user: {
    expose: userExpose,
    ...user,
  },
  routes,
};

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
// export const useAppDispatch = () => useDispatch<RootDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
