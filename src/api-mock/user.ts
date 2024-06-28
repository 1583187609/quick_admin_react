import http from "@/services/http";
import { CommonObj } from "@/vite-env";

//获取验证码
export const GetUserCaptcha = (data?: CommonObj) => http("get", "/user/captcha", data);
//注册
export const PostUserRegister = (data?: CommonObj) => http("post", "/user/register", data);
//登录
export const PostUserLogin = (data?: CommonObj) => http("post", "/user/login", data);
//登出
export const PostUserLogout = (data?: CommonObj) => http("post", "/user/logout", data);
//获取可登录的用户账号
export const GetUserLoginAccounts = (data?: CommonObj) => http("get", "/user/login/accounts", data);
//获取用户列表
export const GetUserInfo = (data?: CommonObj) => http("get", "/user/info", data);
//获取导航数据
export const GetUserNavs = (data?: CommonObj) => http("get", "/user/navs", data);
//获取用户列表
export const GetUserList = (data?: CommonObj) => http("get", "/user/list", data);
//批量删除用户
export const DeleteUserList = (data?: CommonObj) => http("delete", "/user/list", data);
//导出用户列表
export const PostUserListExport = (data?: CommonObj) => http("post", "/user/list/export", data);
//新增用户
export const PostUserAdd = (data?: CommonObj) => http("post", "/user/add", data);
//编辑修改用户
export const PostUserUpdate = (data?: CommonObj) => http("post", "/user/update", data);
