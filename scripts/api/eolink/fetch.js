// const baseUrl = "http://localhost:3721";
const baseUrl = "http://127.0.0.1:5179";
import axios from "axios";
// const qs = require("qs");
// import { typeOf } from "@/utils";

let historyMsg = ""; // 上次提示过了，下次不提示重复的
let timer = null;
const service = axios.create();
function showToast(msg, type = "log") {
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
  console[type](msg);
}

service.interceptors.request.use(
  (cfg) => {
    cfg.headers["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";
    return cfg;
  },
  (err) => {
    console.error("请求错误：", err);
    return err;
  }
);

service.interceptors.response.use(
  (res) => {
    const { data: resData } = res;
    // const { code, data, msg } = resData;
    const { statusCode, errorMsg, type } = resData;
    if (statusCode === "000000") {
      return resData;
    } else {
      throw new Error(errorMsg);
    }
  },
  (err) => {
    console.error("响应错误：", err);
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
export default (
  method = "get",
  url = "",
  data,
  others = {},
  isStringify = false
) => {
  method = method.toLowerCase();
  if (!url.startsWith("http")) {
    url = baseUrl + url;
  }
  const cfg = { url, method, ...others };
  if (["get"].includes(method)) {
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    // const isObj = typeOf(data) === "Object";
    // cfg.data = isObj && isStringify ? qs.stringify(data) : data;
    cfg.data = data;
  } else {
    showToast("请传入正确的请求方法", "error");
  }
  return service(cfg);
};
