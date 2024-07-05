import { GetMockCommonList } from "@/api-mock";
import { CommonObj } from "@/vite-env";

export default {
  // 身份认证情况：1=未认证,2=学历;3=公司,4=双认证
  AuthCase: {
    "1": {
      text: "未认证",
      attrs: {
        color: "default",
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
        color: "success",
      },
    },
  },
  // 学历类型: 0未知 1大专 2本科 3研究生 4博士
  EducationType: {
    0: {
      text: "未知",
      attrs: {
        color: "default",
      },
    },
    1: {
      text: "专科",
      attrs: {
        color: "default",
      },
    },
    2: {
      text: "本科",
      attrs: {
        color: "processing",
      },
    },
    3: {
      text: "硕士",
      attrs: {
        color: "warning",
      },
    },
    4: {
      text: "博士",
      attrs: {
        color: "success",
      },
    },
  },
  //领取奖励方式：0手动 1自动
  GetRewardWay: {
    0: {
      text: "手动",
      attrs: {
        color: "default",
      },
    },
    1: {
      text: "自动",
      attrs: {
        color: "processing",
      },
    },
  },
  // 任务奖励类型: 1 金币， 2 心动嘉宾
  TaskRewards: {
    1: {
      text: "金币",
      attrs: {
        color: "warning",
      },
    },
    2: {
      text: "心动嘉宾",
      attrs: {
        color: "error",
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
