/**
 * 增删改查-查询条件-表单组件
 * xs	屏幕 < 576px
 * sm	屏幕 ≥ 576px
 * md	屏幕 ≥ 768px
 * lg	屏幕 ≥ 992px
 * xl	屏幕 ≥ 1200px
 * xxl	屏幕 ≥ 1600px
 */

import { useState, forwardRef } from "react";
import { Button, Form, Col } from "antd";
import { CSSProperties } from "react";
import BaseFormItem, { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { RedoOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons";
import { getMaxLength, getScreenSizeType } from "@/components/_utils";
import { useEventListener } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { useInitForm } from "@/components/form/_hooks";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  initialValues?: CommonObj;
  labelCol?: CommonObj;
  wrapperCol?: CommonObj;
  fields?: FormField[];
  rowNum?: number; //筛选条件默认以几行展示
  extraParams?: CommonObj; //额外的请求参数
  onValuesChange?: (changedVals: CommonObj, allVals: CommonObj) => void;
  onFieldsChange?: (changedVals: CommonObj, allVals: CommonObj) => void;
  onSubmit?: (data: CommonObj, cb: () => void) => void;
  afterReset?: () => void;
  [key: string]: any;
}
const colSpanAttrs: CommonObj = {
  xs: 24, // <576
  sm: 24, // >=576
  md: 12, // >=768
  lg: 8, // >=992
  xl: 6, // >=1200
  xxl: 4, // >=1600
};
//设置屏幕宽度类型
function getColNum() {
  const colNumMap: CommonObj = {};
  for (let key in colSpanAttrs) {
    colNumMap[key] = 24 / colSpanAttrs[key];
  }
  return colNumMap[getScreenSizeType()];
}
export default forwardRef((props: Props, ref: any) => {
  const {
    className,
    rowNum = 2,
    afterReset,
    loading,
    submitButton,
    resetButton,
    fields,
    pureText,
    readOnly,
    formAttrs,
  } = useInitForm(props, ref);
  const labelWidth = getMaxLength(fields) + "em";
  const [colNum, setColNum] = useState(2);
  const [isFold, setIsFold] = useState(true);
  const sliceEndInd = isFold ? (colNum > 1 ? colNum * rowNum - 1 : 1 * rowNum) : undefined;
  useEventListener("resize", () => setColNum(getColNum()), [], true);
  function handleReset() {
    formAttrs.form.resetFields();
    afterReset?.();
  }
  return (
    <>
      {fields.length > 0 && (
        <Form className={`${className} ${s["query-form"]} f-fs-s-c`} {...formAttrs}>
          <div
            className={`${s.bodyer} f-fs-fs-w all-hide-scroll`}
            style={{
              maxHeight: isFold ? (colNum > 1 ? rowNum : rowNum + 1) * 40 + "px" : "50vh",
            }}
          >
            {fields.slice(0, sliceEndInd).map((field: FormField, ind: number) => {
              if (!field) return null;
              return (
                <Col {...colSpanAttrs} key={ind}>
                  <BaseFormItem field={field as FormFieldAttrs} style={{ marginBottom: "8px" }} labelWidth={labelWidth} />
                </Col>
              );
            })}
            <Col style={{ marginLeft: "auto" }} className="mb-8 f-fe-c" {...colSpanAttrs}>
              <Button loading={loading} icon={<SearchOutlined />} type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon={<RedoOutlined />} onClick={handleReset} disabled={loading}>
                {resetButton}
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
