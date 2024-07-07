import React, { CSSProperties, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { showMessage } from "../_utils";
import { upperCase } from "lodash";

interface Props {
  className?: string;
  style?: CSSProperties;
  value?: string;
  accept?: string;
  maxSize?: number; //允许上传的最大尺寸
  onChange?: UploadProps["onChange"];
  [key: string]: any;
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const defaultUploadAttrs = {
  name: "avatar",
  accept: "image/png,image/jpeg,image/jpg",
  listType: "picture-circle",
  showUploadList: false,
};
// 获取大小及其单位
function getSizeUnit(size: number) {
  const kb = size / 1024;
  if (kb < 1024) return kb + "KB";
  const mb = kb / 1024;
  return mb + "MB";
}
export default ({ className = "", maxSize = 1024 * 1024 * 2, value, ...restProps }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>(value);
  const newAttrs = Object.assign({}, defaultUploadAttrs, restProps);

  const beforeUpload = (file: RcFile) => {
    const { type, size } = file;
    const types = newAttrs.accept.split(",");
    const isAccept = types.includes(type);
    const typeStr = types.map((it: string) => upperCase(it.split("/")[1])).join("/");
    if (!isAccept) {
      showMessage(`只支持上传 ${typeStr} 图片格式!`, "error");
      return false;
    }
    const isLt2M = size <= maxSize;
    if (!isLt2M) {
      showMessage(`图片大小不能超过 ${getSizeUnit(maxSize)}!`, "error");
      return false;
    }
    return true;
  };

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url: string) => {
        setLoading(false);
        setImgUrl(url);
      });
    }
  };

  return (
    <Upload
      className={`${className}`}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      {...newAttrs}
    >
      {imgUrl ? (
        <img src={imgUrl} alt="avatar" style={{ width: "100%", borderRadius: "50%" }} />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传头像</div>
        </div>
      )}
    </Upload>
  );
};
