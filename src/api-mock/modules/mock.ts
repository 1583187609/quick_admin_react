import http from "@/services/http";
import { CommonObj } from "@/vite-env";

/************ 通用接口 *************/
// 通用的获取数据（信息对象）接口
export const GetMockCommonDetail = (data?: CommonObj) => http("get", "/mock/common/detail", data);
// 通用的获取列表（分页数组）接口
export const GetMockCommonList = (data?: CommonObj) => http("get", "/mock/common/list", data);
// 通用的提交数据（信息对象）接口
export const PostMockCommon = (data?: CommonObj) => http("post", "/mock/common", data);
// 通用的新增接口
export const PostMockCommonAdd = (data?: CommonObj) => http("post", "/mock/common/add", data);
// 通用的修改接口
export const PostMockCommonUpdate = (data?: CommonObj) => http("post", "/mock/common/update", data);
// 通用的导入接口
export const PostMockCommonImport = (data?: CommonObj) => http("post", "/mock/common/import", data);
// 通用的导出接口
export const PostMockCommonExport = (data?: CommonObj) => http("post", "/mock/common/export", data);
// 通用的删除接口
export const DeleteMockCommon = (data?: CommonObj) => http("delete", "/mock/common", data);
// 通用的更新全部数据接口
export const PutMockCommon = (data?: CommonObj) => http("put", "/mock/common", data);
// 通用的更新局部数据接口
export const PatchMockCommon = (data?: CommonObj) => http("patch", "/mock/common", data);

/************ 临时写的三个暂用接口 *************/
export const GetImSearchFromUserList = (data?: CommonObj) => http("get", "/mock/common/list", data);
export const GetImSearchFriendList = (data?: CommonObj) => http("get", "/mock/common/list", data);
export const GetImSearchP2pChatList = (data?: CommonObj) => http("get", "/mock/common/list", data);
