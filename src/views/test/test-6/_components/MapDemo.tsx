/**
 * 借助map、connect 实现store的使用
 */

import { CSSProperties } from "react";
import { connect } from "react-redux";
import demoStore from "@/store/modules/demo";
import { Button } from "antd";
const { addNum, cutNum } = demoStore.actions;

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
// 获取store中的数据的方法
const mapState = (state: any) => {
  const { demo } = state;
  return {
    num: demo.num,
  };
};
// 修改store中的数据的方法
const mapDispatch = (dispatch: any) => {
  return {
    handleAdd: (num: number) => dispatch(addNum(num)),
    handleCut: (num: number) => dispatch(cutNum(num)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(({ className = "", num, handleAdd, handleCut, ...restProps }: Props) => {
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
