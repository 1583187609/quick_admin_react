import { Space, Table, Tag, message } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { merge } from "lodash";
export interface ColItem {
  key?: string;
  name?: string;
  title: string;
  width?: number;
  fixed?: "left" | "right" | boolean;
  render?: (text: string, row: CommonObj, index: number) => any;
}

interface Props {
  columns?: ColItem[];
  dataSource?: CommonObj[];
  rowKey?: string;
  size?: SizeType;
}

const defaultAttrs: CommonObj = {
  bordered: true,
};
const defaultColAttrs = {
  align: "center",
};

export default ({
  columns,
  dataSource,
  rowKey = "id",
  ...restPorps
}: Props) => {
  const newAttrs = merge({}, defaultAttrs, restPorps);
  const newCols = columns?.map((item: ColItem, ind: number) => {
    const { name, ...rest } = item;
    let tempCols = { dataIndex: name, ...rest };
    tempCols = merge({}, defaultColAttrs, tempCols);
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
  return (
    <Table
      rowKey={rowKey}
      columns={newCols}
      dataSource={newRows}
      pagination={false}
      {...newAttrs}
    />
  );
};
