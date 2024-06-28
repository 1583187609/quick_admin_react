import { PostUserLogin } from "@/api-mock";
import { PopupContext } from "@/components/provider/PopupProvider";
import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { Button, notification } from "antd";
import { useContext, useRef } from "react";
import Captcha from "./_components/Captcha";
import FindPassword from "./_components/FindPassword";
import Register from "./_components/Register";
import { handleLoginIn } from "@/store/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { userStore, menuStore, dictStore } from "@/store";
import s from "./index.module.less";
import { MenuItem } from "@/layout/_components/TheMenu";
import { useRouter } from "@/hooks";

// const { loginIn } = userStore;
const initVals = {
  phone: "18483221518",
  psd: "admin123456",
};

const { VITE_APP_NAME } = import.meta.env;
export default () => {
  const user = useSelector((state) => state?.user?.userInfo);
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
  function handleSubmit(data: CommonObj) {
    dispatch(handleLoginIn(data) as any).then(
      async ({ payload }: CommonObj) => {
        const { navs } = payload;
        dispatch(menuStore.initAllMenus(navs));
        // await dispatch(dictStore.initMap([]));
        router.push("/");
        notification.success({
          closeIcon: false,
          placement: "topRight",
          message: "登录成功",
          description: `欢迎回来，${user?.name ?? "XXX"}`,
          duration: 1.5, //单位：秒
        });
      }
    );
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
