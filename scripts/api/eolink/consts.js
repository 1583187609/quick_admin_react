//在尝试解析中
export const apiRequestParamTypeMap = {
  2: "object",
};
//参数类型
export const paramTypeMap = {
  undefined: "undefined",
  0: "string",
  1: "file",
  2: "",
  3: "integer",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "boolean",
  9: "",
  10: "",
  11: "",
  12: "array",
  13: "object",
  14: "number",
  15: "null",
};
//请求类型
export const requestTypeMap = {
  0: "post",
  1: "get",
  2: "put",
  3: "delete",
};
//注：urls.group与groupIds只可取其一，若两者都存在，则以groupIds为准
export const defaultOpts = {
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
};
