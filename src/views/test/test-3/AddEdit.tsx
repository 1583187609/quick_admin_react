import { FormField } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useEffect, useRef, useState } from "react";
import { GetUserInfo, PostMockCommon } from "@/api-mock";
import UploadAvatar from "@/components/upload/UploadAvatar";
import { CommonObj } from "@/vite-env";

interface Props {
  id?: string;
  disabled?: boolean;
  refreshList?: () => void;
}
function getFields({ isAdd = false, formRef }: CommonObj): FormField[] {
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
      otherAttrs: {
        valid: "phone",
      },
    },
    {
      name: "name",
      label: "姓名",
      required: true,
      otherAttrs: {
        valid: "userName",
      },
    },
    {
      name: "type",
      label: "用户类型",
      type: "Select",
      attrs: {
        options: "RoleType",
      },
    },
    {
      name: "gender",
      label: "性别",
      type: "Radio.Group",
      attrs: {
        options: "Gender",
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
      otherAttrs: {
        valid: "age",
      },
    },
    {
      name: "address",
      label: "地址",
      type: "Cascader",
      attrs: {
        options: "Region",
      },
    },
  ];
}

export default ({ id, disabled, refreshList }: Props) => {
  const formRef = useRef();
  const [initVals, setInitVals] = useState<CommonObj | null>(id ? null : { gender: 0 });
  useEffect(() => {
    id && getDetail(id);
  }, [id]);
  //获取详情数据
  function getDetail(id: string) {
    GetUserInfo({ id }).then((res: CommonObj) => {
      setInitVals(res);
    });
  }
  return (
    (id ? !!initVals : true) && (
      <BaseForm
        ref={formRef}
        initialValues={initVals}
        style={{ width: "450px" }}
        fields={getFields({
          isAdd: !id,
          formRef,
        })}
        disabled={disabled}
        fetch={PostMockCommon}
        fetchSuccess={refreshList}
      />
    )
  );
};
