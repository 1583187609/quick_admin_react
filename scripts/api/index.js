import createEolinkApis from "./eolink/index.js";
import createYapiApis from "./yapi/index.js";
// import defaultOpts from "./eolink/consts.js";
createEolinkApis({
  name: "问诊", //工程名称
  lang: "ts",
  outPath: "scripts/api/eolink/apis", //出口文件夹，示例："scripts/file"
  httpPath: "@/services/http", //引入http文件的path
  urls: {
    base: "https://apis.eolink.com/old",
    group: "/api/apiManagementPro/ApiGroup/getApiGroupData",
    list: "/api/apiManagementPro/Api/getApiListByCondition",
    detail: "/api/apiManagementPro/Api/getApi",
  },
  spaceKey: "yuanxinkeji",
  projectHashKey: "FXEqJ1W359b3e094c98c2b2601ec091e8477eee361c5e3d",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnQiOjAsImV4cCI6MTY4MDA2MTg5ODA1OCwidXNlcklkIjoiNTU4ODgwIn0.4lrsB2idhJXa16OniM62PVPOlhN4BfnSQTNk2dL2sqU",
  // 数组元素也可以是string或number类型，例：groupIds: [1984440, "1984441"]
  // groupIds: [
  //   { id: 1984440, title: "IM【医生端】" },
  //   // { id: 1984441, title: "IM【患者端】" },
  //   // { id: 1978548, title: "医端" },
  // ],
});

// createYapiApis({
//   name: "问诊", //工程名称
//   lang: "ts",
//   outPath: "scripts/api/yapi/apis", //出口文件夹，示例："scripts/file"
//   httpPath: "@/services/http", //引入http文件的path
//   urls: {
//     base: "https://yapi.beijingyuanxin.com",
//     group: "/api/interface/list_menu",
//     list: "/api/interface/list_cat", //https://yapi.beijingyuanxin.com/api/interface/list_cat?page=1&limit=20&catid=6528
//     detail: "/api/interface/get",
//   },
//   projectId: 468,
//   token: "e99a0e35cc38aaeb19b082f7d67a8185a91e64303f6c438ba61e10c436e8edae",
//   //数组元素也可以是string或number类型：例如： groupIds: [6846, "6816"]
//   groupIds: [
//     { id: 6846, title: "问诊单【医生端】" },
//     { id: 6816, title: "IM【患者端】" },
//   ],
// });
