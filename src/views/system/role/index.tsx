/**
 * 文件说明-模板文件
 */

import { GetAuthRoleList } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud from "@/components/BaseCrud";
import { FieldItem } from "@/components/BaseFormItem";
import { ColItem } from "@/components/table/BaseTable";
import { message } from "antd";
import { useContext } from "react";
import AddEdit from "./AddEdit";
import { CommonObj } from "@/vite-env";
import { useStoreSpace } from "@/hooks";

function getFields({ roleTypeOpts, enableStatusOpts }: CommonObj): FieldItem[] {
  return [
    {
      name: "role_text",
      label: "角色类型",
      type: "Select",
      attrs: {
        options: roleTypeOpts,
      },
    },
    {
      name: "status",
      label: "状态",
      type: "Select",
      attrs: {
        options: enableStatusOpts,
      },
    },
    { name: "create_time", label: "创建时间", type: "DatePicker.RangePicker" },
  ];
}
function getCols(): ColItem[] {
  return [
    { name: "role_text", title: "角色类型", width: 150 },
    { name: "status", title: "启用状态", width: 80 },
    { name: "create_time", title: "创建时间", width: 180 },
    { name: "update_time", title: "更新时间", width: 180 },
    { name: "remark", title: "备注", width: 250 },
  ];
}

export default () => {
  const { openPopup } = useContext(PopupContext);
  const { getOpts } = useStoreSpace("dict");
  const roleTypeOpts = [] ?? getOpts("RoleTypeOpts");
  const enableStatusOpts = [] ?? getOpts("EnableStatusOpts");
  function handleExtraBtn(name: BtnName, info: CommonObj, next: () => void) {
    const { ids } = info;
    const map: CommonObj = {
      add: () => openPopup("新增", <AddEdit />),
      delete: () => handleDelete(ids, next),
    };
    map[name] ? map[name]() : message.info(`点击了${name}按钮`);
  }
  function handleOperateBtn(name: BtnName, row: CommonObj, next: () => void) {
    const { id } = row;
    const map: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit id={id} />),
      delete: () => handleDelete([id], next),
      view: () => openPopup("查看", <AddEdit pureText />),
      forbid: () => handleToggleStatus(name, id, next),
      enable: () => handleToggleStatus(name, id, next),
    };
    map[name] ? map[name]() : message.info(`点击了${name}按钮`);
  }
  function handleDelete(ids: string[], next: () => void) {
    next();
  }
  function handleToggleStatus(name: BtnName, id: string, next: () => void) {
    next();
  }
  return (
    <BaseCrud
      fields={getFields({ roleTypeOpts, enableStatusOpts })}
      columns={getCols()}
      fetch={GetAuthRoleList}
      extraBtns={["add", "delete"]}
      operateBtns={[
        "edit",
        "delete",
        "view",
        (row: CommonObj) => (true ? "forbid" : "enable"),
      ]}
      onExtraBtn={handleExtraBtn}
      onOperateBtn={handleOperateBtn}
      selection
      index
    ></BaseCrud>
  );
};
