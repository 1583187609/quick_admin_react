import { getRequestParams, resData, deleteAttrs, filterByConditions, toViteMockApi } from "../utils";
import allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import testFields from "../data/test";
import dictMap, { getDictText } from "../dict";
import allAddress from "../data/address";
import allSchool from "../data/school";
import allCompany from "../data/company";
import { CommonObj } from "@/vite-env";

const delAttrs: string[] = ["psd"];

export default toViteMockApi({
  /**
   * 通用的获取详情数据接口
   */
  "GET /mock/common/detail": (req: CommonObj) => {
    return resData({ data: req });
  },
  /**
   * 通用的获取列表的接口
   */
  "GET /mock/common/list": (req: CommonObj) => {
    const {
      id,
      type,
      gender,
      age = [],
      name,
      curr_page = 1,
      page_size = 10,
      exports = false,
      emptyList = false,
      status,
    } = getRequestParams(req);
    if (emptyList) {
      return resData({
        data: {
          total_num: 0,
          records: [],
          curr_page,
          page_size,
          has_next: false,
        },
      });
    }
    let queryList = filterByConditions(allUsers, [
      ["id", id],
      ["type", type],
      ["gender", gender],
      ["status", status],
      ["age", { type: "range", range: age }],
      ["name", { type: "blur", byKeys: ["name"], keyword: name }],
    ]);
    queryList = queryList.map((item, ind: number) => {
      return deleteAttrs(item, delAttrs);
    });
    if (exports) {
      const { fields, ids } = exports;
      if (ids?.length) {
        queryList = filterByConditions(queryList, ["id", { type: "inArr", inArr: ids }]);
      }
      if (fields.length) {
        queryList = queryList.map(row => {
          const newRow: CommonObj = {};
          for (const key in row) {
            if (fields.includes(key)) {
              newRow[key] = row[key];
            }
          }
          return newRow;
        });
      }
      return resData({
        data: queryList,
      });
    } else {
      const sInd = (curr_page - 1) * page_size;
      const eInd = sInd + page_size;
      return resData({
        data: {
          total_num: queryList.length,
          records: queryList.slice(sInd, eInd),
          curr_page,
          page_size,
          has_next: eInd < queryList.length - 1,
        },
      });
    }
  },
  /**
   * 通用的提交数据（信息对象）接口
   */
  "POST /mock/common": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的新增接口
   */
  "POST /mock/common/add": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的修改接口
   */
  "POST /mock/common/update": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的导入接口
   */
  "POST /mock/common/import": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的导出接口
   */
  "POST /mock/common/export": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的删除接口
   */
  "DELETE /mock/common": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的更新全部数据接口（类似post）
   */
  "PUT /mock/common": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的更新局部数据（类似post，只针对更改过的）接口。是对put的补充，patch意为修补。
   */
  "PATCH /mock/common": (req: CommonObj) => {
    return resData();
  },
});
