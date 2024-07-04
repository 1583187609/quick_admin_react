import { BaseDataType, CommonObj, GetPartial } from "@/vite-env";
import { GetRowKey } from "antd/es/table/interface";
import { specialColMap } from "./_utils";
import { ColumnGroupType, ColumnType } from "antd/es/table";

export type SpecialColKeys = "index" | "sort" | "operate";
export type SpecialColName = keyof typeof specialColMap;

// 系统内置列： 图片、文本、复制、创建时间、更新时间、备注
export type InnerColName = "BaseImg" | "BaseText" | "BaseCopy" | "BaseTag" | "create" | "update" | "remark" | "id" | "switch";
// 外部扩展列：用户信息
export type OutterColName = "UserInfo";

export type RowKeyType = string | number | GetRowKey<CommonObj> | undefined;

export type StandardTableColAttrs = ColumnGroupType<CommonObj> | ColumnType<CommonObj>;
export interface TableColAttrs {
  /**
   * 这是新增的属性
   */
  type?: SpecialColName | InnerColName | OutterColName;

  /**
   * 下面是antd提供的属性
   */
  key?: string;
  dataIndex?: string | [string, string];
  title: string;
  width?: number;
  align?: string;
  fixed?: "left" | "right" | boolean;
  render?: (text: any, row: CommonObj, index: number) => any;
  [key: string]: any;
}

export type TableCol = BaseDataType | TableColAttrs;
