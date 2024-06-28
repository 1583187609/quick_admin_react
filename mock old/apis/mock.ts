import {
  getRequestParams,
  resData,
  deleteAttrs,
  filterByConditions,
  toViteMockApi,
} from "../utils";
import allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { userRows } from "../data/rows";
import dictMap, { getDictText } from "../dict";
import allAddress from "../data/address";

const delAttrs: string[] = ["psd"];

export default toViteMockApi({
  /**
   * 测试
   * @param type {string} XXXX
   */
  "GET /mock/user": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10 } = getRequestParams(req);
    return resData({ data: allUsers });
  },
  /**
   * 字典映射
   */
  "GET /mock/dict": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    if (name) {
      if (dictMap[name]) {
        return resData({ data: dictMap[name] });
      } else {
        return resData({
          code: 1,
          msg: "未找到该字典映射",
          data: null,
        });
      }
    } else {
      return resData({ data: dictMap });
    }
  },
  /**
   * 获取地区省市区县
   */
  "GET /mock/address": (req: CommonObj) => {
    // const { name } = getRequestParams(req);
    const cloneAddress = allAddress.map((pItem, pInd) => {
      const { id, name, city } = pItem;
      const cloneCity = city.map((cItem, cInd) => {
        const { id, name, area } = cItem;
        const cloenArea = area.map((aItem, aInd) => {
          const { id, name } = aItem;
          return { value: id, label: name };
        });
        return {
          value: id,
          label: name,
          children: cloenArea,
        };
      });
      return {
        value: id,
        label: name,
        children: cloneCity,
      };
    });
    return resData({ data: cloneAddress });
  },
});
