export const defaultOpts = {
  name: "问诊", //工程名称
  lang: "ts",
  outPath: "scripts/api/yapi/apis", //出口文件夹，示例："scripts/file"
  httpPath: "@/services/http", //引入http文件的path
  urls: {
    base: "https://yapi.beijingyuanxin.com",
    group: "/api/interface/list_menu",
    list: "/api/interface/list_cat", //https://yapi.beijingyuanxin.com/api/interface/list_cat?page=1&limit=20&catid=6528
    detail: "/api/interface/get",
  },
  projectId: 468,
  token: "e99a0e35cc38aaeb19b082f7d67a8185a91e64303f6c438ba61e10c436e8edae",
  //数组元素也可以是string或number类型：例如： groupIds: [6846, "6816"]
  // groupIds: [
  //   { id: 6846, title: "问诊单【医生端】" },
  //   { id: 6816, title: "IM【患者端】" },
  // ],
};
