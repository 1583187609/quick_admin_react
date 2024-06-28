import { Form, InputNumber, message } from "antd";
import { merge } from "lodash";

interface Props {
  //下面四个是默认会自动传入的属性
  id?: string; //以数组形式回传值
  value?: string;
  onBlur?: () => void;
  onChange?: () => void;
  //两个控件的name数组值，以对象的两个属性回传值
  names?: [string, string];
  //这是手动传入的表单控件的属性
  attrs?: {
    min?: number;
    max?: number;
    [key: string]: any;
  };
}
const defaultAttrs = {
  min: 0,
  style: { width: "100%" },
};
export default ({ id = "", names, attrs }: Props) => {
  const newAttrs = merge({}, defaultAttrs, attrs);
  let [minName, maxName] = names || [
    [id, 0],
    [id, 1],
  ];
  const rules = [
    ({ getFieldValue }: CommonObj) => ({
      validator(obj: CommonObj, value: number) {
        const minVal = getFieldValue(minName);
        const maxVal = getFieldValue(maxName);
        if (minVal === undefined || maxVal === undefined) {
          return Promise.resolve();
        } else {
          if (minVal > maxVal) {
            message.error("最小值不能超过最大值");
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      },
    }),
  ];
  return (
    <div className="f-fs-fs">
      <Form.Item name={minName} className="f-1 mb-0" rules={rules}>
        <InputNumber placeholder="最小值" {...newAttrs} />
      </Form.Item>
      <span className="f-0 ml-8 mr-8" style={{ lineHeight: "30px" }}>
        -
      </span>
      <Form.Item name={maxName} className="f-1 mb-0" rules={rules}>
        <InputNumber placeholder="最大值" {...newAttrs} />
      </Form.Item>
    </div>
  );
};
