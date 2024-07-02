import { useContext, useEffect, useMemo, useRef, useState } from "react";
import BaseTable from "@/components/table/BaseTable";
import BaseBtn from "@/components/BaseBtn";
import { message, Switch } from "antd";
import { PopupContext } from "@/components/provider/PopupProvider";
import { useLocation } from "react-router-dom";
import { TableCol } from "@/components/table/_types";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";

export interface SetTableRowItem {
  colName: string;
  colText: string;
  isShow: boolean;
  isExport: boolean;
  isOrder: boolean;
}
interface Props {
  allColumns?: TableCol[];
  columns?: TableCol[];
  resetColumns?: () => void;
  onShowChange: (name: string, val: boolean, ind: number) => void;
  onExportChange: (name: string, val: boolean, ind: number) => void;
  onSortChange: (name: string, val: boolean, ind: number) => void;
}

function getCols({ onShowChange, onExportChange, onSortChange }: CommonObj): TableCol[] {
  return [
    { name: "colText", title: "列名称" },
    // { name: "colName", title: "属性名" },
    {
      name: "isShow",
      title: "是否显示",
      render(text: string, row: CommonObj, ind: number) {
        return (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={row.isShow}
            onChange={val => onShowChange(row.colName, val, ind)}
          />
        );
      },
    },
    {
      name: "isExport",
      title: "是否导出",
      render(text: string, row: CommonObj, ind: number) {
        return (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={row.isExport}
            onChange={val => onExportChange(row.colName, val, ind)}
            disabled
          />
        );
      },
    },
    {
      name: "isOrder",
      title: "排序",
      render(text: string, row: CommonObj, ind: number) {
        return (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked={row.isOrder}
            onChange={val => onSortChange(row.colName, val, ind)}
            disabled
          />
        );
      },
    },
  ];
}
export default ({ allColumns = [], columns = [], resetColumns, onShowChange, onExportChange, onSortChange }: Props) => {
  const { pathname } = useLocation();
  const { closePopup } = useContext(PopupContext);
  const [tableKey, setTableKey] = useState(Date.now());
  //表格列字段
  const colFields = useMemo(() => {
    return allColumns.map(item => {
      const { title, name } = item;
      return {
        colName: name as string,
        colText: title,
        isShow: !!columns.find(it => it.name === name),
        isExport: true,
        isOrder: false,
      };
    });
  }, [allColumns, columns]);
  function handleSave() {
    // const storeColFields = storage.getItem("colFields") || {};
    // storeColFields[pathname] = colFields;
    // console.log(storeColFields, "storeColFields-------保存");
    // storage.setItem("colFields", storeColFields);
    message.success("保存成功");
    closePopup("drawer");
  }
  function handleReset() {
    resetColumns?.();
    setTableKey(Date.now());
  }
  return (
    <>
      <BaseTable columns={getCols({ onShowChange, onExportChange, onSortChange })} dataSource={colFields} key={tableKey} />
      <div className="f-c-c mt-16">
        <BaseBtn onClick={handleSave} btn={{ name: "submit", text: "保存" }} />
        <BaseBtn onClick={handleReset} btn="reset" />
      </div>
    </>
  );
};
