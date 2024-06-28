/**
 * 文件说明-模板文件
 */

import { GetAuthMenuList } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud from "@/components/BaseCrud";
import { FieldItem } from "@/components/BaseFormItem";
import BaseIcon from "@/components/BaseIcon";
import { ColItem } from "@/components/table/BaseTable";
// import { useDictMap } from "@/hooks";
import { message } from "antd";
import { useContext, useEffect } from "react";
import AddEdit from "./AddEdit";
import { CommonObj } from "@/vite-env";

function getFields({ getOpts }: CommonObj): FieldItem[] {
  return [
    {
      name: "menu_name",
      label: "菜单名称",
    },
    {
      name: "status",
      label: "状态",
      type: "Select",
      attrs: {
        options: getOpts("enableStatus"),
      },
    },
    {
      name: "is_cache",
      label: "是否缓存",
      type: "Select",
      attrs: {
        options: getOpts("yesNoStatus"),
      },
    },
    {
      name: "is_frame",
      label: "是否外链",
      type: "Select",
      attrs: {
        options: getOpts("yesNoStatus"),
      },
    },
    { name: "create_time", label: "创建时间", type: "DatePicker.RangePicker" },
  ];
}
function getCols(): ColItem[] {
  return [
    { name: "menu_name", title: "菜单名称", width: 150 },
    { name: "menu_type_text", title: "菜单类型", width: 80 },
    {
      name: "icon",
      title: "菜单图标",
      width: 80,
      render(text: string) {
        return <BaseIcon size="20" name={text} />;
      },
    },
    { name: "order_num", title: "排序", width: 80 },
    { name: "perms", title: "权限标识", width: 180 },
    { name: "menu_path", title: "菜单路径", width: 250 },
    { name: "component_path", title: "组件路径", width: 300 },
    { name: "status_text", title: "是否启用", width: 80 },
    { name: "remark", title: "备注", width: 250 },
    { name: "create_time", title: "创建时间", width: 120 },
    { name: "update_time", title: "更新时间", width: 120 },
  ];
}
export default () => {
  const { openPopup } = useContext(PopupContext);
  // const { getOpts } = useDictMap();
  // useEffect(() => {
  //   openPopup("新增", <AddEdit />);
  // }, []);
  function handleExtraBtn(name: BtnName, info: CommonObj, next: () => void) {
    const { ids } = info;
    const map: CommonObj = {
      add: () => openPopup("新增", <AddEdit />),
      delete: () => handleDelete(ids, next),
    };
    map[name]?.();
  }
  function handleOperateBtn(name: BtnName, row: CommonObj, next: () => void) {
    const { id } = row;
    const map: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit />),
      delete: () => handleDelete([id], next),
      forbid: () => handleForbid([id], next),
    };
    map[name] ? map[name]() : message.info(`点击了${name}按钮`);
  }
  function handleDelete(ids: string[], next: () => void) {
    next();
  }
  function handleForbid(ids: string[], next: () => void) {
    next();
  }
  return (
    <BaseCrud
      // fields={getFields({ getOpts })}
      columns={getCols()}
      fetch={GetAuthMenuList}
      extraBtns={["add", "delete"]}
      operateBtns={[
        "edit",
        "delete",
        (row: CommonObj) => (true ? "forbid" : "enable"),
      ]}
      onExtraBtn={handleExtraBtn}
      onOperateBtn={handleOperateBtn}
      selection
    />
  );
};
