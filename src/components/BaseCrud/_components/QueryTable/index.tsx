/**
 * 文件说明-模板文件
 */
import React, { useMemo, useRef, useImperativeHandle, forwardRef } from "react";
import { message, Table } from "antd";
import { merge } from "lodash";
import { MenuOutlined } from "@ant-design/icons";
import OperateBtns from "../OperateBtns";
import { BtnName, BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { btnsMap } from "@/components/BaseBtn";
import { TablePaginationConfig } from "antd/lib/table/InternalTable";
import s from "./index.module.less";

export type ColumnType = "operate" | "index" | "selection" | "sort" | "";
export interface RenderProps {
  item: CommonObj;
}
export interface ColItem {
  key?: string;
  name?: string;
  type?: ColumnType;
  title: string;
  width?: number;
  fixed?: "left" | "right" | boolean;
  render?: (text: any, row: CommonObj, index: number) => any;
}
export interface PaginationAttrs {
  defaultPageSize?: number;
  defaultCurrent?: number;
  size?: "default" | "small"; //small, default
  showSizeChanger?: boolean;
  showTotal?: (total: number, range: number) => string;
  showQuickJumper?: boolean; //是否可以快速跳转至某页
  pageSizeOptions?: (string | number)[]; //指定每页可以显示多少条
  hideOnSinglePage?: boolean; //只有一页时是否隐藏分页器
  responsive?: boolean; //当 size 未指定时，根据屏幕宽度自动调整尺寸
}
interface Props {
  className?: string;
  bordered?: boolean;
  columns?: ColItem[];
  dataSource?: CommonObj[];
  rowKey?: React.Key;
  loading?: boolean;
  selection?: boolean;
  index?: boolean;
  sort?: boolean;
  operateBtns?: BaseBtnType[];
  filterBtnsByAuth: (btns: BtnItem[]) => BtnItem[];
  pagination?: PaginationAttrs;
  total?: number;
  onPageChange?: (currPage: number, pageSize: number) => void;
  onPageSizeChange?: (currPage: number, pageSize: number) => void;
  onOperateBtn?: (
    name: BtnName,
    row: CommonObj,
    next: (msg?: string) => void
  ) => void;
  selectedRowKeys?: React.Key[];
  onSelectionChange?: (seledKeys: React.Key[], seledRows: CommonObj[]) => void;
  onSelectionSelect?: (
    record: CommonObj,
    selected: boolean,
    seledRows: CommonObj[]
  ) => void;
  onSelectionSelectAll?: (
    selected: boolean,
    seledRows: CommonObj[],
    changeRows: CommonObj[]
  ) => void;
}
const defaultCol = {
  align: "center",
};
const specialColMap: CommonObj = {
  //序号列
  index: {
    name: "index",
    title: "序号",
    width: 60,
    fixed: "left",
    align: defaultCol.align,
    render(text: any, row: CommonObj, ind: number) {
      return ind + 1;
    },
  },
  //排序列
  sort: {
    name: "sort",
    title: "排序",
    width: 60,
    fixed: "left",
    align: defaultCol.align,
    render(text: any, row: CommonObj, ind: number) {
      return <MenuOutlined style={{ touchAction: "none", cursor: "move" }} />;
    },
  },
  //多选列
  selection: {
    name: "selection",
    title: "选择",
    width: 50,
    fixed: "left",
    align: defaultCol.align,
  },
  //操作列
  operate: {
    name: "operate",
    title: "操作",
    // width: 260,
    fixed: "right",
    align: defaultCol.align,
  },
};
const defaultTableAttrs = {
  // rowKey :"id",
  // bordered :true,
};
const defaultPagination: TablePaginationConfig = {
  size: "default", //small, default
  defaultPageSize: 20,
  defaultCurrent: 1,
  showSizeChanger: true,
  showTotal: (total, range) => `共 ${total} 条`,
  showQuickJumper: true, //是否可以快速跳转至某页
  pageSizeOptions: [10, 20, 30, 40, 50], //指定每页可以显示多少条
  // hideOnSinglePage: false, //只有一页时是否隐藏分页器
  // responsive: false, //当 size 未指定时，根据屏幕宽度自动调整尺寸
};
export default forwardRef(
  (
    {
      className = "",
      columns = [],
      dataSource = [],
      rowKey = "id",
      bordered = true,
      sort = false,
      index = false,
      selection = false,
      loading,
      operateBtns = [],
      filterBtnsByAuth,
      pagination,
      total = 0,
      onPageChange,
      onPageSizeChange,
      onOperateBtn,
      selectedRowKeys,
      onSelectionChange,
      onSelectionSelect,
      onSelectionSelectAll,
    }: Props,
    ref: any
  ) => {
    const tableRef = useRef(null);
    const newCols = useMemo(() => {
      columns = columns.map((item: ColItem, ind: number) => {
        const { name, type = "", ...rest } = item;
        let tempCols = {
          dataIndex: name,
          ...rest,
        };
        tempCols = merge(specialColMap[type] || {}, defaultCol, tempCols);
        return tempCols;
      });
      if (index) {
        columns.unshift(specialColMap.index);
      }
      if (sort) {
        columns.unshift(specialColMap.sort);
      }
      if (operateBtns?.length) {
        columns.push(
          merge(
            { width: getOperateColWidth(operateBtns) },
            specialColMap.operate,
            {
              render: (text: any, row: CommonObj, ind: number) => {
                return (
                  <OperateBtns
                    onClick={(name: BtnName) =>
                      handleClickOperateBtn(name, row, ind)
                    }
                    btns={getOperateBtnsOfRow({ ...row, ind })}
                  />
                );
              },
            }
          )
        );
      }
      return columns;
    }, [columns, index, sort]);
    const newRows = useMemo(() => {
      return dataSource.map((item: CommonObj, ind: number) => {
        for (let key in item) {
          if (["", undefined, null].includes(item[key])) {
            item[key] = "-";
          }
        }
        if (!item[rowKey]) {
          item[rowKey] = ind;
        }
        return item;
      });
    }, [dataSource]);
    const rowSelection: any = selection
      ? {
          selectedRowKeys,
          onChange(seledKeys: string[], seledRows: CommonObj[]) {
            onSelectionChange?.(seledKeys, seledRows);
          },
          onSelect(row: CommonObj, isSeled: boolean, seledRows: CommonObj[]) {
            onSelectionSelect?.(row, isSeled, seledRows);
          },
          onSelectAll(
            isSeled: boolean,
            seledRows: CommonObj[],
            changeRows: CommonObj[]
          ) {
            onSelectionSelectAll?.(isSeled, seledRows, changeRows);
          },
        }
      : undefined;
    useImperativeHandle(ref, () => tableRef);
    //处理点击操作栏的按钮
    function handleClickOperateBtn(name: BtnName, row: CommonObj, ind: number) {
      if (onOperateBtn) {
        onOperateBtn(name, { ...row, $index: ind }, (msg?: string) => {
          message.success(
            msg === undefined ? `${btnsMap[name].text}成功!` : msg
          );
        });
      } else {
        const { name: btnName, text } = btnsMap[name] || {};
        message.error(`暂未处理【${text}】按钮 - ${btnName}`);
      }
    }
    //获取操作栏的宽度
    function getOperateColWidth(operateBtns: BaseBtnType[]) {
      const widths = [100, 180, 250];
      const ind = (operateBtns.length > 3 ? 3 : operateBtns.length) - 1;
      return widths[ind];
    }
    function getOperateBtnsOfRow(row: CommonObj) {
      const tempBtns = operateBtns.map((btn: BaseBtnType) =>
        getBtnObj(btn, undefined, row)
      );
      return filterBtnsByAuth(tempBtns);
    }
    return (
      <Table
        rowKey={rowKey}
        bordered={bordered}
        tableLayout="fixed"
        rowSelection={rowSelection}
        className={`${className} ${s["query-table"]}`}
        columns={newCols}
        size="middle"
        // scroll={{ x: "max-content", y: 1 }}
        scroll={{ x: 1, y: 1 }}
        pagination={{
          ...merge({}, defaultPagination, pagination),
          total,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange,
        }}
        dataSource={newRows}
        loading={loading && { tip: "玩命加载中……", size: "large" }}
      />
    );
  }
);
