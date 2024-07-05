import { PopupContext } from "@/components/provider/PopupProvider";
import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { Button } from "antd";
import { useContext, useRef } from "react";
import Captcha from "./_components/Captcha";
import FindPassword from "./_components/FindPassword";
import Register from "./_components/Register";
import { useRouter, useStoreSpace } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { useLocation } from "react-router-dom";
import s from "./index.module.less";

const { VITE_APP_NAME } = import.meta.env;
const initVals = {
  phone: "18483221518",
  psd: "superAdmin123456",
};

export default () => {
  const { handleLoginIn } = useStoreSpace("user");
  const formRef = useRef();
  const router = useRouter();
  const location = useLocation();
  const { openPopup } = useContext(PopupContext);
  const fields: FormField[] = [
    {
      name: "phone",
      label: "账号",
      required: true,
      otherAttrs: {
        valid: "phone",
      },
    },
    {
      name: "psd",
      label: "密码",
      type: "Password",
      required: true,
      otherAttrs: {
        valid: "password",
      },
    },
    {
      name: "captcha",
      label: "验证码",
      type: "Custom",
      element: <Captcha name="captcha" formRef={formRef} />,
      required: true,
      rules: [{ min: 4, message: "验证码长度不足4位" }],
    },
  ];
  return (
    <div className={`${s.wrap} f-c-c`}>
      <div className={`${s["bounce-in"]} ${s["login-box"]}`}>
        <h1 className={`${s.head} f-c-c`}>{VITE_APP_NAME}</h1>
        <BaseForm
          ref={formRef}
          initialValues={initVals}
          size="large"
          fields={fields}
          onSubmit={(params: CommonObj) => handleLoginIn({ params, other: { router, location } })}
          submitButton="登录"
          className={`${s.body}`}
        />
        <div className={`${s.foot} f-sb-c`}>
          <Button
            onClick={() => openPopup({ title: "免费注册", placement: "left" }, <Register />)}
            className={s.btn}
            type="link"
            size="small"
          >
            免费注册
          </Button>
          <Button onClick={() => openPopup("找回密码", <FindPassword />)} className={s.btn} type="link" size="small">
            找回密码
          </Button>
        </div>
      </div>
    </div>
  );
};
