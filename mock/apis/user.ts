import { getRequestParams, resData, deleteAttrs, filterByConditions, toViteMockApi, getConstructorObj } from "../utils";
import Mock from "mockjs";
import _allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { getDictText, getCascadeText, getDictCodes } from "../dict";
import allAddress from "../data/address";
import { CommonObj } from "@/vite-env";
import dayjs from "dayjs";
import { merge } from "lodash";
import { TableColAttrs } from "@/components/table";

const { Random } = Mock;

const delAttrs: string[] = ["psd"];
let allUsers = JSON.parse(JSON.stringify(_allUsers));
//缓存数据
const cacheData: CommonObj = {
  token: "", //登录授权token
  captcha: "", //4位验证码
};
//设置（修改）缓存
function setCache(key: string, val: any) {
  cacheData[key] = val;
}
export default toViteMockApi({
  /**
   * 用户注册
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /user/register": (req: CommonObj) => {
    const { phone = "", psd = "" } = getRequestParams(req);
    let code, msg;
    const data = allUsers.find((it: CommonObj) => {
      return it.phone === phone;
    });
    if (data) {
      code = 1;
      msg = "该账号已注册";
    }
    return resData({ code, msg, data });
  },
  /**
   * 用户登录
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   * @param valid_captcha [boolean] 是否校验验证码
   */
  "POST /user/login": (req: CommonObj) => {
    const { phone = "", psd = "", captcha = "", valid_captcha = true } = getRequestParams(req, ["captcha", "phone", "psd"]);
    let code, msg;
    const data: CommonObj[] = allUsers.find((it: CommonObj) => {
      return (it.phone === phone || it.account === phone) && it.psd === psd;
    });
    if (!data) {
      code = 1;
      msg = "账号或密码错误";
      return resData({ code, msg });
    } else {
      const isErr = captcha?.toLowerCase() !== cacheData.captcha?.toLowerCase();
      if (valid_captcha && isErr) {
        return resData({ code: 1, msg: "验证码错误" });
      } else {
        const { token } = Mock.mock({ token: "@guid" }); //生成32位uuid 的token
        setCache("token", token);
        return resData({
          data: {
            navs: allNavs,
            user: { token, ...deleteAttrs(data, delAttrs) },
          },
        });
      }
    }
  },
  /**
   * 用户退出
   */
  "POST /user/logout": (req: CommonObj) => {
    const { phone = "", token = "", is_valid = true } = getRequestParams(req);
    let code, msg;
    if (is_valid) {
      const isExist = allUsers.find((it: CommonObj) => it.phone === phone);
      if (!isExist) {
        code = 1;
        msg = "不存在该用户";
      }
    }
    return resData({ code, msg });
  },
  /**
   * 用户验证码
   * @param ilo0 boolean 是否包含ilo0
   */
  "GET /user/captcha": (req: CommonObj) => {
    const { num = 4, ilo0 = true } = getRequestParams(req);
    const captchaReg = new RegExp(ilo0 ? `[a-hj-km-zA-HJ-KM-Z2-9]{${num}}` : `[a-zA-Z0-9]{${num}}`);
    const { captcha } = Mock.mock({
      captcha: captchaReg,
    });
    setCache("captcha", captcha);
    return resData({ data: captcha });
  },
  /**
   * 用户菜单导航数据
   * @param type [number] 用户类型，可选值：0超级管理员；1普通管理员 11普通用户
   */
  "GET /user/navs": (req: CommonObj) => {
    // const {} = getRequestParams(req);
    return resData({
      data: allNavs,
    });
  },
  /**
   * 获取用户列表
   * @param type [number] 用户类型，可选值：0超级管理员；1普通管理员 11普通用户
   * @param export_fields [string] 导出字段
   */
  "GET /user/list": (req: CommonObj) => {
    const { id, type, gender, age = [], name, curr_page = 1, page_size = 10, exports, status } = getRequestParams(req);
    let queryList = filterByConditions(allUsers, [
      ["id", id],
      ["type", type],
      ["gender", gender],
      ["status", status],
      ["age", { type: "range", range: age }],
      ["name", { type: "blur", byKeys: ["name"], keyword: name }],
    ]);
    queryList = queryList.map((item: CommonObj) => {
      item = deleteAttrs(item, delAttrs);
      item.userData = JSON.parse(JSON.stringify(item));
      return item;
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
   * 批量删除用户列表
   * @param ids [number] 用户id数组
   */
  "DELETE /user/list": (req: CommonObj) => {
    const { ids = [] }: CommonObj = getRequestParams(req);
    const queryList = filterByConditions(allUsers, [["id", { type: "notInArr", notInArr: ids }]]);
    allUsers = queryList;
    return resData();
  },
  /**
   * 导出用户列表
   * @param ids [number] 用户id数组
   */
  "POST /user/list/export": (req: CommonObj) => {
    const { ids = [], cols = [] }: CommonObj = getRequestParams(req);
    const queryList = filterByConditions(allUsers, [["id", { type: "inArr", inArr: ids }]]);
    const labels: string[] = [];
    const props: string[] = [];
    cols?.forEach((col: TableColAttrs, ind: number) => {
      const { label, prop } = col;
      labels.push(label as string);
      props.push(prop as string);
    });
    const rows: any[] = queryList.map((item: CommonObj, ind: number) => {
      return props.map((prop: string, ind: number) => {
        return item[prop];
      });
    });
    return resData({ data: [labels, rows.flat(1)] });
  },
  /**
   * 获取用户信息
   */
  "GET /user/info": (req: CommonObj) => {
    const { id } = getRequestParams(req);
    let code, msg;
    const data = allUsers.find((it: CommonObj) => it.id === id);
    if (!data) {
      code = 1;
      msg = "不存在该用户";
    }
    return resData({ code, msg, data });
  },
  /**
   * 管理员新增用户
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /user/add": (req: CommonObj) => {
    const reqObj = getRequestParams(req);
    let code, msg, data;
    const { type, gender, phone, address } = reqObj;
    const isExist = allUsers.find((it: CommonObj) => it.phone === phone);
    if (isExist) {
      code = 1;
      msg = "该用户已存在";
    } else {
      data = merge(getConstructorObj(allUsers?.[0]), reqObj, {
        id: allUsers.slice(-1)[0].id + 1,
        type_text: getDictText("RoleType", type),
        gender_text: getDictText("Gender", gender),
        address_text: getCascadeText("Region", address),
        create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      });
      allUsers.push(data);
    }
    return resData({ code, msg, data });
  },
  /**
   * 编辑修改用户资料
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /user/update": (req: CommonObj) => {
    let code, msg, data;
    const reqObj = getRequestParams(req);
    const { id, phone, type, gender, address } = reqObj;
    const user = allUsers.find((it: CommonObj) => it.id === id || it.phone === phone);
    if (user) {
      data = merge(user, reqObj, {
        type_text: getDictText("RoleType", type),
        gender_text: getDictText("Gender", gender),
        address_text: getCascadeText("Region", address),
        update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
      });
    } else {
      code = 1;
      msg = "不存在该用户";
    }
    return resData({ code, msg, data });
  },
  /**
   * 获取用户登录的账号(一类角色各选取一个账号)
   */
  "GET /user/login/accounts": (req: CommonObj) => {
    const roles = getDictCodes("RoleType");
    const accounts: CommonObj[] = [];
    let ind = 0;
    _allUsers.find((item: CommonObj) => {
      if (roles[ind] === item.type) {
        const { account, type_text, phone, id, psd } = item;
        accounts.push({ account, type_text, phone, id, psd });
        ind++;
      }
      return ind >= roles.length;
    });
    return resData({
      data: accounts,
    });
  },
  /**
   * 删除用户
   */
  // "DELETE /user/:id": (req: CommonObj) => {
  //   const { id } = getRequestParams(req);
  //   let code, msg, data;
  //   const findInd = allUsers.findIndex((it: CommonObj) => it.id === id);
  //   if (findInd === -1) {
  //     code = 1;
  //     msg = "不存在该用户";
  //   } else {
  //     allUsers.splice(findInd, 1);
  //   }
  //   return resData({ code, msg, data });
  // },
});
