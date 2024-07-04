/**
 * 文件说明-模板文件
 */

import { GetAuthRoleList } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud from "@/components/BaseCrud";
import { FormItem } from "@/components/BaseFormItem";
import { TableCol } from "@/components/table/_types";
import { useContext } from "react";
import AddEdit from "./AddEdit";
import { CommonObj, FinallyNext } from "@/vite-env";
import { showMessage } from "@/utils";

const fields: FormItem[] = [
  {
    name: "role_text",
    label: "角色类型",
    type: "Select",
    attrs: {
      options: "RoleType",
    },
  },
  {
    name: "status",
    label: "状态",
    type: "Select",
    attrs: {
      options: "EnableStatus",
    },
  },
  { name: "create_time", label: "创建时间", type: "DateRangePicker" },
];

const columns: TableCol[] = [
  { dataIndex: "role_text", title: "角色类型", width: 150 },
  { dataIndex: "status", title: "启用状态", width: 80 },
  { dataIndex: "create_time", title: "创建时间", width: 180 },
  { dataIndex: "update_time", title: "更新时间", width: 180 },
  { dataIndex: "remark", title: "备注", width: 250 },
];

export default () => {
  const { openPopup } = useContext(PopupContext);
  function handleExtraBtn(name: BtnName, info: CommonObj, next: FinallyNext) {
    const { ids } = info;
    const map: CommonObj = {
      add: () => openPopup("新增", <AddEdit />),
      delete: () => handleDelete(ids, next),
    };
    map[name] ? map[name]() : showMessage(`点击了${name}按钮`, "info");
  }
  function handleOperateBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
    const { id } = row;
    const map: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit id={id} />),
      delete: () => handleDelete([id], next),
      view: () => openPopup("查看", <AddEdit pureText />),
      forbid: () => handleToggleStatus(name, id, next),
      enable: () => handleToggleStatus(name, id, next),
    };
    map[name] ? map[name]() : showMessage(`点击了${name}按钮`, "info");
  }
  function handleDelete(ids: string[], next: FinallyNext) {
    next();
  }
  function handleToggleStatus(name: BtnName, id: string, next: FinallyNext) {
    next();
  }
  return (
    <BaseCrud
      fields={fields}
      columns={columns}
      fetch={GetAuthRoleList}
      extraBtns={["add", "delete"]}
      operateBtns={["edit", "delete", "view", (row: CommonObj) => (true ? "forbid" : "enable")]}
      onExtraBtn={handleExtraBtn}
      onOperateBtn={handleOperateBtn}
      selection
      index
      sort
    ></BaseCrud>
  );
};
