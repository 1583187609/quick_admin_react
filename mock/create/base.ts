import Mock from "mockjs";
import dayjs from "dayjs";
import { getDictText } from "../dict";
import { getDictMapKeys, getMockCfg } from "../utils";
import { CommonObj } from "@/vite-env";

const { Random } = Mock;

/**
 * 生成正式用户列表数据
 * @param num [string] 生成数量
 * @param defObj [object] 模板默认值
 */
export function createPhone(phonePre = "135") {
  const reg = new RegExp(`\\d{${11 - phonePre.length}}`);
  return phonePre + Mock.mock(reg);
}

/**
 * 生成公司列表数据
 * @param num [string] 生成总数数量
 * @param idStart id开始值
 */
export function createCompanyList(num = 100, idStart = 1) {
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        fullName(res: CommonObj) {
          return `${Random.ctitle(3, 8)}公司`;
        },
        //简称
        shortName(res: CommonObj) {
          const { fullName } = res.context.currentContext;
          return Random.cword(fullName, 1, 5);
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}

/**
 * 生成常用字段
 * @param fields string[字段名][指定值] 示例：[["phone"],["name"]]
 * @param
 */
export function createTestFields(num = 199) {
  const mockData = Mock.mock({
    [`list|${num}`]: [
      getMockCfg({
        id: null,
        // enum: { name: "EnableStatus", prop: "status" },
        enum: [
          { name: "EnableStatus", prop: "status" },
          { name: "Gender", prop: "gender" },
        ],
        phone: null,
        cascader: null,
        remark: null,
        integer: null,
        earlyDate: null,
        createUpdateTime: null,
        custom: null,
      }),
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}
