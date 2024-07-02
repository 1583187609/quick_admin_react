import { Button, message } from "antd";
import { RedoOutlined, LoadingOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { CommonObj } from "@/vite-env";
import { getBtnProps } from "../_utils";
import { BtnAttrs } from "@/components/form/_types";

interface Props {
  loading: boolean;
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  readOnly: boolean;
  form?: any;
}

export default ({ loading, submitButton = "提交", resetButton = "重置", readOnly, form }: Props) => {
  const submitBtn = getBtnProps(submitButton);
  const resetBtn = getBtnProps(resetButton);
  //点击重置按钮
  function handleReset() {
    if (readOnly) return message.info("只读模式-不可重置");
    form.resetFields();
  }
  return (
    <div className={`pt-half pb-half f-c-c f-0`}>
      <Button icon={<CloudUploadOutlined />} loading={loading} type="primary" htmlType="submit" {...submitBtn.attrs}>
        {submitBtn.children}
      </Button>
      <Button icon={<RedoOutlined />} htmlType="button" onClick={() => handleReset()} {...resetBtn.attrs}>
        {resetBtn.children}
      </Button>
    </div>
  );
};
