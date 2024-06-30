/**
 * hook常规做法实现store的使用
 */

import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterStore } from "@/store";
import { Button } from "antd";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const { addNum, cutNum } = counterStore;

export default ({ className = "", ...restProps }: Props) => {
  const dispatch = useDispatch();
  const num = useSelector((state) => state.counter.num);
  const handleAdd = (num: number) => dispatch(addNum(num));
  const handleCut = (num: number) => dispatch(cutNum(num));
  return (
    <div className={`${className} f-sb-s`} {...restProps}>
      <div className="f-1 f-c-c-c">
        <h1 className="f-c-c mb-o">值：{num}</h1>
        <div className="f-c-c">
          <Button type="primary" className="mr-o" onClick={() => handleAdd(1)}>
            点击增加
          </Button>
          <Button type="primary" onClick={() => handleCut(1)}>
            点击减少
          </Button>
        </div>
      </div>
      <div className="f-1 f-fs-c-c">第二列</div>
    </div>
  );
};
