/**
 * 文件说明-模板文件
 */

import { DeleteUserList, PostMockCommonExport, GetMockCommonList } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud, { ExportBtnParams } from "@/components/BaseCrud";
import { message } from "antd";
import React, { useContext, useRef } from "react";
import AddEdit from "./_components/AddEdit";
import { getFormFields, getTableFields } from "./fields";
import { CommonObj } from "@/vite-env";
import { useDictMap, useStoreSpace } from "@/hooks";

export default () => {
  const { openPopup } = useContext(PopupContext);
  const crudRef = useRef(null);
  const { getOpts } = useDictMap();
  const genderOpts = getOpts("Gender");
  const roleTypeOpts = getOpts("RoleType");
  const enableStatusOpts = getOpts("EnableStatus");
  // useEffect(() => {}, []);
  //处理额外按钮
  function onExtraBtn(name: BtnName, { params, ids, fields }: ExportBtnParams, next: (msg?: string) => void) {
    const nameMap: CommonObj = {
      add: () => openPopup("新增", <AddEdit refresh={refresh} />),
      delete: () => handleDelete(ids, next),
      export: () => handleExport({ ...params, exports: { ids, fields } }, next),
    };
    nameMap[name] ? nameMap[name]() : message.warning(`点击了${name}按钮`);
  }
  //点击操作按钮
  function onOperateBtn(name: BtnName, row: CommonObj, next: () => void) {
    const { id } = row;
    const nameMap: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit id={id} refresh={refresh} />),
      view: () => openPopup("查看", <AddEdit id={id} pureText />),
      delete: () => handleDelete([id], next),
      forbid: () => handleForbid(id, next),
      enable: () => handleEnable(id, next),
    };
    nameMap[name] ? nameMap[name]() : message.warning(`点击了${name}按钮`);
  }
  //删除
  function handleDelete(ids: React.Key[], next: () => void) {
    DeleteUserList(ids).then((res: CommonObj) => {
      next();
    });
    console.log(ids, "handleDelete-ids---------------------");
  }
  //导出
  function handleExport(params: CommonObj, next: () => void) {
    PostMockCommonExport(params).then((res: CommonObj) => {
      next();
    });
  }
  //启用
  function handleEnable(id: string, next: (msg?: string) => void) {
    next();
  }
  //禁用
  function handleForbid(id: string, next: (msg?: string) => void) {
    next();
  }
  //刷新列表
  function refresh() {
    console.log("refresh-刷新了列表-------------");
    crudRef?.current?.refresh();
  }
  return (
    <BaseCrud
      ref={crudRef}
      // formAttrs={{ initialValues: { sex: 1 } }}
      fields={getFormFields({ genderOpts, roleTypeOpts, enableStatusOpts })}
      columns={getTableFields({})}
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
