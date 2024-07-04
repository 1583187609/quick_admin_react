/**
 * 文件说明-模板文件
 */

import React, { useContext, useEffect, useRef, useState, useImperativeHandle, forwardRef, CSSProperties } from "react";
import { FormItem, FormItemAttrs, FormItemType } from "@/components/BaseFormItem";
import QueryForm from "./_components/QueryForm";
import QueryTable from "./_components/QueryTable";
import ExtraBtns from "./_components/ExtraBtns";
import { BaseBtnType, BtnItem, BtnName, btnsMap, getBtnObj } from "@/components/BaseBtn";
import { Modal } from "antd";
import { ClosePopupType, PopupContext } from "@/components/provider/PopupProvider";
import ImportModal from "./_components/ImportModal";
import { merge } from "lodash";
import { getUserInfo, omitAttrs, printLog, showMessage } from "@/utils";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import { ExportBtnParams, FormAttrs, TableAttrs, ReqMap, ResMap } from "./_types";
import { TableCol, TableColAttrs } from "@/components/table/_types";
import { batchBtns, defaultReqMap, defaultResMap, noPopconfirmBtns } from "./_config";
import { getBtnModalTips } from "./_utils";
import s from "./index.module.less";

export * from "./_types";

interface Props {
  className?: string;
  style?: CSSProperties;
  formAttrs?: FormAttrs;
  tableAttrs?: TableAttrs;
  fields?: FormItem[];
  columns?: TableCol[];
  extraBtns?: BaseBtnType[];
  operateBtns?: BaseBtnType[];
  onExtraBtn?: (name: BtnName, exportBtnParams: ExportBtnParams, next: FinallyNext) => void;
  onOperateBtn?: (name: BtnName, row: CommonObj, next: FinallyNext) => void;
  children?: any;
  sort?: boolean;
  index?: boolean;
  selection?: boolean;
  exportMax?: number; //单次最大导出数量
  fetch?: FetchType; //请求方法
  isOmit?: boolean | any[]; //发送请求时，是否过滤掉undefined的字段
  log?: boolean; //是否打印请求数据
  immediateFetch?: boolean; //是否立即请求
  changeFetch?: boolean; //是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
  extraParams?: CommonObj; //额外的参数
  reqMap?: ReqMap; //响应参数的键名映射
  resMap?: ResMap; //是否展示序号列
  filterByAuth?: (auth: number[]) => boolean;
}

let allColumns: TableColAttrs[] = [];

