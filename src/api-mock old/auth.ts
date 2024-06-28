import http from "@/services/http";
//获取权限角色列表
export const GetAuthRoleList = (data: CommonObj = {}) =>
  http("get", "/auth/role/list", data);
//获取权限菜单列表
export const GetAuthMenuList = (data: CommonObj = {}) =>
  http("get", "/auth/menu/list", data);
