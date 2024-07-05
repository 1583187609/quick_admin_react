/**
 * 测试10-3
 */

import { CSSProperties } from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography, Row, Col } from "antd";
const { Option } = Select;
// import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
export default ({ className = "", ...restProps }: Props) => {
  return (
    <Form
      className={`${className}`}
      {...restProps}
      name="complex-form"
      // layout="inline"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
    >
      <Form.Item label="Username">
        <Space>
          <Form.Item name="username" noStyle rules={[{ required: true, message: "Username is required" }]}>
            <Input style={{ width: 160 }} placeholder="Please input" />
          </Form.Item>
          <Tooltip title="Useful information">
            <Typography.Link href="#API">Need Help?</Typography.Link>
          </Tooltip>
        </Space>
      </Form.Item>
      <Form.Item label="Address">
        <Space.Compact>
          <Form.Item name={["address", "province"]} noStyle rules={[{ required: true, message: "Province is required" }]}>
            <Select placeholder="Select province">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </Form.Item>
          <Form.Item name={["address", "street"]} noStyle rules={[{ required: true, message: "Street is required" }]}>
            <Input style={{ width: "50%" }} placeholder="Input street" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <Form.Item name="year" rules={[{ required: true }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
          <Input placeholder="Input birth year" />
        </Form.Item>
        <Form.Item
          name="month"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
        >
          <Input placeholder="Input birth month" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }} required>
        <Space.Compact>
          {/* <Row> */}
          {/* <Col span={24}> */}
          <Form.Item
            name="year"
            rules={[{ required: true }]}
            tooltip={<div className="color-danger">"提示信息"</div>}
            //  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            // noStyle
          >
            <Input placeholder="请输入年份" />
          </Form.Item>
          {/* </Col> */}
          {/* <Col span={24}> */}
          <Form.Item
            name="month"
            rules={[{ required: true }]}
            // style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
            // noStyle
          >
            <Input placeholder="Input birth month" />
          </Form.Item>
          {/* </Col> */}
          {/* </Row> */}
        </Space.Compact>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
