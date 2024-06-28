import {
  getRequestParams,
  resData,
  deleteAttrs,
  filterByConditions,
  toViteMockApi,
  getConstructorObj,
  getIsInDateRange,
  getNavsTree,
  findTreeNode,
} from "../utils";
import { merge } from "lodash";
import _allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { getDictText, getCascadeText } from "../dict";
import dayjs from "dayjs";
import Mock from "mockjs";
import { CommonObj } from "@/vite-env";

const { Random } = Mock;
const delAttrs: string[] = ["psd"];
let allRoles = JSON.parse(JSON.stringify(roleRows));
let allNavsTree = getNavsTree(allNavs);

export default toViteMockApi({
  /**
   * 权限 - 角色列表
   */
  "GET /auth/role/list": (req: CommonObj) => {
    const { role_type, status, create_time_range, curr_page = 1, page_size = 10 } = getRequestParams(req);
    const queryList = filterByConditions(allRoles, [
      ["role_type", role_type],
      ["status", status],
      ["create_time", { type: "range", range: create_time_range, parse: "date" }],
    ]);
    const sInd = (curr_page - 1) * page_size;
    const eInd = sInd + page_size;
    return resData({
      data: {
        total_num: queryList.length,
        records: queryList,
        curr_page,
        page_size,
        has_next: eInd < queryList.length - 1,
      },
    });
  },
  /**
   * 权限 - 新增角色
   */
  "POST /auth/role/add": (req: CommonObj) => {
    let code, msg, data;
    const reqObj = getRequestParams(req);
    const { role_type_text, role_type, status, remark, menu_auth } = reqObj;
    const isExist = allRoles.find((it: CommonObj) => it.role_type === role_type);
    if (isExist) {
      code = 1;
      msg = "该角色已存在";
    } else {
      data = merge(getConstructorObj(allRoles?.[0]), reqObj, {
        id: allRoles.slice(-1)[0].id + 1,
        role_type,
        role_type_text,
        status_text: getDictText("Gender", status),
        create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      });
      allRoles.push(data);
    }
    return resData({ code, msg, data });
  },
  /**
   * 权限 - 修改角色
   */
  "POST /auth/role/update": (req: CommonObj) => {
    let code, msg, data;
    const reqObj = getRequestParams(req);
    const { id, role_type, role_type_text, status, remark, menu_auth } = reqObj;
    const roleInfo = allRoles.find((it: CommonObj) => it.id === id);
    if (roleInfo) {
      data = merge(roleInfo, reqObj, {
        role_type,
        role_type_text,
        status_text: getDictText("Gender", status),
        update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      });
    } else {
      code = 1;
      msg = "不存在该角色";
    }
    return resData({ code, msg, data });
  },
  /**
   * 获取角色信息
   * @param phone [string] 电话号码
   */
  "GET /auth/role/info": (req: CommonObj) => {
    let code, msg;
    const { id } = getRequestParams(req);
    const data = allRoles.find((it: CommonObj) => it.id === id);
    if (!data) {
      code = 1;
      msg = "不存在该角色";
    }
    return resData({ code, msg, data });
  },
  /**
   * 批量删除角色列表
   * @param ids [number] 角色id数组
   */
  "DELETE /auth/role/list": (req: CommonObj) => {
    const { ids = [] }: CommonObj = getRequestParams(req);
    const queryList = filterByConditions(allRoles, [["id", { type: "notInArr", notInArr: ids }]]);
    allRoles = queryList;
    return resData();
  },
  /**
   * 权限 - 获取菜单列表
   */
  "GET /auth/menu/list": (req: CommonObj) => {
    const {
      name,
      status,
      is_cache,
      is_link,
      create_time_range,
      // curr_page = 1,
      // page_size = 10,
    } = getRequestParams(req);
    const queryTree = getFilterTree(JSON.parse(JSON.stringify(allNavsTree)));
    function getFilterTree(arr: any) {
      return arr?.slice()?.filter((item: any, ind: number) => {
        if (item.children?.length) {
          item.children = getFilterTree(item.children);
          return !!item.children?.length;
        } else {
          return (
            (name === undefined || item.name.includes(name)) &&
            (status === undefined || item.status === status) &&
            (is_cache === undefined || item.is_cache === is_cache) &&
            (is_link === undefined || item.is_link === is_link) &&
            getIsInDateRange(create_time_range, item.create_time, "date")
          );
        }
      });
    }
    return resData({
      data: {
        total_num: queryTree.length,
        records: queryTree,
        // curr_page,
        // page_size,
        has_next: false,
      },
    });
  },
  /**
   * 权限 - 批量删除菜单列表
   * @param ids [number] 菜单id数组
   */
  "DELETE /auth/menu/list": (req: CommonObj) => {
    const { ids = [] }: CommonObj = getRequestParams(req);
    allNavsTree = getFilterTree(allNavsTree);
    function getFilterTree(arr: any[]) {
      return arr?.filter((item: any, ind: number) => {
        const { id, children } = item;
        item.children = getFilterTree(children);
        return !ids.includes(id);
      });
    }
    return resData();
  },
  /**
   * 权限 - 获取菜单信息
   */
  "GET /auth/menu/info": (req: CommonObj) => {
    const { id } = getRequestParams(req, ["id"]);
    let code, msg;
    const data = findTreeNode(allNavsTree, id);
    if (!data) {
      code = 1;
      msg = "不存在该菜单";
    } else {
    }
    return resData({ code, msg, data });
  },
  /**
   * 权限 - 新增菜单
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /auth/menu/add": (req: CommonObj) => {
    // const reqObj = getRequestParams(req);
    // let code, msg, data;
    // const { type, gender, phone, address } = reqObj;
    // const isExist = allNavsTree.find((it: CommonObj) => it.phone === phone);
    // if (isExist) {
    //   code = 1;
    //   msg = "该菜单已存在";
    // } else {
    //   data = merge(getConstructorObj(allNavsTree?.[0]), reqObj, {
    //     id: allNavsTree.slice(-1)[0].id + 1,
    //     type_text: getDictText("RoleType", type),
    //     gender_text: getDictText("Gender", gender),
    //     address_text: getCascadeText("Region", address),
    //     create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    //   });
    //   allNavsTree.push(data);
    // }
    // return resData({ code, msg, data });
    return resData();
  },
  /**
   * 权限 - 编辑修改菜单
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /auth/menu/update": (req: CommonObj) => {
    let code, msg, data;
    const reqObj = getRequestParams(req);
    const { id } = reqObj;
    data = findTreeNode(allNavsTree, id);
    if (data) {
      data = merge(data, reqObj, {
        update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      });
    } else {
      code = 1;
      msg = "不存在该菜单/目录/按钮";
    }
    return resData({ code, msg, data });
  },
});
