/// <reference types="vite/client" />

declare module "lodash";

declare var window: Window & typeof globalThis;
interface Window {
  log: () => void;
  error: () => void;
  dir: () => void;
}

type FetchType = (data?: CommonObj) => Promise<AxiosResponse<any, any>>;
type UniteFetchType = FetchType | ((params: CommonObj) => FetchType);
type SetTimeout = null | NodeJS.Timeout;
type SetInterval = null | NodeJS.SetInterval;
type TostMessageType = "success" | "error" | "info" | "warning" | "loading";
type FinallyNext = (
  hint?: string | MessageParams,
  closeType?: ClosePopupType,
  cb?: () => void,
  isRefreshList?: boolean = true //是否刷新列表
) => void;
type StrNum = string | number;
type BaseDataType = null | undefined | boolean | string | number; //基础数据类型
interface CommonObj {
  [key: string]: any;
}
type CommonSize = "large" | "default" | "small"; //按钮、表单、表格等的通用大小
type ShowCodes = 0 | 1; //0 false  1 true
interface OptionItem {
  value: string | number | boolean;
  label?: string;
  disabled?: boolean;
  customOption?: RenderComponent;
  children?: OptionItem[];
}

// // el-tab-pane 的 props 属性
// interface TabItem {
//   label: string;
//   name: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
// }

// 以下是测试部分，待验证
// interface ComplexObject {
//   mandatory: string;
//   option1?: number;
//   option2?: boolean;
// }

// type GetRequired<T> = {
//   [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
// };

// type GetOptional<T> = {
//   [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
// };

// type GetAllKeys<T> = {
//   [P in keyof T]: T[P];
// };

// let keys: GetOptional<ComplexObject>;

//其他参考
// type BtnAllNames = keyof typeof btnsMap;
// type BtnAllNames = keyof InstanceType<typeof btnsMap>;
// function handler<T extends object, K extends keyof T>(obj: T, propName: K) {}

interface User {
  address: string;
  name: string;
  age: number;
}
//可选参数
export type GetPartial<T> = {
  [P in keyof T]?: T[P];
};
//必选参数
export type GetRequired<T> = {
  [P in keyof T]-?: T[P];
};
//提取部分属性
export type GetPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
//排除部分属性(排除type中的，即联合类型中的)
export type GetExclude<T, K> = T extends K ? never : T;

// 排除部分属性(排除interface中的，即接口类型中的)
export type GetOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

//使用示例
type PartialUser = GetPartial<User>;
type RequiredUser = GetRequired<User>;
type PickUser = GetPick<User, "age" | "name">;
type ExcludeUser = GetExclude<"a" | "b" | "c", "a" | "c">;
type OmitUser = GetOmit<User, "age">;
