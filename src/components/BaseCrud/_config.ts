import { BtnName } from "@/components/BaseBtn";
import { ReqMap, ResMap } from "./_types";

export const defaultReqMap: ReqMap = {
  curr_page: "curr_page",
  page_size: "page_size",
};
export const defaultResMap: ResMap = {
  curr_page: "curr_page",
  page_size: "page_size",
  total_num: "total_num",
  records: "records",
};
export const noPopconfirmBtns: BtnName[] = ["delete", "export"]; //有dialog提示又有ponconfirm提示，且不需要ponconfirm提示的按钮
export const batchBtns: BtnName[] = ["delete", "import", "export"]; //能够批量操作的按钮
