/**
 * 文件说明-模板文件
 */

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FieldItem } from "@/components/BaseFormItem";
import QueryForm from "./_components/QueryForm";
import QueryTable, { ColItem } from "./_components/QueryTable";
import ExtraBtns, { ExportFieldItem } from "./_components/ExtraBtns";
import {
  BaseBtnType,
  BtnItem,
  BtnName,
  btnsMap,
  getBtnObj,
} from "@/components/BaseBtn";
import { message, Modal } from "antd";
import { PopupContext } from "@/components/provider/PopupProvider";
import ImportModal from "./_components/ImportModal";
import { merge } from "lodash";
import { getUserInfo, omitAttrs, printLog } from "@/utils";
import StrongText from "./_components/StrongText";
import s from "./index.module.less";
import { CommonObj, FetchType } from "@/vite-env";

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
interface Props {
  className?: string;
  formAttrs?: FormAttrs;
  tableAttrs?: TableAttrs;
  fields?: FieldItem[];
  columns?: ColItem[];
  extraBtns?: BaseBtnType[];
  operateBtns?: BaseBtnType[];
  onExtraBtn?: (
    name: BtnName,
    exportBtnParams: ExportBtnParams,
    next: (msg?: string) => void
  ) => void;
  onOperateBtn?: (
    name: BtnName,
    row: CommonObj,
    next: (msg?: string) => void
  ) => void;
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
//请求参数的键名映射
interface ReqMap {
  curr_page: string;
  page_size: string;
}
//响应参数的键名映射
interface ResMap {
  curr_page: string;
  page_size: string;
  total_num: string;
  records: string;
}
let allColumns = [];
const defaultReqMap: ReqMap = {
  curr_page: "curr_page",
  page_size: "page_size",
};
const defaultResMap: ResMap = {
  curr_page: "curr_page",
  page_size: "page_size",
  total_num: "total_num",
  records: "records",
};
const noPopconfirmBtns: BtnName[] = ["delete", "export"]; //有dialog提示又有ponconfirm提示，且不需要ponconfirm提示的按钮
//点击按钮后的弹出层提示内容
function getBtnModalTips(name: BtnName, num = 0, max: number) {
  const { text, attrs } = btnsMap[name];
  const type = attrs?.danger ? "danger" : "primary";
  let tips = (
    <div className="f-fs-b-w">
      确定<StrongText type={type}>{text}</StrongText>共
      <StrongText type={type}>{num}</StrongText> 条数据？
    </div>
  );
  if (name === "export" && num > max) {
    tips = (
      <div className="f-fs-b-w">
        单次导出数量不能超过 <StrongText type={type}>{max}</StrongText>
        条，请缩小查询范围！
      </div>
    );
  }
  return tips;
}
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
      sort = false,
      index = false,
      selection = false,
      children,
      reqMap = defaultReqMap,
      resMap = defaultResMap,
      log = true,
      filterByAuth = (auth: number[]) => auth.includes(getUserInfo().type),
    }: Props,
    ref: any
  ) => {
    const loadingRef = useRef(false);
    const formRef = useRef(null);
    const tableRef = useRef(null);
    const totalRef = useRef(0);
    const params = useRef<CommonObj>({});
    const { openPopup } = useContext(PopupContext);
    const [seledKeys, setSeledKeys] = useState<React.Key[]>([]);
    // const [seledRows, setSeledRows] = useState<CommonObj[]>([]);
    const [rows, setRows] = useState<CommonObj[]>([]);
    //初始化分页信息
    const initPage = {
      [`${reqMap.curr_page}`]: 1,
      [`${reqMap.page_size}`]: 20,
    };
    const [newCols, setNewCols] = useState(columns.slice()); //深克隆
    const newExtraBtns = extraBtns.map((item) => {
      const btn: BtnItem = getBtnObj(item);
      if (noPopconfirmBtns.includes(btn.name)) {
        btn.popconfirm = false;
      }
      if (["delete", "import", "export"].includes(btn.name)) {
        btn!.attrs!.disabled = !seledKeys.length;
      }
      return btn;
    });
    // const newOperateBtns = operateBtns.map((btn: BaseBtnType) =>
    //   getBtnObj(btn)
    // );
    allColumns = columns.slice();
    useImperativeHandle(ref, () => {
      return { formRef, tableRef, refresh: getList };
    });
    useEffect(() => {
      if (immediateFetch) {
        initFetch();
      }
    }, []);
    //初始化请求数据
    function initFetch() {
      params.current = merge(
        {},
        formAttrs?.initialValues,
        initPage,
        extraParams
      );
      getList();
    }
    //获取表格列表数据
    function getList(args: CommonObj = params.current, cb?: () => void) {
      loadingRef.current = true;
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
          loadingRef.current = false;
        });
    }
    //处理点击额外按钮
    function handleExtraBtn(name: BtnName) {
      if (name === "import") {
        openPopup(
          { title: "温馨提示", footer: null },
          <ImportModal />,
          "modal"
        );
      } else {
        //要传递的参数信息
        const argsInfo = {
          params: params.current,
          ids: seledKeys,
          fields: [],
        };
        //回调函数
        const callback = (msg?: string) => {
          message.success(
            msg === undefined ? `${btnsMap[name].text}成功！` : msg
          );
        };
        if (noPopconfirmBtns.includes(name)) {
          Modal.confirm({
            title: "温馨提示",
            content: getBtnModalTips(name, seledKeys.length, exportMax),
            onOk: () => onExtraBtn?.(name, argsInfo, callback),
          });
        } else {
          onExtraBtn?.(name, argsInfo, callback);
        }
      }
    }
    //处理表单中的值变化时
    function handleValuesChange(changedVals: CommonObj, allVals: CommonObj) {
      //因为 lodash 的 merge 不会用 undefined 覆盖其他值，故做此处理
      for (let key in changedVals) {
        if (changedVals[key] === undefined) {
          changedVals[key] = "";
        }
      }
      merge(params.current, changedVals, initPage);
      if (changeFetch) {
        const [key] = Object.entries(changedVals)[0];
        /**
         * name可能undefined，此时是自定义组件，type为 Custom；
         * type 可能为undefined，此时 type 为Input
         */
        const type = fields.find((it) => it.name === key)?.type;
        if (["Select"].includes(type as string)) {
          getList();
        }
      }
    }
    // function handleFieldsChange(changedVals: any, allVals: any) {
    //   console.log(changedVals, allVals, "handleFieldsChange-------");
    // }
    //点击提交（查询）按钮
    function handleSubmit(data: CommonObj, next: () => void) {
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
      if (sKeys.length) {
        setSeledKeys(seledKeys.concat(sKeys));
      } else {
        const currPage = params.current[reqMap.curr_page];
        const pageSize = params.current[reqMap.page_size];
        const sInd = (currPage - 1) * 20;
        const cloneSeledKeys = seledKeys.slice();
        cloneSeledKeys.splice(sInd, pageSize);
        setSeledKeys(cloneSeledKeys);
      }
    }
    //根据权限对按钮进行过滤
    function filterBtnsByAuth(btns: BtnItem[]) {
      if (filterByAuth) {
        return btns.filter(({ auth }) => {
          return auth?.length ? filterByAuth(auth) : true;
        });
      } else {
        return btns;
      }
    }
    return (
      <div
        className={`${className} ${s["base-crud"]} auto-scroll-table f-1 f-fs-s-c`}
      >
        <QueryForm
          ref={formRef}
          className="f-0"
          fields={fields}
          extraParams={extraParams}
          onValuesChange={handleValuesChange}
          // onFieldsChange={handleFieldsChange}
          onSubmit={handleSubmit}
          onReset={() => initFetch()}
          {...formAttrs}
        />
        {!!children && (
          <div className={`${s.children} f-0 mt-16`}>{children}</div>
        )}
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
          loading={loadingRef.current}
          {...tableAttrs}
        />
      </div>
    );
  }
);