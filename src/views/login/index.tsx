import { PopupContext } from "@/components/provider/PopupProvider";
import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { Button } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import Captcha from "./_components/Captcha";
import FindPassword from "./_components/FindPassword";
import Register from "./_components/Register";
import { useRouter, useStoreSlice } from "@/hooks";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import { useLocation } from "react-router-dom";
import { GetUserLoginAccounts } from "@/api-mock";
import s from "./index.module.less";
import { storage } from "@/utils";

const { VITE_APP_NAME } = import.meta.env;

export default () => {
  const storeAccount = storage.getItem("rememberAccount");
  const initVals = {
    phone: storeAccount?.phone ?? "18483221518",
    psd: storeAccount?.psd ?? "superAdmin12345",
    captcha: "",
    remember: !!storeAccount,
  };
  const formRef = useRef();
  const router = useRouter();
  const location = useLocation();
  const { handleLoginIn } = useStoreSlice("user");
  const [model, setModel] = useState<CommonObj>(initVals);
  const [accountOpts, setAccountOpts] = useState<OptionItem[]>([]);
  const { openPopup } = useContext(PopupContext);

  const fields: FormField[] = [
    {
      name: "phone",
      label: "账号",
      required: true,
      type: "AutoComplete",
      attrs: {
        placeholder: "请输入账号 / 手机号",
        options: accountOpts,
        onSelect: handleSelect,
      },
      otherAttrs: {
        valid: /^\d/.test(model.phone) ? "phone" : undefined,
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
      render: (attrs: any) => <Captcha name="captcha" formRef={formRef} {...attrs} />,
      required: true,
      rules: [{ min: 4, message: "验证码长度不足4位" }],
    },
    {
      name: "remember",
      label: "记住我",
      type: "Checkbox",
    },
  ];
  useEffect(() => {
    getAccountOpts();
  }, []);
  function getAccountOpts() {
    GetUserLoginAccounts().then((res: any) => {
      const opts = res.map((item: CommonObj) => {
        const { account, ...rest } = item;
        return { value: account, ...rest };
      });
      setAccountOpts(opts);
    });
  }
  function handleSelect(val: StrNum, opt: CommonObj) {
    formRef.current?.form?.setFieldValue("psd", opt.psd);
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
          onSubmit={(params: CommonObj) => handleLoginIn({ params, other: { router, location } })}
          submitButton="登录"
          onValuesChange={(vals: CommonObj, allVals: CommonObj) => setModel(allVals)}
          className={`${s.body}`}
        />
        <div className={`${s.foot} f-sb-c`}>
          <Button
            onClick={() => openPopup({ title: "免费注册", placement: "left" }, <Register />, "drawer")}
            className={s.btn}
            type="link"
            size="small"
          >
            免费注册
          </Button>
          <Button
            onClick={() => openPopup({ title: "找回密码", placement: "right" }, <FindPassword />, "drawer")}
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
