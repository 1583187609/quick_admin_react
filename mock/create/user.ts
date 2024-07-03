import { createPhone } from "./base";
import Mock from "mockjs";
import dayjs from "dayjs";
import { getDictText, getDictCodes, getCascadeText } from "../dict";
import { getDictMapKeys, getAvatarUrl } from "../utils";
import allAddress from "../data/address";
import { CommonObj } from "@/vite-env";

const { Random } = Mock;

/**
 * 生成正式用户列表数据
 * @param num [string] 生成数量
 * @param defObj [object] 模板默认值
 */
export function createUserList(defObj: CommonObj = {}, num = 100, idStart = 1) {
  const { gender, type, phonePre = "135" } = defObj;
  //角色名称映射
  const roleNameMap: CommonObj = {
    0: "superAdmin",
    1: "admin",
    2: "specialUser",
    3: "user",
    4: "visitor",
    5: "developer",
  };
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        "type|1": type === undefined ? getDictCodes("RoleType") : [type],
        type_text: (res: CommonObj) => {
          const { type } = res.context.currentContext;
          return getDictText("RoleType", type);
        },
        phone: () => createPhone(phonePre), //电话号码
        account(res: CommonObj) {
          const { id, type } = res.context.currentContext;
          return `${roleNameMap[type]}_${id}`;
        },
        nickname: (res: CommonObj) => {
          const { type_text } = res.context.currentContext;
          return Random.cword("别样的感动", 1, 5);
        },
        "gender|1": gender ? [gender] : getDictCodes("Gender"),
        gender_text(res: CommonObj) {
          const { gender } = res.context.currentContext;
          return getDictText("Gender", gender);
        },
        psd: `${roleNameMap[type]}123456`,
        name: () => Random.cname(), //姓名
        avatar(res: CommonObj) {
          const { gender } = res.context.currentContext;
          return getAvatarUrl(gender);
        },
        // address: () => Random.city(true), //地址
        //地址 ids
        address() {
          const arrAreas = allAddress.map((pItem, pInd) => {
            const cloneCity = pItem.city.map((cItem, cInd) => {
              const cloneArea = cItem.area.map((aItem, aInd) => {
                return aItem.id;
              });
              return cloneArea;
            });
            return cloneCity;
          });
          const pInd = Math.floor(Math.random() * arrAreas.length);
          const cInd = Math.floor(Math.random() * arrAreas[pInd].length);
          const aInd = Math.floor(Math.random() * arrAreas[pInd][cInd].length);
          return [allAddress[pInd].id, allAddress[pInd].city[cInd].id, allAddress[pInd].city[cInd].area[aInd].id];
        },
        //对应的地址文本
        address_text(res: CommonObj) {
          const { address } = res.context.currentContext;
          return getCascadeText("Region", address);
        },
        birthday() {
          //出生日期
          return Random.date();
        },
        age(res: CommonObj) {
          //年龄
          const { birthday } = res.context.currentContext;
          return dayjs().diff(birthday, "year");
        },
        "status|1": getDictCodes("EnableStatus"),
        status_text(res: CommonObj) {
          const { status } = res.context.currentContext;
          return getDictText("EnableStatus", status);
        },
        produce() {
          return Random.ctitle(3, 200);
        },
        //创建时间
        create_time() {
          return Random.datetime();
        },
        //更新时间
        update_time() {
          return Random.datetime();
        },
        //备注
        remark() {
          return Random.ctitle(0, 20);
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list.map((item: CommonObj, ind: number) => {
    const { phone } = item;
    item.phone = String(phone);
    return item;
  });
}
/**
 * 创建角色列表数据
 * @param num [string] 生成数量
 * @param defObj [object] 模板默认值
 */
export function createRoleList() {
  const codes = getDictCodes("RoleType");
  const num = codes.length;
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": 1, //id递增
        role(res: CommonObj) {
          const { id } = res.context.currentContext;
          return codes[id - 1];
        }, //角色类型
        role_text: (res: CommonObj) => {
          const { role } = res.context.currentContext;
          return getDictText("RoleType", role);
        },
        "status|1": getDictCodes("EnableStatus"), //启用状态
        //备注
        remark() {
          return Random.ctitle(3, 20);
        },
        //创建时间
        create_time() {
          return Random.datetime();
        },
        //更新时间
        update_time() {
          return Random.datetime();
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}
