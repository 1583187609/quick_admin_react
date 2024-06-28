import {
  getRequestParams,
  resData,
  deleteAttrs,
  filterByConditions,
  toViteMockApi,
} from "../utils";
import Mock from "mockjs";
import _allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { userRows } from "../data/rows";
import { getDictText } from "../dict";
import allAddress from "../data/address";
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
  "POST /user/regist": (req: CommonObj) => {
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
    const {
      phone = "",
      psd = "",
      captcha = "",
      valid_captcha = true,
    } = getRequestParams(req, ["captcha", "phone", "psd"]);
    let code, msg, data;
    data = allUsers.find((it: CommonObj) => {
      return it.phone === phone && it.psd === psd;
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
    const { captcha } = Mock.mock({
      captcha: /[a-zA-Z0-9]{4}/,
    });
    setCache("captcha", captcha);
    return resData({ data: captcha });
  },
  /**
   * 测试用户菜单
   * @param type [number] 用户类型，可选值：0超级管理员；1普通管理员 11普通用户
   */
  "GET /user/navs": (req: CommonObj) => {
    return resData({
      data: allNavs,
    });
  },
  /**
   * 获取用户列表
   * @param type [number] 用户类型，可选值：0超级管理员；1普通管理员 11普通用户
   * @param export_fields [string] 导出字段
   */
  "POST /user/list": (req: CommonObj) => {
    const {
      id,
      type,
      sex,
      age = [],
      name,
      curr_page = 1,
      page_size = 10,
      exports,
    } = getRequestParams(req);
    let queryList = filterByConditions(allUsers, [
      ["id", id],
      ["type", type],
      ["sex", sex],
      ["age", { type: "range", range: age }],
      ["name", { type: "blur", byKeys: ["name"], keyword: name }],
    ]);
    queryList = queryList.map((item, ind: number) => {
      return deleteAttrs(item, delAttrs);
    });
    if (exports) {
      const { fields, ids } = exports;
      if (ids?.length) {
        queryList = filterByConditions(queryList, [
          "id",
          { type: "inArr", inArr: ids },
        ]);
      }
      if (fields.length) {
        queryList = queryList.map((row) => {
          const newRow: CommonObj = {};
          for (let key in row) {
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
   * @param type [number] 用户类型，可选值：0超级管理员；1普通管理员 11普通用户
   */
  "DELETE /user/list": (req: CommonObj) => {
    const { ids = [] }: CommonObj = getRequestParams(req);
    let queryList = filterByConditions(allUsers, [
      ["ids", { type: "notInArr", notInArr: ids }],
    ]);
    allUsers = queryList;
    return resData({});
  },
  /**
   * 获取用户信息
   * @param phone [string] 电话号码
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
   * 修改用户信息
   * @param phone [string] 电话号码
   * @param status [number] 账号状态 1启用 2禁用
   */
  "PUT /user/info": (req: CommonObj) => {
    const { id, status } = getRequestParams(req);
    let code, msg;
    let user = allUsers.find((it: CommonObj) => it.id === id);
    if (!user) {
      code = 1;
      msg = "不存在该用户";
    }
    return resData({ code, msg });
  },
  /**
   * 管理员新增用户
   * @param phone [string] 电话号码
   * @param psd [string] 密码
   */
  "POST /user/add": (req: CommonObj) => {
    const {
      type,
      name = "",
      nickname = "",
      avatar = "",
      sex,
      age,
      address = "",
      birthday = "",
      phone = "",
      psd = "",
    } = getRequestParams(req);
    let code, msg;
    const isExist = allUsers.find((it: CommonObj) => it.phone === phone);
    if (isExist) {
      code = 1;
      msg = "该用户已存在";
    } else {
      allUsers.push({
        id: allUsers.slice(-1)[0].id + 1,
        type,
        name,
        type_text: getDictText("userType", type),
        phone,
        nickname,
        sex,
        sex_text: getDictText("sex", sex),
        psd,
        avatar,
        address,
        birthday,
        age,
      });
    }
    return resData({ code, msg, data: null });
  },

  /**
   * 删除用户
   */
  "DELETE /user/:id": (req: CommonObj) => {
    const { id } = getRequestParams(req);
    let code, msg, data;
    const findInd = allUsers.findIndex((it: CommonObj) => it.id === id);
    if (findInd === -1) {
      code = 1;
      msg = "不存在该用户";
    } else {
      allUsers.splice(findInd, 1);
    }
    return resData({ code, msg, data });
  },
  /**
   * 用户提交表单（测试）
   */
  "POST /user/submit": (req: CommonObj) => {
    return resData({ data: null });
  },
});