export default forwardRef(
  (
    {
      className = "",
      fields = [],
      columns = [],
      formAttrs,
      tableAttrs,
      fetch,
      isOmit = true,
      immediateFetch = true,
      changeFetch = true,
      extraBtns = [],
      operateBtns = [],
      onExtraBtn,
      onOperateBtn,
      extraParams,
      exportMax = 20000,
      sort,
      index,
      selection,
      reqMap = {},
      resMap = {},
      log = true,
      children,
      filterByAuth = (auth: number[]) => auth.includes(getUserInfo().type),
    }: Props,
    ref: any
  ) => {
    const formRef = useRef(null);
    const tableRef = useRef(null);
    const totalRef = useRef(0);
    const params = useRef<CommonObj>({});
    const { openPopup, closePopup } = useContext(PopupContext);
    const [seledKeys, setSeledKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<CommonObj[]>([]);
    Object.assign(reqMap, defaultReqMap);
    Object.assign(resMap, defaultResMap);
    //初始化分页信息
    const initPage = {
      [`${reqMap.curr_page}`]: 1,
      [`${reqMap.page_size}`]: 20,
    };
    const [newCols, setNewCols] = useState<TableColAttrs[]>(columns.slice() as TableColAttrs[]); // 浅克隆
    const newExtraBtns = extraBtns.map(item => {
      const btn: BtnItem = getBtnObj(item);
      if (noPopconfirmBtns.includes(btn.name)) {
        btn.popconfirm = false;
      }
      if (batchBtns.includes(btn.name)) {
        btn!.attrs!.disabled = !seledKeys.length;
      }
      return btn;
    });
    // allColumns = columns.filter(it => !!it) as TableColAttrs[];
    allColumns = columns.slice() as TableColAttrs[];
    useImperativeHandle(
      ref,
      () => {
        return {
          formRef,
          tableRef,
          refresh(cb?: () => void) {
            getList(undefined, cb);
          },
        };
      },
      []
    );
    useEffect(() => {
      if (immediateFetch) initFetch();
    }, []);
    //初始化请求数据
    function initFetch() {
      params.current = merge({}, formAttrs?.initialValues, initPage, extraParams);
      getList();
    }
    //获取表格列表数据
    function getList(args: CommonObj = params.current, cb?: () => void) {
      setLoading(true);
      isOmit && (args = omitAttrs(args)); //剔除掉undefined, ''的属性值
      log && printLog(args, "req");
      fetch?.(args)
        .then((res: CommonObj) => {
          const list = res[resMap.records];
          log && printLog(JSON.parse(JSON.stringify(list)), "res");
          setRows(list);
          totalRef.current = res[resMap.total_num];
          cb?.();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    //处理点击额外按钮
    function handleExtraBtn(name: BtnName) {
      if (name === "import") {
        return openPopup({ title: "温馨提示", footer: null }, <ImportModal />, "modal");
      }
      //要传递的参数信息
      const argsInfo = {
        params: params.current,
        ids: seledKeys,
        fields: [],
      };
      //回调函数
      const callback = (
        msg: string = `${btnsMap[name].text}成功！`,
        closeType: ClosePopupType,
        cb?: () => void,
        isRefresh: boolean = true
      ) => {
        showMessage(msg);
        closePopup?.(closeType);
        isRefresh && getList(params.current);
        cb?.();
      };
      if (!noPopconfirmBtns.includes(name)) return onExtraBtn?.(name, argsInfo, callback);
      Modal.confirm({
        title: "温馨提示",
        content: getBtnModalTips(name, seledKeys.length, exportMax),
        onOk: () => onExtraBtn?.(name, argsInfo, callback),
      });
    }
    //处理表单中的值变化时
    function handleValuesChange(vals: CommonObj, allVals: CommonObj) {
      //因为 lodash 的 merge 不会用 undefined 覆盖其他值，故做此处理
      for (let key in vals) {
        if (vals[key] === undefined) vals[key] = "";
      }
      merge(params.current, vals, initPage);
      if (changeFetch) {
        const [key] = Object.entries(vals)[0];
        const target = fields.find(it => {
          if (!it) return false;
          return (it as FormItemAttrs).name === key;
        });
        if (!target) return;
        const { type } = target as FormItemAttrs;
        if (["Select"].includes(type as FormItemType)) {
          getList();
        }
      }
    }
    //点击提交（查询）按钮
    function handleSubmit(data: CommonObj, next: FinallyNext) {
      getList(data, next);
    }
    //当分页的currPage或pageSize改变时
    function handlePageChange(currPage: number, pageSize: number) {
      merge(params.current, {
        [`${reqMap.curr_page}`]: currPage,
        [`${reqMap.page_size}`]: pageSize,
      });
      getList();
    }
    //当多选框的选择改变时
    function handleSelectionChange(sKeys: React.Key[], sRows: CommonObj[]) {
      if (sKeys.length) return setSeledKeys(seledKeys.concat(sKeys));
      const currPage = params.current[reqMap.curr_page];
      const pageSize = params.current[reqMap.page_size];
      const sInd = (currPage - 1) * 20;
      const cloneSeledKeys = seledKeys.slice();
      cloneSeledKeys.splice(sInd, pageSize);
      setSeledKeys(cloneSeledKeys);
    }
    //根据权限对按钮进行过滤
    function filterBtnsByAuth(btns: BtnItem[]) {
      if (!filterByAuth) return btns;
      return btns.filter(({ auth }) => {
        return auth?.length ? filterByAuth(auth) : true;
      });
    }
    return (
      <div className={`${className} ${s["base-crud"]} auto-scroll-table f-1 f-fs-s-c`}>
        <QueryForm
          className="f-0"
          fields={fields}
          extraParams={extraParams}
          onValuesChange={handleValuesChange}
          onSubmit={handleSubmit}
          onReset={() => initFetch()}
          {...formAttrs}
          ref={formRef}
        />
        {!!children && <div className={`${s.children} f-0 mt-16`}>{children}</div>}
        <ExtraBtns
          className="f-0 mt-16"
          onClick={(name: BtnName) => handleExtraBtn(name)}
          allColumns={allColumns}
          columns={newCols}
          setColumns={setNewCols}
          btns={filterBtnsByAuth(newExtraBtns)}
          seledNum={seledKeys.length}
          total={totalRef.current}
          batchBtn={!!selection}
        />
        <QueryTable
          ref={tableRef}
          className="mt-8"
          columns={newCols}
          dataSource={rows}
          total={totalRef.current}
          sort={sort}
          index={index}
          selection={selection}
          operateBtns={operateBtns}
          filterBtnsByAuth={filterBtnsByAuth}
          onOperateBtn={onOperateBtn}
          onPageChange={handlePageChange}
          selectedRowKeys={seledKeys}
          onSelectionChange={handleSelectionChange}
          loading={loading}
          {...tableAttrs}
        />
      </div>
    );
  }
);
