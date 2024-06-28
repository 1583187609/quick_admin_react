import { createPhone } from "./base";
import Mock from "mockjs";
import dayjs from "dayjs";
import { getDictText, getDictCodes } from "../dict";
import { getDictMapKeys } from "../utils";
import allAddress from "../data/address";
const { Random } = Mock;
/**
 * 生成正式用户列表数据
 * @param num [string] 生成数量
 * @param defObj [object] 模板默认值
 */
export function createUserList(defObj: CommonObj = {}, num = 100, idStart = 1) {
  const { sex, type, phonePre = "135" } = defObj;
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        "type|1": type === undefined ? [0, 1, 2, 3] : [type],
        type_text: (res: CommonObj) => {
          const { type } = res.context.currentContext;
          return getDictText("userType", type);
        },
        phone: () => createPhone(phonePre), //电话号码
        nickname: (res: CommonObj) => {
          const { type_text } = res.context.currentContext;
          return type_text + "-" + Random.cword("别样的感动", 1, 5);
        },
        "sex|1": sex ? [sex] : [0, 1, 2],
        sex_text(res: CommonObj) {
          const { sex } = res.context.currentContext;
          return getDictText("sex", sex);
        },
        psd: `${type < 2 ? "admin" : "user"}123456`,
        name: () => Random.cname(), //姓名
        avatar: "",
        // address: () => Random.city(true), //地址
        //地址 ids
        address() {
          const arrAreas = allAddress.map((pItem, pInd) => {
            const cloneCity = pItem.city.map((cItem, cInd) => {
              const cloeneArea = cItem.area.map((aItem, aInd) => {
                return aItem.id;
              });
              return cloeneArea;
            });
            return cloneCity;
          });
          const pInd = Math.floor(Math.random() * arrAreas.length);
          const cInd = Math.floor(Math.random() * arrAreas[pInd].length);
          const aInd = Math.floor(Math.random() * arrAreas[pInd][cInd].length);
          return [
            allAddress[pInd].id,
            allAddress[pInd].city[cInd].id,
            allAddress[pInd].city[cInd].area[aInd].id,
          ];
        },
        //对应的地址文本
        address_text(res: CommonObj) {
          const { address } = res.context.currentContext;
          const [pId, cId, aId] = address;
          const pItem = allAddress.find((it: CommonObj) => it.id === pId);
          const cItem = pItem?.city.find((it: CommonObj) => it.id === cId);
          const aItem = cItem?.area.find((it: CommonObj) => it.id === cId);
          return `${pItem?.name}${cItem?.name}${aItem?.name || ""}`;
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
        "status|1": getDictCodes("enableStatus"), //0停用 1启用
        status_text(res: CommonObj) {
          const { status } = res.context.currentContext;
          return getDictText("enableStatus", status);
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
export function createRoleList(defObj: CommonObj = {}, num = 100, idStart = 1) {
  const { sex, type, phone } = defObj;
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        "type|1": type === undefined ? [0, 1, 2, 11] : [type],
        "phone|+1": phone, //电话号码
        nickname: () => {
          return Random.cword("别样的感动", 1, 5);
        },
        "sex|1": sex ? [sex] : [0, 1, 2],
        psd: `${type < 11 ? "admin" : "user"}123456`,
        name: () => Random.cname(),
        avatar: "",
        address: () => Random.city(true),
        birthday() {
          return Random.date();
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list.map((item: CommonObj, ind: number) => {
    const { phone, nickname, type, sex, birthday } = item;
    const typeText = getDictText("userType", type);
    item.phone = String(phone);
    item.nickname = typeText + "-" + nickname;
    item.sex_text = getDictText("sex", sex);
    item.age = dayjs().diff(birthday, "year");
    item.type_text = typeText;
    return item;
  });
}
