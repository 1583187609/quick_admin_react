import {
  getRequestParams,
  resData,
  deleteAttrs,
  filterByConditions,
  toViteMockApi,
} from "../utils";
import _allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { userRows } from "../data/rows";
import { getDictText } from "../dict";
import allAddress from "../data/address";

const delAttrs: string[] = ["psd"];
let allUsers = JSON.parse(JSON.stringify(_allUsers));

export default toViteMockApi({
  /**
   * 权限角色列表
   */
  "GET /auth/role/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10 } = getRequestParams(req);
    return resData({
      data: {
        total_num: roleRows.length,
        records: roleRows,
        curr_page,
        page_size,
        has_next: false,
      },
    });
  },
  /**
   * 权限菜单列表
   */
  "GET /auth/menu/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = allNavs.length } = getRequestParams(req);
    function handleList(arr: CommonObj[] = []): CommonObj[] {
      return arr.map((item, ind) => {
        const {
          label,
          component = "",
          path,
          children = [],
          status,
          ...rest
        } = item;
        const newChildren = handleList(children);
        const type = component ? 2 : 1; //1 目录 2 菜单
        return {
          menu_name: label,
          menu_path: path,
          component_path: component,
          children: newChildren.length ? newChildren : undefined,
          remark: "", //备注
          type,
          order_num: 1,
          perms: "menu:list:auth",
          status,
          status_text: getDictText("enableStatus", status),
          menu_type_text: getDictText("menuType", type),
          create_time: "2023-06-18",
          update_time: "2023-06-18",
          ...rest,
        };
      });
    }
    const list = handleList(allNavs);
    return resData({
      data: {
        total_num: list.length,
        records: list,
        curr_page,
        page_size,
        has_next: false,
      },
    });
  },
});
