import { PostUserLogin } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { Button } from "antd";
import { useContext, useRef } from "react";
import Captcha from "./_components/Captcha";
import FindPassword from "./_components/FindPassword";
import Register from "./_components/Register";
// import { handleLoginIn } from "@/store/modules/user";
import { useDispatch } from "react-redux";
import s from "./index.module.less";
import { useRouter } from "@/hooks";

const initVals = {
  phone: "18483221518",
  psd: "admin123456",
};

const { VITE_APP_NAME } = import.meta.env;
export default () => {
  const formRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const { openPopup } = useContext(PopupContext);
  const fields: FieldItem[] = [
    { name: "phone", label: "账号", valid: "phone", required: true },
    {
      name: "psd",
      label: "密码",
      type: "Input.Password",
      valid: "password",
      required: true,
    },
    {
      name: "captcha",
      label: "验证码",
      type: "Custom",
      custom: <Captcha name="captcha" formRef={formRef} />,
      required: true,
      rules: [{ min: 4, message: "验证码长度不足4位" }],
    },
  ];
  //登录
  function handleSubmit(data: CommonObj, next: () => void) {
    // PostUserLogin(data).then((res: CommonObj) => {
    // next();
    // router.push("/");
    // dispatch(handleLoginIn(data) as any);
    // });
  }
  return (
    <div className={`${s.wrap} f-c-c`}>
      <div className={`${s["bounce-in"]} ${s["login-box"]}`}>
        <h1 className={`${s.head} f-c-c`}>{VITE_APP_NAME}</h1>
        <BaseForm
          ref={formRef}
          initialValues={initVals}
          size="large"
          fields={fields}
          onSubmit={handleSubmit}
          submitText="登录"
          className={`${s.body}`}
        ></BaseForm>
        <div className={`${s.foot} f-sb-c`}>
          <Button
            onClick={() =>
              openPopup({ title: "免费注册", placement: "left" }, <Register />)
            }
            className={s.btn}
            type="link"
            size="small"
          >
            免费注册
          </Button>
          <Button
            onClick={() => openPopup("找回密码", <FindPassword />)}
            className={s.btn}
            type="link"
            size="small"
          >
            找回密码
          </Button>
        </div>
      </div>
    </div>
  );
};
