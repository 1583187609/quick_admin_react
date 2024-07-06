import { CSSProperties, useContext, useMemo, useState } from "react";
import BaseTable from "@/components/table/BaseTable";
import BaseBtn from "@/components/BaseBtn";
import { Switch } from "antd";
import { PopupContext } from "@/components/provider/PopupProvider";
import { useLocation } from "react-router-dom";
import { TableColAttrs } from "@/components/table/_types";
import { showMessage, storage } from "@/components/_utils";
import { CommonObj } from "@/vite-env";

export interface SetTableRowItem {
  colName: string;
  colText: string;
  isShow: boolean;
  isExport: boolean;
  isOrder: boolean;
}
interface Props {
  className?: string;
  style?: CSSProperties;
  allColumns?: TableColAttrs[];
  columns?: TableColAttrs[];
  resetColumns?: () => void;
  onShowChange: (name: string, val: boolean, ind: number) => void;
  onExportChange: (name: string, val: boolean, ind: number) => void;
  onSortChange: (name: string, val: boolean, ind: number) => void;
  [key: string]: any;
}

function getCols({ onShowChange, onExportChange, onSortChange }: CommonObj): TableColAttrs[] {
  return [
    { dataIndex: "colText", title: "列名称", width: 200 },
    { dataIndex: "colName", title: "属性名", width: 120 },
    {
      dataIndex: "isShow",
      title: "是否显示",
      width: 80,
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
      dataIndex: "isExport",
      title: "是否导出",
      width: 80,
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
      dataIndex: "isOrder",
      title: "排序",
      width: 80,
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
export default ({
  className = "",
  style,
  allColumns = [],
  columns = [],
  resetColumns,
  onShowChange,
  onExportChange,
  onSortChange,
  ...restProps
}: Props) => {
  const { pathname } = useLocation();
  const { closePopup } = useContext(PopupContext);
  const [tableKey, setTableKey] = useState(Date.now());
  //表格列字段
  const colFields = allColumns.map(item => {
    const { title, dataIndex } = item;
    return {
      colName: dataIndex as string,
      colText: title,
      isShow: !!columns.find(it => it.dataIndex === dataIndex),
      isExport: true,
      isOrder: false,
    };
  });
  console.log(colFields, "colFields----------------");
  function handleSave() {
    // const storeColFields = storage.getItem("colFields") || {};
    // storeColFields[pathname] = colFields;
    // console.log(storeColFields, "storeColFields-------保存");
    // storage.setItem("colFields", storeColFields);
    showMessage("保存成功");
    closePopup("drawer");
  }
  function handleReset() {
    resetColumns?.();
    setTableKey(Date.now());
  }
  return (
    <div className={`${className}`} style={{ width: "600px", ...style }} {...restProps}>
      <BaseTable columns={getCols({ onShowChange, onExportChange, onSortChange })} dataSource={colFields} key={tableKey} />
      <div className="f-c-c mt-16">
        <BaseBtn onClick={handleSave} btn={{ name: "submit", text: "保存" }} />
        <BaseBtn onClick={handleReset} btn="reset" />
      </div>
    </div>
  );
};
