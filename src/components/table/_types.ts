import { BaseDataType, CommonObj } from "@/vite-env";
import { GetRowKey } from "antd/es/table/interface";

export type RowKeyType = string | number | GetRowKey<CommonObj> | undefined;

export type ColumnType = "operate" | "index" | "selection" | "sort" | "";

export interface TableColAttrs {
  key?: string;
  name?: string;
  type?: ColumnType;
  title: string;
  width?: number;
  fixed?: "left" | "right" | boolean;
  render?: (text: any, row: CommonObj, index: number) => any;
}

export type TableCol = BaseDataType | TableColAttrs;
