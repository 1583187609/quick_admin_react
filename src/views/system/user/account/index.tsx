/**
 * 文件说明-模板文件
 */

import { DeleteUserList, PostMockCommonExport, GetMockCommonList, PostMockCommon } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud, { ExportBtnParams } from "@/components/BaseCrud";
import { message } from "antd";
import React, { useContext } from "react";
import AddEdit from "./_components/AddEdit";
import { fields, columns } from "./fields";
import { CommonObj, FinallyNext } from "@/vite-env";

export default () => {
  const { openPopup } = useContext(PopupContext);
  //处理额外按钮
  function onExtraBtn(name: BtnName, { params, ids, fields }: ExportBtnParams, next: FinallyNext) {
    const nameMap: CommonObj = {
      add: () => openPopup("新增", <AddEdit refreshList={next} />),
      delete: () => handleDelete(ids, next),
      export: () => handleExport({ ...params, exports: { ids, fields } }, next),
    };
    nameMap[name] ? nameMap[name]() : message.warning(`点击了${name}按钮`);
  }
  //点击操作按钮
  function onOperateBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
    const { id } = row;
    const nameMap: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit data={row} refreshList={next} />),
      view: () => openPopup("查看", <AddEdit data={row} />),
      delete: () => handleDelete([id], next),
      forbid: () => handleForbid(id, next),
      enable: () => handleEnable(id, next),
    };
    nameMap[name] ? nameMap[name]() : message.warning(`点击了${name}按钮`);
  }
  //删除
  function handleDelete(ids: React.Key[], next: FinallyNext) {
    DeleteUserList(ids).then((res: CommonObj) => next());
  }
  //导出
  function handleExport(params: CommonObj, next: FinallyNext) {
    PostMockCommonExport(params).then((res: CommonObj) => next());
  }
  //启用
  function handleEnable(id: string, next: FinallyNext) {
    PostMockCommon({ id }).then((res: CommonObj) => next());
  }
  //禁用
  function handleForbid(id: string, next: FinallyNext) {
    PostMockCommon({ id }).then((res: CommonObj) => next());
  }
  return (
    <BaseCrud
      // formAttrs={{ initialValues: { gender: 1 } }}
      fields={fields}
      columns={columns}
      fetch={GetMockCommonList}
      extraBtns={[
        "add",
        "delete",
        // "import",
        "export",
        // "edit",
        // "view",
        // "repeal",
        // "download",
        // "log",
        // "forbid",
        // "enable",
        // "upload",
        // "submit",
        // "reset",
      ]}
      operateBtns={[
        "edit",
        "delete",
        "view",
        (row: CommonObj) => (row.status === 2 ? "enable" : "forbid"),
        // { name: "custom", text: "自定义按钮" },
      ]}
      onExtraBtn={onExtraBtn}
      onOperateBtn={onOperateBtn}
      // sort
      index
      selection
    />
  );
};
