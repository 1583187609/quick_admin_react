/**
 * 文件说明-模板文件
 */

import { DeleteUserList, PostMockCommonExport, GetMockCommonList, PostMockCommon } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { BtnName } from "@/components/BaseBtn";
import BaseCrud, { ExportBtnParams } from "@/components/BaseCrud";
import React, { useContext, useRef } from "react";
import AddEdit from "./AddEdit";
import { DownloadOutlined } from "@ant-design/icons";
import { CommonObj, FinallyNext } from "@/vite-env";
import { showMessage } from "@/utils";
import { TableCol } from "@/components/table/_types";
import { FormItem } from "@/components/BaseFormItem";
import BaseRange from "@/components/BaseRange";
import InfoSteps from "@/views/_components/InfoSteps";

export const fields: FormItem[] = [
  {
    name: "id",
    label: "用户ID",
  },
  {
    name: "id",
    label: "用户ID",
  },
  {
    name: "name",
    label: "用户姓名",
  },
  {
    name: "gender",
    label: "性别",
    type: "Select",
    attrs: {
      options: "Gender",
    },
  },
  {
    name: "age",
    label: "年龄",
    type: "Custom",
    element: <BaseRange />,
  },
  {
    name: "type",
    label: "用户类型",
    type: "Select",
    attrs: {
      options: "RoleType",
    },
  },
  {
    name: "status",
    label: "账号状态",
    type: "Select",
    attrs: {
      options: "EnableStatus",
    },
  },
];

export const columns: TableCol[] = [
  {
    type: "UserInfo",
    title: "自定义组件列-内置[UserInfo]",
  },
  {
    dataIndex: "zdyzj",
    title: "自定义组件-非内置",
    width: 150,
    render: (text: any, row: CommonObj, ind: number) => <InfoSteps data={row} />,
  },
  {
    dataIndex: "name",
    title: "自定义表格头",
    width: 120,
  },
  {
    dataIndex: "avatar",
    type: "BaseImg",
    title: "图片[BaseImg]",
  },
  {
    type: "BaseText",
    dataIndex: "produce",
    title: "自我介绍[BaseText]",
  },
  {
    type: "BaseCopy",
    dataIndex: "avatar",
    title: "文本复制[BaseCopy]",
  },
  {
    dataIndex: "phone",
    title: "formatter列",
    render(text: any, row: CommonObj, ind: number) {
      return "formatter列";
    },
  },
  {
    type: "BaseTag",
    title: "状态[BaseTag]",
    width: 120,
  },
  {
    dataIndex: "create_time",
    title: "时间（内置宽度）",
  },
  {
    type: "create",
    dataIndex: "create_time",
    title: "创建时间[create]",
  },
  {
    type: "update",
    dataIndex: "update_time",
    title: "修改时间[update]",
  },
  {
    type: "switch",
    title: "启/禁用",
  },
  {
    type: "remark",
    title: "备注[remark]",
  },
  {
    dataIndex: "wltl",
    title: "未联调列",
  },
];

export default () => {
  const { openPopup } = useContext(PopupContext);
  const crudRef = useRef<any>(null);
  //处理额外按钮
  function onExtraBtn(name: BtnName, { params, ids, fields }: ExportBtnParams, next: FinallyNext) {
    const nameMap: CommonObj = {
      add: () => openPopup("新增", <AddEdit refreshList={next} />),
      delete: () => handleDelete(ids, next),
      export: () => handleExport({ ...params, exports: { ids, fields } }, next),
    };
    nameMap[name] ? nameMap[name]() : showMessage(`点击了${name}按钮`, "info");
  }
  //点击操作按钮
  function onOperateBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
    const { id } = row;
    const nameMap: CommonObj = {
      edit: () => openPopup("编辑", <AddEdit id={id} refreshList={next} />),
      view: () => openPopup("查看", <AddEdit id={id} disabled />),
      delete: () => handleDelete([id], next),
      forbid: () => handleForbid(id, next),
      enable: () => handleEnable(id, next),
    };
    nameMap[name] ? nameMap[name]() : showMessage(`点击了${name}按钮`, "info");
  }
  //删除
  function handleDelete(ids: React.Key[], next: FinallyNext) {
    DeleteUserList(ids).then((res: CommonObj) => {
      next();
    });
  }
  //导出
  function handleExport(params: CommonObj, next: FinallyNext) {
    PostMockCommonExport(params).then((res: CommonObj) => {
      next();
    });
  }
  //启用
  function handleEnable(id: string, next: FinallyNext) {
    PostMockCommon({ id }).then(res => next());
  }
  //禁用
  function handleForbid(id: string, next: FinallyNext) {
    PostMockCommon({ id }).then(res => next());
  }
  return (
    <BaseCrud
      ref={crudRef}
      fields={fields}
      columns={columns}
      fetch={GetMockCommonList}
      extraBtns={["add", "delete", "export"]}
      operateBtns={[
        "edit",
        "delete",
        "view",
        (row: CommonObj) => (row.status === 2 ? "enable" : "forbid"),
        {
          name: "any-custom-name",
          text: "自定义按钮",
          icon: <DownloadOutlined />,
          attrs: {
            type: "primary",
            ghost: true,
            danger: true,
          },
        },
      ]}
      onExtraBtn={onExtraBtn}
      onOperateBtn={onOperateBtn}
      selection
    />
  );
};
