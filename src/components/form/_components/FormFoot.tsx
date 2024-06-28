import { Button, message } from "antd";
import {
  RedoOutlined,
  LoadingOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

interface Props {
  loading: boolean;
  submitText?: string;
  resetText?: string;
  readOnly: boolean;
  loadData?: CommonObj;
  newLoadData?: CommonObj;
  form?: any;
}
export default ({
  loading,
  submitText = "提交",
  resetText = "重置",
  readOnly,
  loadData,
  newLoadData,
  form,
}: Props) => {
  //点击重置按钮
  function handleReset() {
    if (readOnly) return message.info("只读模式-不可重置");
    if (loadData) {
      form.setFieldsValue(newLoadData);
    } else {
      form.resetFields();
    }
  }
  return (
    <div className={`pt-half pb-half f-c-c f-0`}>
      <Button
        // loading ? <LoadingOutlined /> : <CloudUploadOutlined />
        icon={<CloudUploadOutlined />}
        loading={loading}
        type="primary"
        htmlType="submit"
      >
        {submitText}
      </Button>
      <Button
        icon={<RedoOutlined />}
        htmlType="button"
        onClick={() => handleReset()}
      >
        {resetText}
      </Button>
    </div>
  );
};
