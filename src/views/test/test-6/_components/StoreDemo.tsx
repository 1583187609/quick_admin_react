/**
 * 借助map、connect 实现store的使用
 */

import { CSSProperties } from "react";
import { Button } from "antd";
import { useStoreSpace } from "@/hooks";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export default ({ className = "", ...restProps }: Props) => {
  const { num, addNum, cutNum } = useStoreSpace("counter");
  return (
    <div className={`${className} f-sb-s`} {...restProps}>
      <div className="f-1 f-c-c-c">
        <h1 className="f-c-c mb-o">值：{num}</h1>
        <div className="f-c-c">
          <Button type="primary" className="mr-o" onClick={() => addNum(1)}>
            点击增加
          </Button>
          <Button type="primary" onClick={() => cutNum(1)}>
            点击减少
          </Button>
        </div>
      </div>
      <div className="f-1 f-fs-c-c">第二列</div>
    </div>
  );
};
