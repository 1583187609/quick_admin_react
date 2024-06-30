import { storage, isProd, defaultHomePath, defaultIconName } from "@/utils";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import { PostUserLogin, PostUserLogout } from "@/api-mock";
import { menuStore, dictStore } from "@/store";
import dayjs from "dayjs";
import { message, notification } from "antd";
import { CommonObj } from "@/vite-env";

const expiration = 24 * 60 * 60 * 1000; // 过期时间，单位：秒，默认24小时不登录即会过期
function getHandleNavs(navs: MenusItem[], level = 0): MenusItem[] {
  if (!navs) return [];
  return navs.map((item: MenusItem) => {
    const { icon, children = [] } = item;
    //为了保持统一及美观，对于嵌套两层以上的菜单项不展示图标
    item.icon = level > 1 ? "" : icon || defaultIconName;
    item.children = getHandleNavs(children, level + 1);
    return item;
  });
}

/**
 * 登录
 * @param data
 * @returns
 */
export const handleLoginIn = createAsyncThunk(
  "userLoginIn",
  async (payload: CommonObj, { dispatch, getState, extra }) => {
    const state = getState();
    const { remember, ...params } = payload;
    if (remember) {
      storage.setItem("rememberAccount", params);
    } else {
      storage.removeItem("rememberAccount");
    }
    return await PostUserLogin(params);
  }
);

/**
 * 用户登出
 */
export const handleLoginOut = createAsyncThunk(
  "userLoginOut",
  async (payload: CommonObj, { dispatch, getState, extra }) => {
    const { isFetch = false } = payload;
    console.log(payload, "payload-----------");
    const state = getState();
    function handleClear() {
      storage.getKeys().forEach((key: string) => {
        if (!["rememberAccount", "set", "hasGuide"].includes(key))
          storage.removeItem(key);
      });
      storage.clear("session"); //清除sessionStorage的数据
      // dictStore.clearMap();
      // state.expired = Date.now();
      // state.userInfo = null;
      // menuStore.changeActiveIndex(0);
      // const { path, fullPath, name } = route;
      // router.push({
      //   name: "login",
      //   query:
      //     name !== "login" && path !== defaultHomePath
      //       ? { redirect: fullPath }
      //       : undefined,
      // });
    }
    handleClear();
    if (!isFetch) return;
    return await PostUserLogout({ phone: state.userInfo!.phone });
  }
);

interface UserInitState {
  isLogin: boolean;
  userInfo: CommonObj | null;
  expired: number;
}
const initialState: UserInitState = {
  isLogin: false,
  userInfo: null,
  expired: new Date(storage.getItem("expiredDate")).getTime() || Date.now(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // loginIn(state, { payload }) {
    //   state.isLogin = true;
    //   handleLoginOut(payload);
    // },
    // loginOut(state, { payload }) {
    //   state.isLogin = false;
    // },
    // asyncLoginIn: createAsyncThunk(
    //   "asyncLoginIn",
    //   async (payload: CommonObj, { dispatch, getState, extra }) => {
    //     // const state = getState();
    //     const { remember, ...params } = payload;
    //     if (remember) {
    //       storage.setItem("rememberAccount", params);
    //     } else {
    //       storage.removeItem("rememberAccount");
    //     }
    //     return await PostUserLogin(params);
    //   },
    //   {
    //     // 当首次调用 API 时运行此项
    //     pending: (state) => {
    //       console.log(state, "执行了pending---------------");
    //     },
    //     // 在出现错误时运行此项
    //     rejected: (state, action) => {
    //       console.log(state, "执行了rejected---------------");
    //     },
    //     // 成功时运行此项
    //     fulfilled: (state, action) => {
    //       console.log(state, "执行了fulfilled---------------");
    //     },
    //   }
    // ),
  },
  extraReducers: (builder) => {
    const { pending, fulfilled, rejected } = handleLoginIn;
    builder.addCase(fulfilled, (state, { payload }) => {
      const { user, navs } = payload as CommonObj;
      const _navs = getHandleNavs(
        navs.filter((it: MenusItem) => {
          const { auth_codes } = it;
          if (!auth_codes) return true;
          return auth_codes.includes(user.type);
        })
      );
      const { id = "", name = "", nickname = "", type_text = "" } = user;
      user._title = name || nickname || type_text + id;
      state.userInfo = user;
      state.expired = Date.now() + expiration;
      storage.setItem("userInfo", user);
      storage.setItem("token", user?.token ?? "");
      storage.setItem("allMenus", _navs);
      storage.setItem(
        "expiredDate",
        dayjs(state.expired).format("YYYY-MM-DD HH:mm:ss")
      );
      // menuStore.initAllMenus(_navs);
      // router.push("/");
      // ElNotification({
      //   type: "success",
      //   title: "登录成功",
      //   duration: 2000,
      //   dangerouslyUseHTMLString: true,
      //   message: `欢迎回来，<b>${userInfo.value!._title}</b>`,
      // });
    });
  },
  // selectors: {
  //   getIsLogin: (state) => state.isLogin,
  // },
});

export default userSlice;

// 导出操作以在应用程序中使用
// export const { addItem, removeItem, updateQuantity } = userSlice.actions;
// // 导出减速器以添加到存储中（第一个示例）
// export default userSlice.reducer;

// 导出选择器
// const { getIsLogin } = userSlice.selectors;
