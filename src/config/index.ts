import { BaseComponentsConfig } from "./_types";
import { BaseCrudColItemAttrs } from "@/components/table";
import { getUserInfo, storage } from "@/utils";
import { CommonObj } from "@/vite-env";
export * from "./_types";

const isSmall = true;
const isProd = import.meta.env.MODE === "production";
// 首页地址（默认）

const config = {
  // homePath: "/home",
  mergeStrategy: "assign",
  popup: {
    defaultType: "dialog",
  },
  form: {
    emptyTime: "1000-01-01 00:00:00",
    defaultFormItemType: "input",
    // defaultDateShortcuts: [],
    // defaultDateRangeShortcuts: [],
    // defaultFieldAttrs: {},
    // defaultPopoverAttrs: {},
    // defaultValidTypes: {},
  },
  table: {
    // defaultGroupBtnsMaxNum: 3,
    customSpecialCol: {
      //创建列
      create: {
        prop: ["adminName", "createdAt"],
        label: "创建时间",
        minWidth: 170,
      },
      //修改列
      update: {
        prop: ["adminName", "updatedAt"],
        label: "修改时间",
        minWidth: 170,
      },
      //switch开关
      switch: {
        prop: "status",
        label: "启用状态",
        minWidth: 90,
        attrs: {
          activeValue: 0,
          inactiveValue: 1,
          activeText: "启用",
          inactiveText: "禁用",
          inlinePrompt: true,
          // onChange() {
          //   ElMessage.warning("暂未处理【启用/禁用】事件");
          // },
        },
      },
      //是否启用 状态
      BaseTag: {
        prop: "status",
        label: "状态",
        minWidth: 100,
        attrs: { name: "EnableStatus" },
      },
      //图片
      BaseImg: {
        prop: "imgUrl",
        label: "图片",
        minWidth: 146,
        attrs: { size: "120" },
      },
      //文本复制
      // BaseCopy: {},
      //用户信息
      UserInfo: {
        prop: "userData",
        label: "用户信息",
        // minWidth: 280, // 450/280
        fixed: "left",
        getAttrs(col: BaseCrudColItemAttrs) {
          return {
            width: col?.attrs?.simple ? 232 : 450,
          };
        },
      },
    },
  },
  BaseCrud: {
    Index: {
      // immediate: true,
      // changeFetch: true,
      // batchBtn: false,
      // log: false,
      // isOmit: true,
      // inputDebounce: true,
      // exportLimit: 10000,
      // pagination: () => ({ currPage: 1, pageSize: 20 }),
      // reqMap: () => ({
      //   curr_page: "page",
      //   page_size: "pageSize",
      // }),
      // resMap: () => ({
      //   curr_page: "currentPage",
      //   page_size: "pageSize",
      //   total_num: "total",
      //   has_more: "hasMore",
      //   records: "list",
      // }),
      filterByAuth: (auth: number[]) => auth.includes(getUserInfo()?.type),
      // filterByAuth: (auth: number[]) => true,
      //跟下面的size  small 搭配使用
      // colSpanAttrs: () => ({
      //   xs: 12,
      //   sm: 12,
      //   md: 8,
      //   lg: 4,
      //   xl: 3,
      // }),
      // size: isSmall ? "small" : undefined,
      // compact: (_props: CommonObj) => _props.colSpanAttrs.xl < 6,
    },
    // _components: {
    //   ExtraBtns: undefined,
    //   BatchBtns: undefined,
    //   GroupBtns: undefined,
    //   Pagination: undefined,
    //   QueryForm: undefined,
    //   Column: undefined,
    //   QueryTable: undefined,
    //   SetPrint: undefined,
    //   SetTable: undefined,
    // },
  },
  BaseBtn: {
    btnsMap: {
      //auth 权限说明 0超级管理员 1普通管理员 2特殊用户 3普通用户 4游客用户 5开发者
      add: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      edit: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      delete: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      pass: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      reject: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      repeal: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      import: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      export: { auth: [] },
      upload: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      download: { auth: [] },
      enable: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      forbid: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      audit: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      view: { auth: undefined },
      submit: { auth: null },
      reset: { auth: [0, 5] },
      log: { auth: null },
      // empty: { auth: null },
    },
  },
  BaseUpload: {
    // size: 100,
    // fit: "cover",
    // showFileList: false,
    // showTips: true,
    // accept: "image/png,image/jpg,image/jpeg",
    // limitSize: 1024 * 1024 * 10, //10M
    headers: () => ({ "X-Token": storage.getItem("token") }),
    action: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
    handleSuccessResponse: (res: CommonObj, upFile: CommonObj) => {
      return new Promise((resolve, reject) => {
        const { code, message, data } = res;
        if (code === 2000) {
          resolve(data.fullUrl);
        } else {
          reject(message);
        }
      });
    },
  },
  // regexp: {},
} as BaseComponentsConfig;
export default config;
