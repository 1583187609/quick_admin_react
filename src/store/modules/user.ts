import { storage, isProd, defaultHomePath, defaultIconName } from "@/utils";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { PostUserLogin, PostUserLogout } from "@/api-mock";
import { message, notification } from "antd";
import { CommonObj } from "@/vite-env";
import menuStore from "@/store/modules/menu";
import dayjs from "dayjs";

const expiration = 24 * 60 * 60 * 1000; // 过期时间，单位：秒，默认24小时不登录即会过期

function getMenuNavs(navs: ResponseMenuItem[], level = 0): ResponseMenuItem[] {
  if (!navs) return [];
  return navs.map((item: ResponseMenuItem) => {
    const { icon = defaultIconName, children = [] } = item;
    //为了保持统一及美观，对于嵌套两层以上的菜单项不展示图标
    item.icon = level > 1 ? null : icon;
    item.children = getMenuNavs(children, level + 1);
    return item;
  });
}

/**
 * 登录
 * @param data
 * @returns
 */
const handleLoginIn = createAsyncThunk("userLoginIn", async (payload: CommonObj, { dispatch, getState, extra }) => {
  const state = getState();
  const { remember, ...args } = payload.params;
  const { router, location } = payload.other;
  if (remember) {
    storage.setItem("rememberAccount", args);
  } else {
    storage.removeItem("rememberAccount");
  }
  return await PostUserLogin(args).then(res => {
    const { user, navs, ...rest } = res as CommonObj;
    const newNavs = getMenuNavs(
      navs.filter((it: ResponseMenuItem) => {
        const { auth_codes, path } = it;
        if (path === "demo") return false; //过滤掉demo示例代码
        if (!auth_codes) return true;
        return auth_codes.includes(user.type);
      })
    );
    const { id = "", name = "", nickname = "", type_text = "" } = user;
    user._title = name || nickname || type_text + id;
    const expired = Date.now() + expiration;
    const expiredDate = dayjs(expired).format("YYYY-MM-DD HH:mm:ss");
    storage.setItem("userInfo", user);
    storage.setItem("token", user?.token ?? "");
    storage.setItem("allMenus", newNavs);
    storage.setItem("expiredDate", expiredDate);
    let toPath = defaultHomePath;
    if (location.search) toPath = location.search.slice(10);
    router.push(toPath);
    notification.success({
      closeIcon: false,
      style: { top: "36px" },
      placement: "topRight",
      message: "登录成功",
      description: `欢迎回来，${user?.name ?? "XXX"}`,
      duration: 3, //单位：秒
    });
    return {
      user,
      navs: newNavs,
      expired,
      ...rest,
    };
  });
});
const handleLoginInAfter = (builder: any) => {
  const { pending, fulfilled, rejected } = handleLoginIn;
  builder.addCase(fulfilled, (state: any, { payload }: CommonObj) => {
    const { user, navs, expired } = payload as CommonObj;
    state.userInfo = user;
    state.isLogin = true;
    state.expired = expired;
    menuStore.actions.initMenus(navs);
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
    menuStore.actions.changeActiveIndex(0);
    message.success("退出成功！");
    const { pathname } = location;
    // const { path, fullPath, name } = route;
    // router.push({
    //   name: "login",
    //   query:
    //     name !== "login" && path !== defaultHomePath
    //       ? { redirect: fullPath }
    //       : undefined,
    // });
    let suffix = "";
    if (!["/login", defaultHomePath].includes(pathname)) suffix = `?redirect=${pathname}`;
    router.push(`/login${suffix}`);
    return res;
  });
});

const handleLoginOutAfter = (builder: any) => {
  const { pending, fulfilled, rejected } = handleLoginOut;
  builder.addCase(fulfilled, (state: any, { payload }: CommonObj) => {
    state.isLogin = false;
    state.userInfo = null;
    state.expired = Date.now();
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
  //   extraReducers: {
  //     [handleLoginIn.fulfilled]: (state, action) => {
  //       state.posts = action.payload.data;
  //     },
  //     [handleLoginIn.rejected]: (state, action) => {
  //      state.posts = [];
  //     },
  //   },
  //  }),
  extraReducers: builder => {
    handleLoginInAfter(builder);
    handleLoginOutAfter(builder);
  },
  // selectors: {
  //   getIsLogin: (state) => state.isLogin,
  // },
});

export default userSlice;

export const expose: CommonObj = {
  handleLoginIn,
  handleLoginOut,
};

// 导出操作以在应用程序中使用
// export const { addItem, removeItem, updateQuantity } = userSlice.actions;
// // 导出减速器以添加到存储中（第一个示例）
// export default userSlice.reducer;

// 导出选择器
// const { getIsLogin } = userSlice.selectors;
