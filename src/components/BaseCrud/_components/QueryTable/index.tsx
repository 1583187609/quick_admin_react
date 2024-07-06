/**
 * 文件说明-模板文件
 */
import React, { useRef, useImperativeHandle, forwardRef, useContext, CSSProperties, ReactNode } from "react";
import { Table } from "antd";
import OperateBtns, { DefaultBaseBtnAttrs, btnGapMap, defaultBaseBtnAttrs } from "../OperateBtns";
import { BtnName, BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { btnsMap } from "@/components/BaseBtn";
import { emptyVals, getChinaCharLength, isDev, propsJoinChar, showMessage } from "@/components/_utils";
import { ClosePopupType, PopupContext } from "@/components/provider/PopupProvider";
import { TableCol, TableColAttrs, RowKeyType, StandardTableColAttrs, SpecialColKeys } from "@/components/table/_types";
import { defaultColumnAttrs, defaultTableAttrs, defaultPagination } from "@/components/table/_config";
import { specialColMap } from "@/components/table/_utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import s from "./index.module.less";
import BaseQuestionPopover from "@/components/BaseQuestionPopover";

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
  rowKey?: string;
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
  operateBtnsAttrs?: DefaultBaseBtnAttrs;
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

const cellPadding = 8;
let opeColWidth = 0; // 操作栏的宽度

// 该列是否已联调
const getIsHandle = (prop: string, rows: CommonObj[]) => {
  if (!isDev) return true; // 只允许开发环境下，存在未联调的状态，然后进行表格头部标红处理
  if (!rows?.length || prop.startsWith("$")) return true;
  const row = rows[0];
  if (!prop.includes(propsJoinChar)) return row[prop] !== undefined;
  return prop.split(propsJoinChar).some((key: string) => row[key] !== undefined);
};
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
      operateBtnsAttrs,
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
    let rowSelection: undefined | CommonObj;
    const dateKeysArr: [string, string][] = [];
    const tableRef = useRef(null);
    const { closePopup } = useContext(PopupContext);
    const tableAttrs = Object.assign({}, defaultTableAttrs, restProps);
    const colKeys: string[] = [];
    const opeBtnsAttrs = Object.assign({}, operateBtnsAttrs, defaultBaseBtnAttrs);
    const rowsBtns: BtnItem[][] = dataSource.map((row: CommonObj, ind: number) => getOperateBtnsOfRow(row, ind));
    const newCols = getNewCols(opeColWidth);
    function getNewCols(width: number) {
      let cols = columns.filter(it => !!it) as TableColAttrs[];
      cols = cols.map((item: TableColAttrs) => {
        const { type, title, otherAttrs, ...restCol } = item;
        let newTitle: ReactNode = title;
        const specialCol = type ? specialColMap[type as SpecialColKeys] ?? undefined : undefined;
        const hasRender = !!(item.render || specialCol?.render);
        let dataKey = restCol.dataIndex ?? (specialCol?.dataIndex as string);
        if (Array.isArray(dataKey)) {
          dateKeysArr.push(dataKey);
          dataKey = dataKey.join(propsJoinChar);
        }
        colKeys.push(dataKey as string);
        const col = Object.assign(
          typeof title === "string" ? { width: title.includes("时间") ? 160 : 100 } : {},
          defaultColumnAttrs,
          specialCol,
          restCol,
          { dataIndex: dataKey },
          hasRender ? undefined : { render: (text: any) => (emptyVals.includes(text) ? "-" : text) }
        );
        const isHandle = getIsHandle(dataKey, dataSource);
        if (otherAttrs?.popover) {
          newTitle = (
            <>
              {title}
              <BaseQuestionPopover type={isHandle ? undefined : "danger"} content={otherAttrs.popover} />
            </>
          );
        }
        if (!isHandle) newTitle = <div className="color-danger">{newTitle}</div>;
        col.title = newTitle;
        return col;
      });
      if (index) cols.unshift(specialColMap.index);
      if (sort) cols.unshift(specialColMap.sort);
      if (operateBtns?.length) {
        const col = Object.assign({ width }, specialColMap.operate, {
          render: (text: any, row: CommonObj, ind: number) => (
            <OperateBtns onClick={(name: BtnName) => handleOperateBtn(name, row, ind)} btns={rowsBtns[ind]} />
          ),
        });
        cols.push(col as TableColAttrs);
      }
      return cols;
    }
    const newRows = dataSource.map((item: CommonObj, ind: number) => {
      if (!item[rowKey]) item[rowKey] = ind;
      dateKeysArr.forEach((arr: [string, string]) => {
        item[arr.join(propsJoinChar)] = [item[arr[0]], item[arr[1]]];
        delete item[arr[0]];
        delete item[arr[1]];
      });
      return item;
    });
    if (selection) {
      rowSelection = {
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
      };
    }
    useImperativeHandle(ref, () => ({ tableRef }), [tableRef]);
    // 处理点击操作栏的按钮
    function handleOperateBtn(name: BtnName, row: CommonObj, ind: number) {
      const { text } = btnsMap[name] ?? {};
      if (!onOperateBtn) return showMessage(`暂未处理【${text}】按钮 - ${name}`, "error");
      onOperateBtn(
        name,
        { ...row, $index: ind },
        (msg: string = `${text}成功!`, closeType?: ClosePopupType, cb?: () => void, isRefresh?: boolean) => {
          showMessage(msg);
          closePopup(closeType);
          cb?.();
        }
      );
    }
    // 获取每一行的分组按钮
    function getOperateBtnsOfRow(row: CommonObj, ind: number) {
      const tempBtns = operateBtns.map((btn: BaseBtnType) => getBtnObj(btn, undefined, row));
      const filterBtns = filterBtnsByAuth(tempBtns);
      const width = getOperateColWidth(filterBtns);
      if (ind < dataSource.length - 1) {
        if (opeColWidth < width) opeColWidth = width;
      } else {
        if (opeColWidth < 30) opeColWidth = getOperateColWidth(); //如果操作栏没有按钮，则按照最小宽度展示操作栏，例如新增按钮
      }
      return filterBtns;
    }
    // 获取操作栏的宽度
    function getOperateColWidth(btns?: BtnItem[]) {
      const { maxNum, size } = opeBtnsAttrs;
      const { fontSize, btnPadding, btnMargin, iconMarginRight } = btnGapMap[size as string];
      //最小宽度
      if (!btns) return 3 * fontSize + 1 * btnPadding * 2 + cellPadding * 2;
      let em = 0; //按钮文字字符数量
      let width = 0;
      if (btns.length > maxNum) {
        btns = btns.slice(0, maxNum - 1).concat([{ text: "更多" } as BtnItem]);
      }
      // if (vertical) {
      //   btns.forEach((item: BtnItem) => {
      //     em = getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
      //     const currWidth = em * fontSize + btnPadding * 2 + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
      //     if (currWidth > width)  width = currWidth;
      //   });
      // } else {
      btns.forEach((item: BtnItem) => {
        em += getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
      });
      width = em * fontSize + btns.length * btnPadding * 2 + (btns.length - 1) * btnMargin + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
      // }
      return width;
    }
    return (
      <Table
        className={`${className} ${s["query-table"]}`}
        rowKey={rowKey as RowKeyType}
        rowSelection={rowSelection}
        columns={newCols as StandardTableColAttrs[]}
        scroll={{ x: 1, y: 1 }} //加上这个属性，表格头便能够被固定了
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
