/**
 * 测试6
 */

/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { counterStore } from "@/store";
import { Button } from "antd";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
// 获取store中的数据的方法
const mapState = (state: any) => {
  const { counter } = state;
  return {
    num: counter.num,
  };
};
// 修改store中的数据的方法
const mapDispatch = (dispatch: any) => {
  const { addNum, cutNum } = counterStore;
  return {
    handleAdd: (num: number) => dispatch(addNum(num)),
    handleCut: (num: number) => dispatch(cutNum(num)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(({ className = "", num, handleAdd, handleCut, ...restProps }: Props) => {
  // const dispatch = useDispatch();
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
});
