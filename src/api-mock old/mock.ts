import http from "@/services/http";
// 获取mock 字典映射
export const GetMockDict = (data: CommonObj = {}) =>
  http("get", "/mock/dict", data);
// 获取mock 地区省市区县
export const GetMockAddress = (data: CommonObj = {}) =>
  http("get", "/mock/address", data);
// 获取mock导航数据
export const GetMockNavs = (data: CommonObj = {}) =>
  http("get", "/mock/navs", data);
// 提交表单
export const PostMockSubmit = (data: CommonObj = {}) =>
  http("post", "/mock/submit", data);
//测试获取表格行数据
export const GetMockRoleList = (data: CommonObj = {}) =>
  http("get", "/mock/role/list", data);
