import { CommonObj } from "@/vite-env";
import { ExportFieldItem } from "./_components/ExtraBtns";

export interface ExportBtnParams {
  ids: React.Key[];
  params: CommonObj;
  fields: ExportFieldItem[];
}
export interface FormAttrs {
  initialValues?: CommonObj;
  [key: string]: any;
}
export interface TableAttrs {
  rowKey?: React.Key;
  [key: string]: any;
}

//请求参数的键名映射
export interface ReqMap {
  curr_page?: string;
  page_size?: string;
}
//响应参数的键名映射
export interface ResMap {
  curr_page?: string;
  page_size?: string;
  total_num?: string;
  records?: string;
}
