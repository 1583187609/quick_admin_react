import { FormField } from "@/components/BaseFormItem";
import BaseAvatar from "@/components/BaseAvatar";
import BaseForm from "@/components/form/BaseForm";
import { useContext, useEffect, useRef, useState } from "react";
import { GetUserInfo, PostMockCommon } from "@/api-mock";
import UploadAvatar from "@/components/upload/UploadAvatar";
import { CommonObj, OptionItem } from "@/vite-env";
import { useStoreSpace } from "@/hooks";

interface Props {
  id?: string;
  disabled?: boolean;
  refresh?: () => void;
}
function getFields({ isAdd = false, genderOpts, regionOpts, roleTypeOpts, formRef }: CommonObj): FormField[] {
  return [
    {
      name: "avatar",
      label: "头像",
      type: "Custom",
      element: <UploadAvatar name="avatar" formRef={formRef} />,
    },
    !isAdd && {
      name: "nickname",
      label: "用户昵称",
      attrs: {
        disabled: true,
      },
    },
    {
      name: "phone",
      label: "电话",
      required: true,
      extraAttrs: {
        valid: "phone",
      },
    },
    {
      name: "name",
      label: "姓名",
      required: true,
      extraAttrs: {
        valid: "userName",
      },
    },
    {
      name: "type",
      label: "用户类型",
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
      attrs: {
        max: 100,
        min: 0,
        maxLength: 3,
      },
      extraAttrs: {
        valid: "age",
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
  ];
}

export default ({ id, disabled, refresh }: Props) => {
  const formRef = useRef();
  const { getOpts, getCascaderOpts } = useStoreSpace("dict");
  const [loadData, setLoadData] = useState<CommonObj>();
  const genderOpts = getOpts("Gender");
  const regionOpts = getCascaderOpts("Region");
  const roleTypeOpts = getOpts("RoleType");
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
      disabled={disabled}
      // onSubmit={PostMockCommon}
      onSubmit={handleSubmit as () => void}
    />
  );
};
