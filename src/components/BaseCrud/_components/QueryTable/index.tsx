/**
 * 文件说明-模板文件
 */
import React, { useMemo, useRef, useImperativeHandle, forwardRef, useContext, CSSProperties } from "react";
import { Table } from "antd";
import OperateBtns from "../OperateBtns";
import { BtnName, BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { btnsMap } from "@/components/BaseBtn";
import { emptyVals, showMessage } from "@/utils";
import { ClosePopupType, PopupContext } from "@/components/provider/PopupProvider";
import { TableCol, TableColAttrs, RowKeyType, StandardTableColAttrs } from "@/components/table/_types";
import { defaultColumnAttrs, defaultTableAttrs, defaultPagination } from "@/components/table/_config";
import { specialColMap } from "@/components/table/_utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import s from "./index.module.less";

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
  /**
   * 以下是antd的属性
   */
  className?: string;
  style?: CSSProperties;
  bordered?: boolean;
  columns?: TableCol[];
  dataSource?: CommonObj[];
  rowKey?: RowKeyType;
  loading?: boolean;
  pagination?: PaginationAttrs;
  /**
   * 以下是新增的属性
   */
  sort?: boolean;
  index?: boolean;
  selection?: boolean;
  total?: number;
  operateBtns?: BaseBtnType[];
  filterBtnsByAuth: (btns: BtnItem[]) => BtnItem[];
  onPageChange?: (currPage: number, pageSize: number) => void;
  onPageSizeChange?: (currPage: number, pageSize: number) => void;
  onOperateBtn?: (name: BtnName, row: CommonObj, next: FinallyNext) => void;
  selectedRowKeys?: React.Key[];
  onSelectionChange?: (seledKeys: React.Key[], seledRows: CommonObj[]) => void;
  onSelectionSelect?: (record: CommonObj, selected: boolean, seledRows: CommonObj[]) => void;
  onSelectionSelectAll?: (selected: boolean, seledRows: CommonObj[], changeRows: CommonObj[]) => void;
  [key: string]: any;
}

export default forwardRef(
  (
    {
      className = "",
      columns = [],
      dataSource = [],
      rowKey = "id",
      loading,
      pagination,
      sort = false,
      index = false,
      selection = false,
      total = 0,
      operateBtns = [],
      filterBtnsByAuth,
      onPageChange,
      onPageSizeChange,
      onOperateBtn,
      selectedRowKeys,
      onSelectionChange,
      onSelectionSelect,
      onSelectionSelectAll,
      ...restProps
    }: Props,
    ref: any
  ) => {
    const tableRef = useRef(null);
    const { closePopup } = useContext(PopupContext);
    const tableAttrs = Object.assign({}, defaultTableAttrs, restProps);
    const newCols = useMemo(() => {
      columns = columns.filter(it => !!it);
      columns = columns.map((item: TableCol) => {
        const { name, type, ...rest } = item as TableColAttrs;
        let tempCols = {
          dataIndex: name,
          ...rest,
        };
        tempCols = Object.assign({}, type ? specialColMap[type] : undefined, defaultColumnAttrs, tempCols);
        return tempCols;
      });
      if (index) columns.unshift(specialColMap.index);
      if (sort) columns.unshift(specialColMap.sort);
      if (operateBtns?.length) {
        const col = Object.assign({ width: getOperateColWidth(operateBtns) }, specialColMap.operate, {
          render: (text: any, row: CommonObj, ind: number) => (
            <OperateBtns
              onClick={(name: BtnName) => handleOperateBtn(name, row, ind)}
              btns={getOperateBtnsOfRow({ ...row, ind })}
            />
          ),
        });
        columns.push(col as TableColAttrs);
      }
      return columns;
    }, [columns, index, sort]);
    const newRows = useMemo(() => {
      return dataSource.map((item: CommonObj, ind: number) => {
        for (let key in item) {
          if (emptyVals.includes(item[key])) item[key] = "-";
        }
        if (!item[rowKey]) item[rowKey] = ind;
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
          onSelectAll(isSeled: boolean, seledRows: CommonObj[], changeRows: CommonObj[]) {
            onSelectionSelectAll?.(isSeled, seledRows, changeRows);
          },
        }
      : undefined;
    useImperativeHandle(
      ref,
      () => {
        return { tableRef };
      },
      [tableRef]
    );
    //处理点击操作栏的按钮
    function handleOperateBtn(name: BtnName, row: CommonObj, ind: number) {
      const { text } = btnsMap[name] ?? {};
      if (onOperateBtn) {
        onOperateBtn(
          name,
          { ...row, $index: ind },
          (msg: string = `${text}成功!`, closeType?: ClosePopupType, cb?: () => void, isRefresh?: boolean) => {
            showMessage(msg);
            closePopup(closeType);
            cb?.();
          }
        );
      } else {
        showMessage(`暂未处理【${text}】按钮 - ${name}`, "error");
      }
    }
    //获取操作栏的宽度
    function getOperateColWidth(operateBtns: BaseBtnType[]) {
      const widths = [100, 180, 250];
      const ind = (operateBtns.length > 3 ? 3 : operateBtns.length) - 1;
      return widths[ind];
    }
    function getOperateBtnsOfRow(row: CommonObj) {
      const tempBtns = operateBtns.map((btn: BaseBtnType) => getBtnObj(btn, undefined, row));
      return filterBtnsByAuth(tempBtns);
    }
    return (
      <Table
        rowKey={rowKey}
        rowSelection={rowSelection}
        className={`${className} ${s["query-table"]}`}
        columns={newCols as StandardTableColAttrs[]}
        pagination={{
          ...Object.assign({}, defaultPagination, pagination),
          total,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange,
        }}
        dataSource={newRows}
        loading={loading && { tip: "玩命加载中……", size: "large" }}
        {...tableAttrs}
      />
    );
  }
);
