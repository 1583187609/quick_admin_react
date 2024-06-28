/**
 * store状态管理
 * @link 使用参考：https://blog.csdn.net/kkkys_kkk/article/details/135442628,
 * @link 使用参考：https://blog.csdn.net/weixin_47002803/article/details/137052547
 * @link 使用示例：https://blog.csdn.net/Tory2/article/details/137491641
 * @link redux-persist 持久化储存(选学) https://blog.csdn.net/weixin_47002803/article/details/137052547
 */

import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import logger from 'redux-logger'; // 我们想要添加的中间件
import counter from "./modules/counter";
import base from "./modules/base";
import menu from "./modules/menu";
import dict from "./modules/dict";
import user from "./modules/user";

const store = configureStore({
  reducer: combineReducers({
    counter: counter.reducer,
    base: base.reducer,
    menu: menu.reducer,
    dict: dict.reducer,
    user: user.reducer,
  }),
  // 使用回调函数来自定义中间件
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware()
  //     .configure({ serializableCheck: false }) // 你可以禁用或配置默认中间件
  //     .concat(logger), // 你可以添加更多中间件
});
export default store;

export const menuStore = menu.actions;
export const counterStore = counter.actions;
export const baseStore = base.actions;
export const dictStore = dict.actions;
export const userStore = user.actions;

// 使用这些类型进行简单的类型声明
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// 在整个应用程序中使用它们，而不是简单地使用 `useDispatch` 和 `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
