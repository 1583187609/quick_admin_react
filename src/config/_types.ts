import { PopupType } from "@/components/provider/PopupProvider";
import { FormItemType } from "@/components/BaseFormItem";
import { CommonObj, StrNum } from "@/vite-env";

//配置合并的策略
export type ConfigMergeStrategy = false | "merge" | "assign" | "alert" | "auto";

//基础组件的配置
export interface BaseComponentsConfig {
  widgetSize?: "large" | "medium" | "small" | "mini"; //控件大小
  homePath?: string; //首页地址
  /**
   * 对于系统内置的对象数据，采用的合并方式
   * false：不进行合并；
   * merge：lodash的方法进行合并，深度合并；
   * assign：JS原生的Object.assign合并，浅合并；
   * alert：有自定义值就完全采用，没用自定义值就采用系统默认；
   * auto：自动采用合并类型
   */
  mergeStrategy?: ConfigMergeStrategy;
  // 弹窗配置 BasicDialog 和 BasicDrawer
  popup?: {
    defaultType?: PopupType; //默认弹窗类型。可选值：drawer, dialog
  };
  // 表单配置
  form?: {
    emptyTime?: StrNum; //本应该为空的默认时间（当出现此值时，说明此时间应等同为空字符串）,
    defaultFormItemType?: FormItemType; //默认的表单项的类型
    defaultDateShortcuts?: { text: string; value: Date | (() => Date) }[];
    defaultDateRangeShortcuts?: { text: string; value: Date | (() => Date) }[];
    defaultFieldAttrs?: CommonObj;
    defaultPopoverAttrs?: CommonObj;
    defaultValidTypes?: CommonObj;
    // specialColMap?:
    //   | CommonObj
    //   | ((currPage: StrNum, pageSize: StrNum) => CommonObj);
  };
  table?: {
    defaultGroupBtnsMaxNum?: number; //操作列的按钮最多显示几个
    customSpecialCol?: CommonObj; //自定义的特殊列
  };
  //BaseCrud组件的属性
  BaseCrud?: {
    Index?: CommonObj; //BaseCrudProps
    _components?: {
      ExtraBtns?: CommonObj;
      BatchBtns?: CommonObj;
      GroupBtns?: CommonObj;
      Pagination?: CommonObj;
      QueryForm?: CommonObj;
      Column?: CommonObj;
      QueryTable?: CommonObj;
      SetPrint?: CommonObj;
      SetTable?: CommonObj;
    };
  };
  BaseBtn?: {
    btnsMap?: CommonObj;
  };
  BaseUpload?: CommonObj;
  //正则表达式
  regexp?: {
    [key: string]: string;
  };
}
