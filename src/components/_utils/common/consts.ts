/********************************************************************/
/***************************** 系统常量 ******************************/
/********************************************************************/

import { getExportData } from "@/components/_utils";
import { ReqMap, ResMap } from "@/components/BaseCrud";
import { ColSpanAttrs } from "@/components/form";
import config from "@/config";

const { table, form, homePath, widgetSize } = config;

export const defaultHomePath = getExportData("/", homePath); //首页路径

export const defaultWidgetSize = getExportData("medium", widgetSize); //控件大小

export const defaultIconName = "ElemeFilled"; //默认图标

export const defaultGroupBtnsMaxNum = getExportData(3, table?.defaultGroupBtnsMaxNum);
export const defaultFormItemType = getExportData("input", form?.defaultFormItemType);
export const defaultReqMap: ReqMap = {
  curr_page: "curr_page",
  page_size: "page_size",
};
export const defaultResMap: ResMap = {
  curr_page: "curr_page",
  page_size: "page_size",
  total_num: "total_num",
  has_more: "has_more",
  records: "records",
};
export const defaultColSpanAttrs: ColSpanAttrs = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
};
export const popupCloseAnimationDuration = 300; // 弹出层dialog、drawer关闭时的动画持续时间，单位：毫秒
export const propsJoinChar = ","; //双props的连接符号
export const rangeJoinChar = "~"; //日期、数字范围区间的连接符号
export const emptyVals = ["", null, undefined]; //空值，凡遇此空值，则用“-”进行占位填充。看后期是否要考虑将 "undefined", "null" 这两个加入其中
export const emptyTime = getExportData("", config?.form?.emptyTime, "alert"); //本应该为空的默认时间（当出现此值时，说明此时间应该为空）
// export const isProd = import.meta.env.PROD; //是否是生产环境，此方式会有问题，故弃用
export const isProd = import.meta.env.MODE === "prod"; //是否是生产环境，因为import.meta.env.PROD在生产环境中不为true，所以暂时这样处理。本来应该是'production'，但是package.json中指定了 --mode prod
export const isDev = import.meta.env.MODE === "dev"; //是否是开发环境，本来应该是'development'，但是package.json中指定了 --mode dev
