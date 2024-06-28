import http from "@/services/http";
//获取验证码
export const GetUserCaptcha = (data: CommonObj = {}) =>
  http("get", "/user/captcha", data);
//登录
export const PostUserLogin = (data: CommonObj = {}) =>
  http("post", "/user/login", data);
//登出
export const PostUserLogout = (data: CommonObj = {}) =>
  http("post", "/user/logout", data);
//获取用户列表
export const GetUserInfo = (data: CommonObj = {}) =>
  http("get", "/user/info", data);
//获取导航数据
export const GetUserNavs = (data: CommonObj = {}) =>
  http("get", "/user/navs", data);
//获取用户列表、导出
export const PostUserList = (data: CommonObj = {}) =>
  http("post", "/user/list", data);
//批量删除用户
export const DeleteUserList = (data: CommonObj = {}) =>
  http("delete", "/user/list", data);
//用户提交
export const PostUserSubmit = (data: CommonObj = {}) =>
  http("post", "/user/submit", data);
