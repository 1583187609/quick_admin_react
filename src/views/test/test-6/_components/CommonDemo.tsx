/**
 * hook常规做法实现store的使用
 */

import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import demoStore from "@/store/modules/demo";
import { Button } from "antd";
import BaseTag from "@/components/BaseTag";
import { RootState } from "@/store";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const { addNum, cutNum } = demoStore.actions;

export default ({ className = "", ...restProps }: Props) => {
  const dispatch = useDispatch();
  const num = useSelector((state: RootState) => state.demo.num);
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
      <div className="f-1 f-fs-c-c">
        第二列
        <BaseTag value={1} />
      </div>
    </div>
  );
};
