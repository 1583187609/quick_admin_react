/**
 * 增删改查-查询条件-表单组件
 * xs	屏幕 < 576px
 * sm	屏幕 ≥ 576px
 * md	屏幕 ≥ 768px
 * lg	屏幕 ≥ 992px
 * xl	屏幕 ≥ 1200px
 * xxl	屏幕 ≥ 1600px
 */

import { useMemo, useState, useImperativeHandle, forwardRef } from "react";
import { Button, Form, Col } from "antd";
import { CSSProperties } from "react";
import BaseFormItem, { FormItem, FormItemAttrs } from "@/components/BaseFormItem";
import { RedoOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons";
import { getMaxLength, showMessage } from "@/utils";
import { useEventListener } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { defaultFormProps } from "@/components/form/_config";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  fields?: FormItem[];
  rowNum?: number; //筛选条件默认以几行展示
  extraParams?: CommonObj; //额外的请求参数
  onValuesChange?: (changedVals: CommonObj, allVals: CommonObj) => void;
  onFieldsChange?: (changedVals: CommonObj, allVals: CommonObj) => void;
  onSubmit?: (data: CommonObj, cb: () => void) => void;
  onReset?: () => void;
  [key: string]: any;
}
const colSpanAttrs: CommonObj = {
  xs: 24, // <576
  sm: 24, // >=576
  md: 12, // >=768
  lg: 12, // >=992
  xl: 8, // >=1200
  xxl: 6, // >=1600
};
//设置屏幕宽度类型
function getColNum() {
  const width = document.body.offsetWidth;
  const colNumMap: CommonObj = {};
  let size = "";
  for (let key in colSpanAttrs) {
    colNumMap[key] = 24 / colSpanAttrs[key];
  }
  if (width < 576) {
    size = "xs";
  } else if (width >= 576 && width < 768) {
    size = "sm";
  } else if (width >= 768 && width < 992) {
    size = "md";
  } else if (width >= 992 && width < 1200) {
    size = "lg";
  } else if (width >= 992 && width < 1600) {
    size = "xl";
  } else if (width >= 1600) {
    size = "xxl";
  }
  return colNumMap[size];
}
export default forwardRef((props: Props, ref: any) => {
  const {
    className = "",
    rowNum = 2,
    fields = [],
    extraParams,
    onValuesChange,
    onSubmit = (data: CommonObj) => showMessage(`暂未处理 【查询】事件 - onSubmit`, "warning"),
    onReset,
    ...restProps
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [colNum, setColNum] = useState(2);
  const [isFold, setIsFold] = useState(true);
  const labelWidth = getMaxLength(fields) + "em"; //label中最长字符的个数
  const formProps = Object.assign({}, defaultFormProps, restProps);
  const sliceEndInd = useMemo(() => {
    return isFold ? (colNum > 1 ? colNum * rowNum - 1 : 1 * rowNum) : undefined;
  }, [isFold, colNum, rowNum]);
  useEventListener("resize", () => setColNum(getColNum()), [], true);
  useImperativeHandle(ref, () => form);
  function handleReset() {
    form.resetFields();
    onReset?.();
  }
  return (
    <>
      {fields.length > 0 && (
        <Form
          form={form}
          className={`${className} ${s["query-form"]} f-fs-s-c`}
          onFinish={(args: CommonObj) => handleFinish(args, fields, props, { setLoading, fetchSuccess: () => {} })}
          onFinishFailed={handleFinishFailed}
          onValuesChange={onValuesChange}
          {...formProps}
        >
          <div
            className={`${s.bodyer} f-fs-fs-w all-hide-scroll`}
            style={{
              maxHeight: isFold ? (colNum > 1 ? rowNum : rowNum + 1) * 40 + "px" : "50vh",
            }}
          >
            {fields.slice(0, sliceEndInd).map((field, ind) => {
              if (!field) return null;
              return (
                <Col {...colSpanAttrs} key={ind}>
                  <BaseFormItem field={field as FormItemAttrs} style={{ marginBottom: "8px" }} labelWidth={labelWidth} />
                </Col>
              );
            })}
            <Col style={{ marginLeft: "auto" }} className="mb-8 f-fe-c" {...colSpanAttrs}>
              <Button loading={loading} icon={<SearchOutlined />} type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon={<RedoOutlined />} onClick={() => handleReset()} disabled={loading}>
                重置
              </Button>
              {fields.length > colNum * rowNum - 1 && (
                <Button
                  icon={<DownOutlined className={`${isFold ? "" : "rotate-180"} ${s["icon-fold"]}`} />}
                  onClick={() => setIsFold(!isFold)}
                  style={{ padding: 0 }}
                  type="link"
                  disabled={loading}
                >
                  折叠
                </Button>
              )}
            </Col>
          </div>
        </Form>
      )}
    </>
  );
});
