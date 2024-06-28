import http from "@/services/http";
import { CommonObj } from "@/vite-env";
/************ 角色相关 *************/
//权限 - 获取角色列表
export const GetAuthRoleList = (data?: CommonObj) => http("get", "/auth/role/list", data);
//权限 - 新增角色
export const PostAuthRoleAdd = (data?: CommonObj) => http("post", "/auth/role/add", data);
//权限 - 修改角色
export const PostAuthRoleUpdate = (data?: CommonObj) => http("post", "/auth/role/update", data);
//权限 - 获取角色信息
export const GetAuthRoleInfo = (data?: CommonObj) => http("get", "/auth/role/info", data);
//权限 - 批量删除角色列表
export const DeleteAuthRoleList = (data?: CommonObj) => http("delete", "/auth/role/list", data);

/************ 菜单相关 *************/
//权限 - 获取菜单列表
export const GetAuthMenuList = (data?: CommonObj) => http("get", "/auth/menu/list", data);
//权限 - 新增菜单
export const PostAuthMenuAdd = (data?: CommonObj) => http("post", "/auth/menu/add", data);
//权限 - 修改菜单
export const PostAuthMenuUpdate = (data?: CommonObj) => http("post", "/auth/menu/update", data);
//权限 - 获取菜单信息
export const GetAuthMenuInfo = (data?: CommonObj) => http("get", "/auth/menu/info", data);
//权限 - 批量删除菜单列表
export const DeleteAuthMenuList = (data?: CommonObj) => http("delete", "/auth/menu/list", data);
