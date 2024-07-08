import { storage, defaultHomePath, defaultIconName, showMessage, errorPaths } from "@/utils";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { ResponseMenuItem } from "@/layout/_types";
import { PostUserLogin, PostUserLogout } from "@/api-mock";
import { notification } from "antd";
import { CommonObj } from "@/vite-env";
import menuStore from "@/store/modules/menu";
import dayjs from "dayjs";

const expiration = 24 * 60 * 60 * 1000; // 过期时间，单位：秒，默认24小时不登录即会过期

const { initMenus } = menuStore.actions;

function handleMenusIcon(navs: ResponseMenuItem[], level = 0): ResponseMenuItem[] {
  if (!navs) return [];
  return navs.map((item: ResponseMenuItem) => {
    const { icon = defaultIconName, children = [] } = item;
    //为了保持统一及美观，对于嵌套两层以上的菜单项不展示图标
    item.icon = level > 1 ? undefined : icon;
    item.children = handleMenusIcon(children, level + 1);
    return item;
  });
}

/**
 * 登录
 * @param data
 * @returns
 */
const handleLoginIn = createAsyncThunk("userLoginIn", async (payload: CommonObj, { dispatch, getState, extra }) => {
  const { remember, ...args } = payload.params;
  const { router, location } = payload.other;
  if (remember) {
    storage.setItem("rememberAccount", args);
  } else {
    storage.removeItem("rememberAccount");
  }
  return await PostUserLogin(args).then(res => {
    const { user, navs, ...rest } = res as CommonObj;
    const filterNavs = navs.filter((it: ResponseMenuItem) => {
      const { auth_codes, path } = it;
      if (path === "demo") return false; // 过滤掉demo示例代码
      return true;
      // if (!auth_codes) return true;
      // return auth_codes.includes(user.type);
    });
    const newNavs = handleMenusIcon(filterNavs);
    const { id = "", name = "", nickname = "", type_text = "" } = user;
    user._title = name || nickname || type_text + id;
    const expired = Date.now() + expiration;
    const expiredDate = dayjs(expired).format("YYYY-MM-DD HH:mm:ss");
    storage.setItem("userInfo", user);
    storage.setItem("token", user?.token ?? "");
    storage.setItem("allMenus", newNavs);
    storage.setItem("expiredDate", expiredDate);
    dispatch(initMenus(newNavs));
    // 等路由创建好了，再进入
    let toPath = defaultHomePath;
    if (location.search) toPath = location.search.slice(10);
    router.push(toPath);
    notification.success({
      closeIcon: false,
      style: { top: "36px" },
      placement: "topRight",
      message: "登录成功",
      description: `欢迎回来，${user?.name ?? "XXX"}`,
      duration: 2, //单位：秒
    });
    return {
      user,
      expired,
      ...rest,
    };
  });
});
const handleLoginInAfter = (builder: any) => {
  const { pending, fulfilled, rejected } = handleLoginIn;
  builder.addCase(fulfilled, (state: any, { payload }: CommonObj) => {
    const { user, expired } = payload as CommonObj;
    state.userInfo = user;
    state.isLogin = true;
    state.expired = expired;
  });
};

/**
 * 用户登出
 */
const handleLoginOut = createAsyncThunk("userLoginOut", async (payload: CommonObj, { dispatch, getState, extra }) => {
  const { phone, isFetch = false } = payload.params;
  const { router, location } = payload.other;
  return await PostUserLogout({ phone }).then((res: any) => {
    storage.getKeys().forEach((key: string) => {
      const isRemove = !["rememberAccount", "set", "hasGuide"].includes(key);
      if (isRemove) storage.removeItem(key);
    });
    storage.clear("session"); //清除sessionStorage的数据
    // changeActiveIndex(0); //这个是hooks
    showMessage("退出成功！");
    const { pathname } = location;
    // const { path, fullPath, name } = route;
    // router.push({
    //   name: "login",
    //   query:
    //     name !== "login" && path !== defaultHomePath
    //       ? { redirect: fullPath }
    //       : undefined,
    // });
    const needRedirect = !["/login", ...errorPaths].some((it: string) => pathname.startsWith(it)) && pathname !== defaultHomePath;
    const suffix = needRedirect ? `?redirect=${pathname}` : "";
    router.push(`/login${suffix}`);
    return res;
  });
});

const handleLoginOutAfter = (builder: any) => {
  const { pending, fulfilled, rejected } = handleLoginOut;
  builder.addCase(fulfilled, (state: any, { payload }: CommonObj) => {
    //等一秒后再清空，避免userInfo无值时，有些页面会报错
    // setTimeout(() => {  //这样处理会报错
    state.isLogin = false;
    state.userInfo = null;
    state.expired = Date.now();
    // }, 1000);
  });
};

interface UserInitState {
  isLogin: boolean;
  userInfo: CommonObj | null;
  expired: number;
}
const initialState: UserInitState = {
  isLogin: false,
  userInfo: storage.getItem("userInfo"),
  expired: new Date(storage.getItem("expiredDate")).getTime() || Date.now(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    handleLoginInAfter(builder);
    handleLoginOutAfter(builder);
  },
});

export default userSlice;

export const userExpose: CommonObj = {
  handleLoginIn,
  handleLoginOut,
};
