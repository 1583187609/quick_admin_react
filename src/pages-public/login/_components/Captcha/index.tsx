import { GetUserCaptcha } from "@/api-mock";
import { Input, Form } from "antd";
import { useEffect, useState } from "react";
import s from "./index.module.less";

interface Props {
  name: string;
  formRef: any;
}
export default ({ name, formRef }: Props) => {
  const [captcha, setCaptcha] = useState("");
  useEffect(() => {
    getCaptcha();
  }, []);
  function getCaptcha() {
    GetUserCaptcha().then((res: any) => {
      setCaptcha(res);
    });
  }
  function handleChange(e: any) {
    formRef?.current?.setFieldValue("captcha", e.target.value);
  }
  return (
    <div className="f-sb-fs">
      <Form.Item className="mb-0" name={name}>
        <Input
          className="f-1"
          maxLength={4}
          placeholder="请输入验证码"
          onChange={handleChange}
          allowClear
        />
      </Form.Item>
      <div onClick={getCaptcha} className={`${s.captcha} ml-16 f-0 f-c-c`}>
        {captcha}
      </div>
    </div>
  );
};
