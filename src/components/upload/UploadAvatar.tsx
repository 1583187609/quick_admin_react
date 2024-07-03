import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { showMessage } from "../_utils";

interface Props {
  value?: string;
  formRef?: any;
  name?: string;
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    showMessage("只支持上传 JPG/PNG 格式!", "error");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    showMessage("图片大小不能超过 2MB!", "error");
  }
  return isJpgOrPng && isLt2M;
};
export default ({ value, formRef, name }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        formRef?.current?.setFieldValue({ [name as string]: url });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      //   listType="picture-card"
      listType="picture-circle"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? <img src={value} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
    </Upload>
  );
};
