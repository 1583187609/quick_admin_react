import { CommonObj } from "@/vite-env";
import { Table } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { merge } from "lodash";
import { TableCol } from "@/components/table/_types";
import { defaultTableAttrs, defaultColumnAttrs } from "../_config";

interface Props {
  columns?: TableCol[];
  dataSource?: CommonObj[];
  rowKey?: string;
  size?: SizeType;
}

export default ({ columns, dataSource, rowKey = "id", ...restProps }: Props) => {
  const newAttrs = merge({}, defaultTableAttrs, restProps);
  const newCols = columns?.map((item: TableCol, ind: number) => {
    const { name, ...rest } = item;
    let tempCols = { dataIndex: name, ...rest };
    tempCols = merge({}, defaultColumnAttrs, tempCols);
    return tempCols;
  });
  const newRows = dataSource?.map((item: CommonObj, ind: number) => {
    for (let key in item) {
      if (["", undefined, null].includes(item[key])) {
        item[key] = "-";
      }
    }
    if (!item[rowKey]) {
      item[rowKey] = ind;
    }
    return item;
  });
  return <Table rowKey={rowKey} columns={newCols} dataSource={newRows} pagination={false} {...newAttrs} />;
};
