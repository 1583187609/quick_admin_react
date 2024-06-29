/**
 * 错误状态页
 */

import { useRouter } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { Button, Result } from "antd";

const statusMap = {
  403: {
    status: "403",
    title: "403",
    subTitle: "无权访问此页面哦~",
  },
  404: {
    status: "404",
    title: "404",
    subTitle: "页面找不到了~",
  },
  500: {
    status: "500",
    title: "500",
    subTitle: "服务器崩溃啦~",
  },
};
export default () => {
  const props: CommonObj = statusMap[404];
  const router = useRouter();
  return (
    <Result
      {...props}
      extra={
        <Button onClick={() => router.go(-1)} type="primary">
          返回上一页
        </Button>
      }
    />
  );
};
