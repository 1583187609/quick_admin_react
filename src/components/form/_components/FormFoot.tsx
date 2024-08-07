import { Button } from "antd";
import { RedoOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { getBtnProps } from "../_utils";
import { BtnAttrs } from "@/components/form/_types";
import { showMessage } from "@/components/_utils";

interface Props {
  className?: string;
  loading: boolean;
  submitButton?: string | BtnAttrs;
  resetButton?: string | BtnAttrs;
  readOnly: boolean;
  form?: any;
  afterReset?: () => void;
}

export default ({ className = "", loading, submitButton = "提交", resetButton = "重置", readOnly, form, afterReset }: Props) => {
  const submitBtn = getBtnProps(submitButton);
  const resetBtn = getBtnProps(resetButton);
  //点击重置按钮
  function handleReset() {
    if (readOnly) return showMessage("只读模式-不可重置", "info");
    form.resetFields();
    afterReset?.();
  }
  return (
    <div className={`${className} pt-h pb-h f-c-c f-0`}>
      {submitBtn.children && (
        <Button icon={<CloudUploadOutlined />} loading={loading} type="primary" htmlType="submit" {...submitBtn.attrs}>
          {submitBtn.children}
        </Button>
      )}
      {resetBtn.children && (
        <Button icon={<RedoOutlined />} htmlType="button" onClick={handleReset} disabled={loading} {...resetBtn.attrs}>
          {resetBtn.children}
        </Button>
      )}
    </div>
  );
};
