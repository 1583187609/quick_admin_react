// const baseUrl = "http://127.0.0.1:5179";
// mock 地址： "https://mockapi.eolink.com/wejlzfKceefd6d629b89a3818c1b5f4d447d672cdbde39c"
const useMock = false;
// const realUrl = "120.26.198.77:18888/api/csmweb";
// const realUrl = "http://wzh.frp.nsusn.com:18888/api/csmweb";
const realUrl = "https://cloudapi.nsusn.com/api/csmweb";
// const baseUrl = useMock
//   ? "https://mockapi.eolink.com/wejlzfKceefd6d629b89a3818c1b5f4d447d672cdbde39c"
//   : realUrl;
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { showMessage, storage, typeOf } from "@/utils";
import qs from "qs";
import { CommonObj, SetTimeout, TostMessageType } from "@/vite-env";
// import { useRouter } from "vue-router";

type ToastType = "warning" | "info" | "success" | "error";

let historyMsg = ""; // 上次提示过了，下次不提示重复的
let timer: SetTimeout = null;
let showLoadTimer: SetTimeout = null;
let loading: null | CommonObj = null;
let loadingCount = 0;
// const router = useRouter();
const startLoading = () => {
  // loading = ElLoading.service({
  //   lock: true,
  //   text: "玩命加载中……",
  //   background: "rgba(0, 0, 0, 0.5)",
  // });
};
const endLoading = () => {
  loading?.close();
  loading = null;
};
const showLoading = () => {
  if (loadingCount === 0) {
    showLoadTimer = setTimeout(() => {
      startLoading();
      showLoadTimer = null;
    }, 1000);
  }
  loadingCount += 1;
};

const hideLoading = () => {
  if (loadingCount > 0) {
    loadingCount -= 1;
    if (loadingCount === 0) {
      if (showLoadTimer) {
        clearTimeout(showLoadTimer);
        showLoadTimer = null;
      } else {
        endLoading();
      }
    }
  }
};
const service = axios.create({ timeout: 6000 });
const isDev = process.env.NODE_ENV === "development";
function showToast(msg: string, type: TostMessageType = "warning") {
  if (historyMsg === msg) {
    historyMsg = "";
    return;
  }
  historyMsg = msg;
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    historyMsg = "";
    timer && clearTimeout(timer);
  }, 300);
  showMessage(msg, type);
}

service.interceptors.request.use(
  (cfg: AxiosRequestConfig) => {
    showLoading();
    cfg.headers["Content-Type"] = "application/json;charset=utf-8";
    cfg.headers["token"] = storage.getItem("token");
    cfg.headers["device"] = storage.getItem("user")?.device;
    return cfg;
  },
  (err: CommonObj) => {
    console.error("请求错误：", err);
    return err;
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data: resData } = res;
    const { code, data, msg } = resData;
    hideLoading();
    if (code === 0) {
      return data;
    } else if (code === 401) {
      showToast("token已过期，请重新登录");
      const { pathname, search } = location;
      location.href = `/login?redirect=${pathname}${search}`;
      return;
    } else {
      // const isDevTips = code > 0; //是否是开发提示
      // if (isDevTips) {
      showToast(msg === undefined ? "请求错误" : msg, "error");
      // }
      console.error("请求错误：", msg);
      throw new Error(msg);
    }
  },
  (err: CommonObj) => {
    const { message, config } = err;
    hideLoading();
    if (message === "Network Error") {
      showToast(useMock ? "请输入命令【npm run mock】启动mock服务！" : "网络错误", "error");
    } else if (message.includes("404")) {
      console.error("接口不存在：" + config.url);
      showToast("接口不存在");
    } else if (message.includes("timeout")) {
      showToast("请求超时，请重试");
    } else {
      console.error("响应错误：", err);
      showToast("网络错误");
    }
    return Promise.reject(err);
  }
);

/**
 * 发送http请求
 * @param {String} method 请求类型（区分大小写），可选值：get,post,put,patch,delete
 * get 获取数据。请求指定的页面信息，并返回实体主体。
 * post 提交数据。如：提交表单或上传文件。数据被包含在请求体中
 * put 更新全部数据（类似post）
 * patch 更新局部数据（类似post，只针对更改过的）。是对put的补充，patch意为修补。
 * delete 删除数据。
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} others 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @returns
 */
export default (method = "get", url = "", data: any, others = {}, isStringify = false) => {
  method = method.toLowerCase();
  // if (!url.startsWith("http")) {
  //   url = baseUrl + url;
  // }
  const cfg: CommonObj = { url, method, ...others };
  if (["get"].includes(method)) {
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    // cfg.data = isStringify ? qs.stringify(data) : data;
    const isObj = typeOf(data) === "Object";
    if (isObj) {
      cfg.data = isStringify ? qs.stringify(data) : data;
    } else {
      cfg.data = data;
    }
    // cfg.data = isObj && isStringify ? qs.stringify(data) : data;
  } else {
    throw new Error("请传入正确的请求方法");
  }
  return service(cfg);
};
