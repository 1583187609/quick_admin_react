import { FieldItem } from "@/components/BaseFormItem";
import BaseAvatar from "@/components/BaseAvatar";
import BaseForm from "@/components/form/BaseForm";
import { useContext, useEffect, useRef, useState } from "react";
import { GetUserInfo, PostUserSubmit } from "@/api-mock";
// import { useDictMap } from "@/hooks";
import { PopupContext } from "@/components/provider/PopupProvider";
import UploadAvatar from "@/components/upload/UploadAvatar";
import { CommonObj, OptionItem } from "@/vite-env";

interface Props {
  id?: string;
  disabled?: boolean;
  refresh?: () => void;
}
function getFields({
  isAdd = false,
  sexOpts,
  addressOpts,
  userTypeOpts,
  formRef,
}: CommonObj): FieldItem[] {
  return [
    {
      name: "avatar",
      label: "头像",
      type: "Custom",
      custom: <UploadAvatar name="avatar" formRef={formRef} />,
    },
    ...(isAdd
      ? []
      : [
          {
            name: "nickname",
            label: "用户昵称",
            attrs: {
              disabled: true,
            },
          },
        ]),
    { name: "phone", label: "电话", valid: "phone", required: true },
    {
      name: "name",
      label: "姓名",
      valid: "userName",
      required: true,
    },
    {
      name: "type",
      label: "用户类型",
      type: "Select",
      attrs: {
        options: userTypeOpts,
      },
    },
    {
      name: "sex",
      label: "性别",
      type: "Radio.Group",
      attrs: {
        options: sexOpts,
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "InputNumber",
      valid: "age",
      attrs: {
        max: 100,
        min: 0,
        maxLength: 3,
      },
    },
    {
      name: "address",
      label: "地址",
      type: "Cascader",
      attrs: {
        options: addressOpts,
      },
    },
  ];
}

export default ({ id, disabled, refresh }: Props) => {
  const formRef = useRef();
  // const { getOpts } = useDictMap();
  const [loadData, setLoadData] = useState<CommonObj>();
  const sexOpts:OptionItem[] = []; // getOpts("sex");
  const addressOpts:OptionItem[] = []; // getOpts("address");
  const userTypeOpts:OptionItem[] = []; // getOpts("userType");
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  //获取详情数据
  function getDetail(id: string) {
    GetUserInfo({ id }).then((res: CommonObj) => {
      setLoadData(res);
    });
  }
  //点击提交按钮
  function handleSubmit(data: any, next: (msg?: string) => void): void {
    PostUserSubmit(data).then((res: CommonObj) => {
      refresh?.();
      next();
    });
  }
  return (
    <BaseForm
      ref={formRef}
      initialValues={!id ? { sex: 0 } : undefined}
      style={{ width: "450px" }}
      fields={getFields({
        isAdd: !id,
        sexOpts,
        addressOpts,
        userTypeOpts,
        formRef,
      })}
      loadData={loadData}
      disabled={disabled}
      // onSubmit={PostUserSubmit}
      onSubmit={handleSubmit as () => void}
    />
  );
};
