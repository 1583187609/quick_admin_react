import { CommonObj } from "@/vite-env";
import { Table } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TableColAttrs } from "@/components/table/_types";
import { defaultTableAttrs, defaultColumnAttrs } from "../_config";
import { emptyVals } from "@/utils";

interface Props {
  columns?: TableColAttrs[];
  dataSource?: CommonObj[];
  rowKey?: string;
  size?: SizeType;
}

export default ({ columns = [], dataSource = [], rowKey = "id", ...restProps }: Props) => {
  const newAttrs = Object.assign({}, defaultTableAttrs, restProps);
  const newCols = columns?.map((item: TableColAttrs) => Object.assign({}, defaultColumnAttrs, item));
  const newRows = dataSource.map((item: CommonObj, ind: number) => {
    // for (let key in item) {
    //   if (emptyVals.includes(item[key])) item[key] = "-";
    // }
    if (!item[rowKey]) item[rowKey] = ind;
    return item;
  });
  return <Table rowKey={rowKey} columns={newCols} dataSource={newRows} pagination={false} {...newAttrs} />;
};
