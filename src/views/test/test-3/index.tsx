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
import { handleBtnNext } from "@/utils";
import { TableCol } from "@/components/table/_types";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import InfoSteps from "@/views/_components/InfoSteps";
import { useSelectOpts } from "@/hooks";
import { ReconciliationOutlined } from "@ant-design/icons";

const getFields = ({ getSearchOpts }: CommonObj): FormFieldAttrs[] => {
  return [
    {
      name: "name",
      label: "姓名",
    },
    {
      name: "status",
      label: "启用状态",
      type: "Select",
      attrs: {
        options: "EnableStatus",
      },
    },
    {
      name: "qqxl",
      label: "请求下拉",
      type: "Select",
      attrs: {
        options: "TestFetchAsync",
      },
    },
    {
      name: "type",
      label: "多标签",
      type: "Select",
      attrs: {
        mode: "multiple",
        options: "RoleType",
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "BaseNumberRange",
    },
    {
      name: "jzdz",
      label: "居住地址",
      type: "Cascader",
      attrs: {
        options: "Region",
      },
    },
    getSearchOpts("school", {
      name: "school",
      label: "学校",
      type: "Select",
      otherAttrs: {
        popover: "采用hooks封装复杂逻辑",
      },
    }),
    getSearchOpts("company", {
      name: "company",
      label: "公司",
      type: "Select",
      otherAttrs: {
        popover: "hooks封装且自定义选择下拉项",
      },
    }),
    {
      name: "sz_obj",
      label: "数字(对象)",
      type: "BaseNumberRange",
    },
    {
      name: "sz_def",
      label: "数字(默值)",
      type: "BaseNumberRange",
    },
    {
      name: "rq_arr",
      label: "日期(数组)",
      type: "DateRangePicker",
    },
    {
      name: "rq_obj",
      label: "日期(对象)",
      type: "DateRangePicker",
    },
    {
      name: "rq_def",
      label: "日期(默值)",
      type: "DateRangePicker",
    },
    {
      name: "zdy",
      label: "自定义",
      element: "【这是自定义的搜索项】",
      otherAttrs: {
        popover: "在搜索表单中一般几乎用不到自定义特性，此处用作示例",
      },
    },
  ];
};

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
    render: (text: any, row: CommonObj, ind: number) => `formatter列${ind}`,
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
    // dataIndex: ["create_name", "create_time"],
    title: "创建时间[create]",
    otherAttrs: {
      popover: "传入字符串类型的dataIndex",
    },
  },
  {
    type: "update",
    // dataIndex: "update_time",
    // dataIndex: ["update_name", "update_time"],
    title: "修改时间[update]",
    otherAttrs: {
      popover: "不传或传入数组类型的dataIndex",
    },
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
    otherAttrs: {
      popover: "未联调列，表格头部会被标红",
    },
  },
];

export default () => {
  const { getSearchOpts } = useSelectOpts();
  const { openPopup } = useContext(PopupContext);
  const fields = getFields({ getSearchOpts });
  const crudRef = useRef<any>(null);
  //处理额外按钮
  function onExtraBtn(name: BtnName, { params, ids, fields }: ExportBtnParams, next: FinallyNext) {
    handleBtnNext(
      {
        add: () => openPopup("新增", <AddEdit refreshList={next} />),
        delete: () => handleDelete(ids, next),
        export: () => handleExport({ ...params, exports: { ids, fields } }, next),
      },
      name
    );
  }
  //点击操作按钮
  function onOperateBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
    const { id } = row;
    handleBtnNext(
      {
        edit: () => openPopup("编辑", <AddEdit id={id} refreshList={next} />),
        view: () => openPopup("查看", <AddEdit id={id} disabled />),
        delete: () => handleDelete([id], next),
        forbid: () => handleForbid(id, next),
        enable: () => handleEnable(id, next),
      },
      name
    );
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
      //***** 按钮传参简介 *****//
      // /**
      // * 可接受一个数组，数组内可接受字符串、方法、对象；
      // * to跳转目标地址可传入字符串，也可传入对象（route）、方法；
      // * 内置按钮皆可简写成一个英文名，可传入text属性替换默认文本【详情】为【查看】或其他属性覆盖默认值；
      // */
      // groupBtns={[
      //   'edit', 'reject','delete','download','pass',
      //   (row: CommonObj, rowInd: number)=> rowInd % 2 === 1 ? 'forbid' : 'enable',
      //   { name: 'view', to: `/system/user/detail?id=${12}`},
      //   { name: 'view', to: {name: 'systemUserDetail', query: {id: 12}}},
      //   { name: 'view', text: '查看', to: (row:CommonObj) => ({name: 'systemUserDetail', query:{id: row.id}})},
      // ]}"
      // /**
      // * 可接受一个方法，按钮书写的前后位置不影响显示时前后的摆放位置（也可通过传入order属性改变前后位置）；
      // * 可自定义一个按钮（文本、图标、样式完全自定义）
      // * 按钮图标可传入字符串 'ChromeFilled'，也可传入引入的 ChromeFilled
      // */
      // groupBtns={(row:CommonObj, rowInd: number)=>{
      //   const {id} = row;
      //   if(rowInd % 3===0){
      //     return ['edit','delete', 'reject','pass','download', rowInd % 2 === 0 ? 'forbid' : 'enable']
      //   }else if(rowInd % 3===1){
      //     return [{name: 'edit', text: '修改', order: 1000}, 'reject','delete','download','pass']
      //   }else if(rowInd % 3===2){
      //     return [{name: 'zdy',text: '自定义按钮',attrs: { type: 'primary', icon: 'ChromeFilled' }}]
      //   }
      // }}
      //***** 下方的 extraBtns 同 groupBtns 的规则 *****//
      //***** 其他说明 *****//
      // :sections="sections" //可将搜索条件分块显示
      // :fields="fields"
      extraBtns={[
        "add",
        "delete",
        { name: "import", customRules: false },
        { name: "export", customRules: false },
        "enable",
        "forbid",
        "repeal",
        "upload",
        "download",
        "pass",
        "reject",
        {
          name: "dialog",
          text: "打开modal列表",
          attrs: { type: "primary", icon: <ReconciliationOutlined /> },
        },
        {
          name: "drawer",
          text: "打开drawer表单",
          attrs: { type: "primary", icon: "ReconciliationOutlined" },
        },
        {
          name: "view",
          text: "url跳转",
          to: "/system/user/detail?id=12",
          order: 50,
          attrs: { icon: "LinkOutlined" },
        },
        {
          name: "zdy",
          text: "自定义按钮",
          attrs: { type: "default", icon: "ReadOutlined" },
        },
      ]}
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
