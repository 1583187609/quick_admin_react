/**
 * 测试10-3
 */

import { CSSProperties } from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography, Row, Col, DatePicker, TimePicker } from "antd";
import { useRouter } from "@/hooks";
import { CommonObj } from "@/vite-env";
import dayjs from "dayjs";
const { Option } = Select;
// import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
const onFinish = (args: CommonObj) => {
  console.log("提交参数", args);
  console.log(dayjs(args.rq).format("YYYY-MM-DD"), "日期---------------");
  console.log(dayjs(args.sj).format("HH:mm:ss"), "日期---------------");
};
// const initVals = {
//   rq: "2024-07-07",
//   sj: "04:04:04",
// };
const initVals = {
  rq: dayjs("2024-07-07", "YYYY-MM-DD"),
  sj: dayjs("04:04:04", "HH:mm:ss"),
};
export default ({ className = "", ...restProps }: Props) => {
  const router = useRouter();
  return (
    <>
      <Form
        className={`${className}`}
        {...restProps}
        name="complex-form"
        // layout="inline"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={initVals}
      >
        {/* <Form.Item label="Username">
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
        </Form.Item> */}
        {/* <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
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
        </Form.Item> */}
        {/* <Form.Item label="BirthDate" style={{ marginBottom: 0 }} required>
          <Space.Compact>
            <Form.Item
              name="year"
              rules={[{ required: true }]}
              tooltip={<div className="color-danger">"提示信息"</div>}
            >
              <Input placeholder="请输入年份" />
            </Form.Item>
            <Form.Item
              name="month"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input birth month" />
            </Form.Item>
          </Space.Compact>
        </Form.Item> */}
        <Form.Item label="时间" name="sj">
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item label="日期" name="rq">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <div className="f-fs-c">
        <Button
          onClick={() =>
            router.push({
              name: "home",
              query: {
                id: 3,
                age: undefined,
                sex: null,
                isAgree: true,
                // range: [1, 2], info: { test: "测试" }
              },
            })
          }
        >
          跳转到首页
        </Button>
        <Button
          onClick={() =>
            router.push({
              name: "login",
              query: {
                id: 3,
                age: undefined,
                sex: null,
                isAgree: true,
                // range: [1, 2], info: { test: "测试" }
              },
            })
          }
        >
          跳转到登录页
        </Button>
      </div>
    </>
  );
};
