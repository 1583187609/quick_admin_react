/**
 * 文件说明-模板文件
 */

import BaseBtn, { BtnItem, BtnName } from "@/components/BaseBtn";
import { sortObjArrByKey } from "@/utils";
import { useContext, useEffect, useState } from "react";
import {
  PrinterTwoTone,
  SettingTwoTone,
  FileDoneOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Dropdown } from "antd";
import { PopupContext } from "@/components/provider/PopupProvider";
import SetPrint from "../SetPrint";
import SetTable, { SetTableRowItem } from "../SetTable";
import { TableCol } from "@/components/table/_types";

export type ToolsType = "print" | "colSet";
export interface ExportFieldItem {
  name: React.Key;
  label: string;
}
interface Props {
  className?: string;
  allColumns: TableCol[];
  columns: TableCol[];
  setColumns: (columns: TableCol[]) => void;
  btns?: BtnItem[];
  tools?: ToolsType[];
  batchBtn?: boolean; //是否显示批量选择按钮
  seledNum?: number; //已选择的数量
  total?: number; //总记录数量
  onClick?: (name: BtnName) => void;
}
const toolsMap = {
  print: {
    title: "打印",
    icon: <PrinterTwoTone />,
  },
  colSet: {
    title: "设置",
    icon: <SettingTwoTone />,
  },
};
const batchBtns: any[] = [
  {
    key: "1",
    label: (
      <Button icon={<CheckSquareOutlined />} type="primary" ghost>
        全选
      </Button>
    ),
  },
  {
    key: "2",
    label: (
      <Button icon={<MinusSquareOutlined />} type="primary" ghost>
        反选
      </Button>
    ),
  },
  {
    key: "3",
    label: (
      <Button icon={<CloseSquareOutlined />} type="primary" ghost>
        全不选
      </Button>
    ),
  },
];
export default ({
  className = "",
  allColumns = [],
  columns = [],
  setColumns,
  btns = [],
  tools = ["colSet"], //"print",
  onClick,
  seledNum = 0,
  batchBtn = false,
  total = 0,
}: Props) => {
  const { openPopup } = useContext(PopupContext);

  sortObjArrByKey(btns);
  useEffect(() => {}, []);
  function handleToolBtns(name: ToolsType) {
    if (name === "print") {
      openPopup("打印设置", <SetPrint />, "modal");
    } else if (name === "colSet") {
      openPopup(
        "表格设置",
        <SetTable
          onShowChange={handleShowChange}
          onExportChange={handleExportChange}
          onSortChange={handleSortChange}
          allColumns={allColumns}
          columns={columns}
          resetColumns={() => setColumns(allColumns.slice())}
        />,
        "drawer"
      );
    }
  }
  function handleShowChange(name: string, isShow: boolean, allInd: number) {
    if (isShow) {
      let findInd = -1;
      columns.findIndex((item, index) => {
        const itemAtAllInd = allColumns.findIndex(it => it.name === item.name);
        if (itemAtAllInd > allInd) {
          findInd = index;
          return true;
        } else if (itemAtAllInd < allInd) {
          if (index === columns.length - 1) {
            findInd = columns.length;
            return true;
          } else {
            return false;
          }
        }
      });
      columns.splice(findInd, 0, allColumns[allInd]);
      setColumns(columns.slice()); //slice()会深拷贝
    } else {
      const nowInd = columns.findIndex(it => it.name === name);
      columns.splice(nowInd, 1);
      setColumns(columns.slice());
    }
  }
  function handleExportChange(name: string, isShow: boolean, ind: number) {
    console.log(name, isShow, "handleExportChange-------");
  }
  function handleSortChange(name: string, isShow: boolean, ind: number) {
    console.log(name, isShow, "handleSortChange-------");
  }
  return (
    <div className={`${className} f-sb-c`}>
      {btns.map((btn, ind) => {
        return <BaseBtn onClick={onClick} btn={btn} key={ind} />;
      })}
      {batchBtn && (
        <Dropdown trigger={["hover"]} menu={{ items: batchBtns, selectable: true }}>
          <Button icon={<FileDoneOutlined />} type="primary" disabled={!total}>
            批量操作{seledNum ? ` (${seledNum})` : ""}
          </Button>
        </Dropdown>
      )}
      {tools.map((name, ind) => {
        const tool = toolsMap[name];
        return (
          <Tooltip title={tool.title} key={ind}>
            <Button
              onClick={() => handleToolBtns(name)}
              type="primary"
              shape="circle"
              icon={tool.icon}
              style={ind === 0 ? { marginLeft: "auto" } : undefined}
              ghost
            />
          </Tooltip>
        );
      })}
    </div>
  );
};
