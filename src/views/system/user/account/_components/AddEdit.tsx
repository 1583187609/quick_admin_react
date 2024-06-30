import { FieldItem } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useEffect, useRef, useState } from "react";
import { GetUserInfo, PostMockCommon } from "@/api-mock";
// import { useDictMap } from "@/hooks";
import UploadAvatar from "@/components/upload/UploadAvatar";
import { CommonObj, OptionItem } from "@/vite-env";
import { useStoreSpace } from "@/hooks";

interface Props {
  id?: string;
  pureText?: boolean;
  refresh?: () => void;
}
function getFields({
  isAdd = false,
  genderOpts,
  regionOpts,
  roleTypeOpts,
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
            label: "昵称",
            attrs: {
              pureText: true,
            },
          },
        ]),
    {
      name: "name",
      label: "姓名",
      valid: "userName",
    },
    {
      name: "type",
      label: "类型",
      type: "Select",
      attrs: {
        options: roleTypeOpts,
      },
    },
    {
      name: "sex",
      label: "性别",
      type: "Radio.Group",
      attrs: {
        options: genderOpts,
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
        options: regionOpts,
      },
    },
    { name: "phone", label: "电话", valid: "phone", required: true },
  ];
}

export default ({ id, pureText, refresh }: Props) => {
  const { getOpts } = useStoreSpace("dict");
  const formRef = useRef();
  const [loadData, setLoadData] = useState<CommonObj>();
  const genderOpts = [] ?? getOpts("Gender");
  const regionOpts = [] ?? getOpts("Region");
  const roleTypeOpts = [] ?? getOpts("RoleType");
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
    PostMockCommon(data).then((res: CommonObj) => {
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
        genderOpts,
        regionOpts,
        roleTypeOpts,
        formRef,
      })}
      loadData={loadData}
      pureText={pureText}
      onSubmit={handleSubmit as () => void}
    />
  );
};
