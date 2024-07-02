import { BaseDataType, CommonObj } from "@/vite-env";
import { GetRowKey } from "antd/es/table/interface";
import { SpecialColName } from "./_utils";
import { ColumnGroupType, ColumnType } from "antd/es/table";

export type RowKeyType = string | number | GetRowKey<CommonObj> | undefined;

export type StandardTableColAttrs = ColumnGroupType<CommonObj> | ColumnType<CommonObj>;
export interface TableColAttrs {
  /**
   * 这是新增的属性
   */
  type?: SpecialColName;

  /**
   * 下面是antd提供的属性
   */
  key?: string;
  name?: string;
  title: string;
  width?: number;
  align?: string;
  fixed?: "left" | "right" | boolean;
  render?: (text: any, row: CommonObj, index: number) => any;
  [key: string]: any;
}

export type TableCol = BaseDataType | TableColAttrs;
