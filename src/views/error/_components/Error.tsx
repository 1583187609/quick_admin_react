/**
 * 错误状态页
 */

import { useRouter } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { Button, Result } from "antd";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  status?: 403 | 404 | 500;
  [key: string]: any;
}

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

export default ({ className = "", status = 404, ...restProps }: Props) => {
  const attrs: CommonObj = statusMap[status];
  const router = useRouter();
  function handleBack() {
    const isReplace = status == 403;
    router.go(isReplace ? -1 : -2);
  }
  return (
    <Result
      className={`${className}`}
      extra={
        <Button onClick={handleBack} type="primary">
          返回上一页
        </Button>
      }
      {...attrs}
      {...restProps}
    />
  );
};
