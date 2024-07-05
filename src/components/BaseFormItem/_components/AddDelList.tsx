/**
 * 文件说明-模板文件
 */

import { CSSProperties, ReactNode, useState } from "react";
import { Button, Form, Space } from "antd";
import { CommonObj } from "@/vite-env";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

interface Props {
  className?: string;
  style?: CSSProperties;
  formItems?: ReactNode[];
  [key: string]: any;
}
export default ({ className = "", formItems = [], children, ...restProps }: Props) => {
  const [list, setList] = useState<CommonObj[]>([{}]);
  function handleClick(ind: number, isAdd: boolean) {
    if (isAdd) {
      setList([...list, {}]);
    } else {
      list.splice(ind, 1);
      setList([...list]);
    }
  }
  return list.map((item: CommonObj, ind: number) => {
    const isAdd = ind === list.length - 1;
    return (
      <Form.Item className={`${className}`} {...restProps} key={ind} noStyle>
        <Space.Compact>{formItems}</Space.Compact>
        <Button
          className="ml-h"
          icon={isAdd ? <PlusCircleOutlined /> : <MinusCircleOutlined />}
          type={isAdd ? "primary" : undefined}
          danger={!isAdd}
          onClick={() => handleClick(ind, isAdd)}
          shape="circle"
        />
      </Form.Item>
    );
  });
};
