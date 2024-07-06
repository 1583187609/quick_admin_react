import createEolinkApis from "./eolink/index.js";
createEolinkApis({
  lang: "ts",
  outPath: "src/apisya", //出口文件夹，示例："scripts/file"
  httpPath: "@/services/http", //引入http文件的path
  urls: {
    base: "https://apis.eolink.com",
    group: "/api/apiManagementPro/ApiGroup/getApiGroupData",
    list: "/api/apiManagementPro/Api/getApiListByCondition",
    detail: "/api/apiManagementPro/Api/getApi",
  },
  spaceKey: "flc-test",
  projectHashKey: "wejlzfKceefd6d629b89a3818c1b5f4d447d672cdbde39c",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnQiOjAsImV4cCI6MTcxMzE1ODYwMDM0MSwidXNlcklkIjoiNTU4ODgwIn0.G5c6uWdqVZAVwUJLSouCQz2Vf-kwFM-a3K63N4CIjI4",
  //   groupIds: [
  //     { id: 2353851, title: "bdms会员基础信息" },
  //     // { id: 1984441, title: "IM【患者端】" },
  //     // { id: 1978548, title: "医端" },
  //   ],
});
