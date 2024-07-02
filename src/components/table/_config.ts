import { CommonObj } from "@/vite-env";
import { TablePaginationConfig } from "antd/lib/table/InternalTable";

export const defaultTableAttrs: CommonObj = {
  bordered: true,
};
export const defaultColumnAttrs: CommonObj = {
  align: "center",
};

export const defaultPagination: TablePaginationConfig = {
  size: "default", //small, default
  defaultPageSize: 20,
  defaultCurrent: 1,
  showSizeChanger: true,
  showTotal: (total: number, range: any) => `共 ${total} 条`,
  showQuickJumper: true, //是否可以快速跳转至某页
  pageSizeOptions: [10, 20, 30, 40, 50], //指定每页可以显示多少条
  // hideOnSinglePage: false, //只有一页时是否隐藏分页器
  // responsive: false, //当 size 未指定时，根据屏幕宽度自动调整尺寸
};
