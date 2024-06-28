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

export default toViteMockApi({
  /**
   * 获取学校列表
   */
  "GET /options/school": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    const list = allSchool.filter((it: CommonObj) => it.name.includes(name));
    return resData({ data: list });
  },
  /**
   * 获取公司列表
   */
  "GET /options/company": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    const list = allCompany.filter((it: CommonObj) => it.fullName.includes(name));
    return resData({ data: list });
  },
  /**
   * 获取地区省市区县
   */
  "GET /cascader/region": (req: CommonObj) => {
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
