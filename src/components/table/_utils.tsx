import { defaultColumnAttrs } from "./_config";
import { CommonObj } from "@/vite-env";
import { MenuOutlined } from "@ant-design/icons";
import { TableColAttrs, SpecialColKeys, InnerColName, OutterColName } from "./_types";
import UserInfo from "@/views/_components/UserInfo";
import BaseImg from "@/components/BaseImg";
import BaseText from "@/components/BaseText";
import BaseTag from "@/components/BaseTag";
import { Switch } from "antd";
import { emptyVals, showMessage } from "../_utils";
import BaseCopy from "../BaseCopy";

export const specialColMap: { [key in SpecialColKeys | InnerColName | OutterColName]: TableColAttrs } = {
  //序号列
  index: {
    dataIndex: "$index",
    title: "序号",
    width: 60,
    fixed: "left",
    render: (text: any, row: CommonObj, ind: number) => ind + 1,
  },
  //排序列
  sort: {
    dataIndex: "$sort",
    title: "排序",
    width: 60,
    fixed: "left",
    render: (text: any) => <MenuOutlined style={{ touchAction: "none", cursor: "move" }} />,
  },
  //操作列
  operate: {
    dataIndex: "$operate",
    title: "操作",
    // width: 260,
    fixed: "right",
    ...defaultColumnAttrs,
  },
  //id：唯一标识id
  id: { dataIndex: "id", title: "ID", width: 70, fixed: "left" },
  //备注列
  remark: { dataIndex: "remark", title: "备注", width: 140 },
  //创建列
  create: {
    dataIndex: ["create_name", "create_time"],
    title: "创建时间",
    width: 160,
    render: (text: string | [string, string]) => {
      if (Array.isArray(text)) {
        const [name, time] = text;
        return (
          <>
            <div>{emptyVals.includes(name) ? "-" : name}</div>
            <div>{emptyVals.includes(time) ? "-" : time}</div>
          </>
        );
      }
      return emptyVals.includes(text) ? "-" : text;
    },
  },
  //修改列
  update: {
    dataIndex: ["update_name", "update_time"],
    title: "修改时间",
    width: 160,
    render: (text: string | [string, string]) => {
      if (Array.isArray(text)) {
        const [name, time] = text;
        return (
          <>
            <div>{emptyVals.includes(name) ? "-" : name}</div>
            <div>{emptyVals.includes(time) ? "-" : time}</div>
          </>
        );
      }
      return emptyVals.includes(text) ? "-" : text;
    },
  },
  //switch开关
  switch: {
    dataIndex: "status",
    title: "启用状态",
    width: 80,
    render: (value: any) => (
      <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        checked={value === 1}
        onChange={(checked: boolean) => showMessage("暂未联调", "info")}
      />
    ),
  },
  //是否启用状态
  BaseTag: {
    dataIndex: "status",
    title: "状态",
    width: 90,
    render: (value: any) => <BaseTag name="EnableStatus" value={value} />,
  },
  //图片
  BaseImg: {
    dataIndex: "imgUrl",
    title: "图片",
    width: 136,
    render: (value: any) => <BaseImg size={120} src={value} />,
  },
  //文本省略显示，点击查看更多
  BaseText: {
    dataIndex: "content",
    title: "内容",
    width: 250,
    render: (value: any) => <BaseText size={120}>{value}</BaseText>,
  },
  // 文本复制
  BaseCopy: {
    dataIndex: "desc",
    title: "简介",
    width: 200,
    render: (text, row, index) => <BaseCopy text={text} />,
  },
  //用户信息
  UserInfo: {
    dataIndex: "userData",
    title: "用户信息",
    fixed: "left",
    width: 440, // 222,
    render: (value: any) => <UserInfo data={value} />,
  },
};
