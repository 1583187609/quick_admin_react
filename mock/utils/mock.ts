import allAddress from "../data/address";
import { getCascadeText, getDictCodes, getDictText } from "../dict";
import { createPhone } from "../create";
import { CommonObj, StrNum } from "@/vite-env";
import { typeOf } from "./common";
import dayjs from "dayjs";
import Mock from "mockjs";

const { Random } = Mock;

// 创建 Mock.js 方法来生成数据
Mock.Random.extend({
  // 生成早于当前时间的随机日期
  getRandomEarlyDate,
  // 获取随机的日志时间（创建时间、修改时间）
  getRandomLogDate(createTime?: number, fmt = "YYYY-MM-DD HH:mm:ss") {
    if (!createTime) return dayjs(getRandomEarlyDate(undefined, undefined, "")).format(fmt);
    const nowTime = Date.now();
    const diff = nowTime - new Date(createTime).getTime();
    const randomDiff = Math.floor(Math.random() * diff);
    return dayjs(new Date(nowTime - randomDiff)).format(fmt);
  },
});

/**
 * 生成早于当前时间的随机日期
 * @param maxDiff 距离现在最久的时刻（单位：秒）
 * @param minDiff 距离现在最近的时刻（单位：秒）
 * @returns
 */
function getRandomEarlyDate(minDiff = 60 * 60 * 0.1, maxDiff = 60 * 60 * 24 * 365, fmt = "YYYY-MM-DD HH:mm:ss"): StrNum {
  const now = Date.now();
  const randomDiff = (Math.floor(Math.random() * maxDiff) + minDiff) * 1000;
  const randomTime = new Date(now - randomDiff).getTime();
  return fmt ? dayjs(randomTime).format(fmt) : randomTime;
}

/**
 * 生成mock配置
 * @param {object} rules
 * @returns
 */
//默认值，也作为示例值
const defaultRules: CommonObj = {
  id: { min: 1 }, //id递增，min是起始地址值
  enum: { name: "EnableStatus", withText: true, prop: "status" }, //枚举值
  // // 若为数组，则会生成两个
  // enum: [
  //   { name: "EnableStatus", prop: "status" },
  //   { name: "Gender", prop: "gender" },
  // ],
  phone: { pre: "135" }, //电话号码
  cascader: { name: "Region", withText: true, level: 3, prop: "address" }, //级联：(level: 3表示返回共3级)
  remark: { minLength: 5, maxLength: 20 }, //备注
  integer: { min: 1, max: 30, prop: "age" }, //随机整数
  earlyDate: {
    min: 60 * 60 * 24 * 365 * 18,
    max: 60 * 60 * 24 * 365 * 30,
    prop: "birthday",
  },
  //创建、修改时间
  createUpdateTime: {
    createTimeProp: "create_time",
    updateTimeProp: "update_time",
  },
  // // 此处用作自定义示例
  //  custom: {
  //    real_name: () => Random.cname(), //姓名
  //  },
};
export function getMockCfg(rules: CommonObj): CommonObj {
  const cfg: CommonObj = {};
  for (const key in rules) {
    const _rule = rules[key];
    const t = typeOf(_rule);
    const records: CommonObj[] = [];
    if (t === "Null" || t === "Object") {
      records.push(Object.assign({ prop: key }, defaultRules[key], _rule));
    } else if (t === "Array") {
      records.push(..._rule.map((it: CommonObj) => Object.assign({ prop: key }, defaultRules[key], it)));
    } else {
      throw new Error(`不支持参数类型${t}`);
    }
    const type = key;
    records.forEach((rule: CommonObj, ind) => {
      const { prop } = rule;
      if (type === "id") {
        const { min } = rule;
        cfg[`${prop}|+1`] = min;
      } else if (type === "enum") {
        const { name, withText } = rule;
        cfg[`${prop}|+1`] = getDictCodes(name);
        if (withText) {
          cfg[`${prop}_text`] = (res: CommonObj) => {
            const code = res.context.currentContext[prop];
            return getDictText(name, code);
          };
        }
      } else if (type === "phone") {
        const { prefix } = rule;
        cfg[prop] = createPhone(prefix);
      } else if (type === "cascader") {
        const { name, withText, level } = rule;
        // cfg.address = () => Random.city(true); //地址
        cfg[prop] = () => {
          let ids: number[] = [];
          if (name === "Region") {
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
            ids = [allAddress[pInd].id, allAddress[pInd].city[cInd].id, allAddress[pInd].city[cInd].area[aInd].id];
          }
          return ids.slice(0, level);
        };
        if (withText) {
          cfg[`${prop}_text`] = (res: CommonObj) => {
            const codes = res.context.currentContext[prop];
            return getCascadeText("Region", codes);
          };
        }
      } else if (type === "remark") {
        const { minLength, maxLength } = rule;
        cfg[prop] = () => Random.ctitle(minLength, maxLength);
      } else if (type === "integer") {
        const { min, max } = rule;
        cfg[prop] = () => Mock.Random.integer(min, max);
      } else if (type === "createUpdateTime") {
        //一并生成创建时间、更新时间
        const { createTimeProp, updateTimeProp } = rule;
        let createDate = "";
        if (createTimeProp)
          cfg[createTimeProp] = () => {
            createDate = Mock.Random.getRandomLogDate();
            return createDate;
          };
        if (updateTimeProp) cfg[updateTimeProp] = () => Mock.Random.getRandomLogDate(createDate);
      } else if (type === "earlyDate") {
        const { min, max } = rule;
        cfg[prop] = () => Mock.Random.getRandomEarlyDate(min, max, "YYYY-MM-DD");
      } else if (type === "custom") {
        Object.assign(cfg, rule);
      } else {
        throw new Error(`不存在${type}类型，请检查`);
      }
    });
  }
  return cfg;
}
