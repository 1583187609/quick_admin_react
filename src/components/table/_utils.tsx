import { defaultColumnAttrs } from "./_config";
import { CommonObj } from "@/vite-env";
import { MenuOutlined } from "@ant-design/icons";
import { TableColAttrs } from "./_types";

export type SpecialColName = keyof typeof specialColMap;

const { align } = defaultColumnAttrs;

export const specialColMap: { [key: string]: TableColAttrs } = {
  //序号列
  index: {
    name: "$index",
    title: "序号",
    width: 60,
    fixed: "left",
    align,
    render(text: any, row: CommonObj, ind: number) {
      return ind + 1;
    },
  },
  //排序列
  sort: {
    name: "$sort",
    title: "排序",
    width: 60,
    fixed: "left",
    align,
    render(text: any, row: CommonObj, ind: number) {
      return <MenuOutlined style={{ touchAction: "none", cursor: "move" }} />;
    },
  },
  //多选列
  selection: {
    name: "$selection",
    title: "选择",
    width: 50,
    fixed: "left",
    align,
  },
  //操作列
  operate: {
    name: "$operate",
    title: "操作",
    // width: 260,
    fixed: "right",
    align,
  },
};
