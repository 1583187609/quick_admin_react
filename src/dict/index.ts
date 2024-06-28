import { GetMockCommonList } from "@/api-mock";
import { CommonObj } from "@/vite-env";

export { default as colors } from "./colors";
export * from "./cascader";
export * from "./_types";

/**
 * 字典映射集合
 */

export default {
  //身份认证情况：1=未认证,2=学历;3=公司,4=双认证
  AuthCase: {
    "1": {
      text: "未认证",
      attrs: {
        type: "info",
      },
    },
    "2": {
      text: "学历认证",
      attrs: {
        color: "#06D4E0",
        style: {
          color: "#fff",
        },
      },
    },
    "3": {
      text: "公司认证",
      attrs: {
        color: "#1368F9",
        style: {
          color: "#fff",
        },
      },
    },
    "4": {
      text: "双认证",
      attrs: {
        type: "success",
      },
    },
  },
  //学历类型: 0未知 1大专 2本科 3研究生 4博士
  EducationType: {
    0: {
      text: "未知",
      attrs: {
        type: "info",
      },
    },
    1: {
      text: "专科",
      attrs: {
        type: "info",
      },
    },
    2: {
      text: "本科",
      attrs: {
        type: "primary",
      },
    },
    3: {
      text: "硕士",
      attrs: {
        type: "warning",
      },
    },
    4: {
      text: "博士",
      attrs: {
        type: "success",
      },
    },
  },
  //启用状态
  EnableStatus: {
    0: {
      text: "禁用",
      attrs: {
        type: "info",
      },
    },
    1: {
      text: "启用",
      attrs: {
        type: "primary",
      },
    },
  },
  //领取奖励方式：0手动 1自动
  GetRewardWay: {
    0: {
      text: "手动",
      attrs: {
        type: "info",
      },
    },
    1: {
      text: "自动",
      attrs: {
        type: "primary",
      },
    },
  },
  // 任务奖励类型: 1 金币， 2 心动嘉宾
  TaskRewards: {
    1: {
      text: "金币",
      attrs: {
        type: "warning",
      },
    },
    2: {
      text: "心动嘉宾",
      attrs: {
        type: "danger",
      },
    },
  },
  //菜单类型
  MenuType: {
    0: {
      text: "目录",
      attrs: {
        type: "primary",
      },
    },
    1: {
      text: "菜单",
      attrs: {
        type: "primary",
      },
    },
    2: {
      text: "按钮",
      attrs: {
        type: "primary",
      },
    },
    // 3: {
    //   text: "外链",
    //   attrs: {
    //     type: "primary",
    //   },
    // },
  },
  //性别：0未知 1男 2女
  Gender: {
    0: {
      text: "未知",
      attrs: {
        type: "primary",
      },
    },
    1: {
      text: "男",
      attrs: {
        type: "primary",
      },
    },
    2: {
      text: "女",
      attrs: {
        type: "primary",
      },
    },
  },
  //角色类型
  RoleType: {
    0: {
      text: "超级管理员",
      attrs: {
        type: "primary",
      },
    },
    1: {
      text: "普通管理员",
      attrs: {
        type: "primary",
      },
    },
    2: {
      text: "特殊用户",
      attrs: {
        type: "primary",
      },
    },
    3: {
      text: "普通用户",
      attrs: {
        type: "primary",
      },
    },
    4: {
      text: "游客用户",
      attrs: {
        type: "primary",
      },
    },
    5: {
      text: "开发人员",
      attrs: {
        type: "primary",
      },
    },
  },
  // 是否状态类型
  YesNoStatus: {
    0: {
      text: "否",
      attrs: {
        type: "primary",
      },
    },
    1: {
      text: "是",
      attrs: {
        type: "primary",
      },
    },
  },
  // 测试用的请求下拉项
  TestFetchAsync: await GetMockCommonList().then((res: CommonObj) => {
    const obj: CommonObj = {};
    Array(3)
      .fill("")
      .forEach((item: string, ind: number) => {
        obj[ind] = {
          text: `请求下拉项${ind}`,
        };
      });
    return obj;
  }),
};
