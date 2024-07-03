import { defaultColumnAttrs } from "./_config";
import { CommonObj } from "@/vite-env";
import { MenuOutlined } from "@ant-design/icons";
import { TableColAttrs, SpecialColKeys, InnerColName, OutterColName } from "./_types";
import UserInfo from "@/views/_components/UserInfo";
import BaseImg from "@/components/BaseImg";
import BaseText from "@/components/BaseText";
import BaseTag from "@/components/BaseTag";
import { Switch } from "antd";
import { showMessage } from "../_utils";

export const specialColMap: { [key in SpecialColKeys | InnerColName | OutterColName]: TableColAttrs } = {
  //序号列
  index: {
    dataIndex: "$index",
    title: "序号",
    width: 60,
    fixed: "left",
    render(text: any, row: CommonObj, ind: number) {
      return ind + 1;
    },
  },
  //排序列
  sort: {
    dataIndex: "$sort",
    title: "排序",
    width: 60,
    fixed: "left",
    render(text: any, row: CommonObj, ind: number) {
      return <MenuOutlined style={{ touchAction: "none", cursor: "move" }} />;
    },
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
    dataIndex: ["createdName", "createdAt"],
    title: "创建时间",
    width: 160,
  },
  //修改列
  update: {
    dataIndex: ["updatedName", "updatedAt"],
    title: "修改时间",
    width: 160,
  },
  //switch开关
  switch: {
    dataIndex: "status",
    title: "启用状态",
    width: 80,
    render: (text: any, row: CommonObj, ind: number) => (
      <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        checked={row.status === 1}
        onChange={(checked: boolean) => showMessage("暂未联调", "info")}
      />
    ),
    // attrs: {
    //   activeValue: 1,
    //   inactiveValue: 0,
    //   activeText: "启用",
    //   inactiveText: "禁用",
    //   inlinePrompt: true,
    //   // onChange() {
    //   //   ElMessage.warning("暂未处理【启用/禁用】事件");
    //   // },
    // },
  },
  //是否启用状态
  BaseTag: {
    dataIndex: "status",
    title: "状态",
    width: 90,
    render: (text: any, row: CommonObj, ind: number) => <BaseTag name="EnableStatus" value={row.status} />,
  },
  //图片
  BaseImg: {
    dataIndex: "imgUrl",
    title: "图片",
    width: 136,
    render: (text: any, row: CommonObj, ind: number) => <BaseImg size={120} src={row.imgUrl} />,
  },
  //文本省略显示，点击查看更多
  BaseText: {
    dataIndex: "content",
    title: "内容",
    width: 250,
    render: (text: any, row: CommonObj, ind: number) => <BaseText size={120}>{row.produce}</BaseText>,
  },
  // 文本复制
  BaseCopy: {
    dataIndex: "desc",
    title: "简介",
    width: 200,
  },
  //用户信息
  UserInfo: {
    dataIndex: "userData",
    title: "用户信息",
    fixed: "left",
    width: 440, // 222,
    render(text: any, row: CommonObj, ind: number) {
      return (
        <UserInfo
        // data={row}
        />
      );
    },
  },
};
