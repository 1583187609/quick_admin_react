/**
 * 测试10-3
 */

import { CSSProperties } from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography, Row, Col, DatePicker, TimePicker } from "antd";
import { useRouter, useStoreSlice } from "@/hooks";
import { CommonObj } from "@/vite-env";
import dayjs from "dayjs";
import { showMessage } from "@/utils";
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
  const { updateMenuState } = useStoreSlice("menu");
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
        <Button onClick={() => router.push("/gis/demo-1")}>跳转到GIS示例1页面</Button>
        <Button onClick={() => router.push("/test/10/3")}>跳转到测试10-3页面</Button>
        <Button
          onClick={() =>
            showMessage(
              <div>
                测试内容<b>111111232312312312312311231231231</b>
              </div>
            )
          }
        >
          showMessage测试
        </Button>
        <Button onClick={() => updateMenuState({ isFold: false })}>更新菜单State错误key值示例</Button>
      </div>
    </>
  );
};
