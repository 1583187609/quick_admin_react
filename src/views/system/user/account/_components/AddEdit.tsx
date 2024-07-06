import { FormField, StandardFormFieldAttrs } from "@/components/BaseFormItem";
import BaseForm from "@/components/form/BaseForm";
import { useEffect, useRef, useState } from "react";
import { GetUserInfo, PostMockCommon } from "@/api-mock";
import UploadAvatar from "@/components/upload/UploadAvatar";
import { CommonObj } from "@/vite-env";

interface Props {
  data?: CommonObj;
  refreshList?: () => void;
}

function getFields({ isAdd = false, formRef }: CommonObj): FormField[] {
  return [
    {
      name: "avatar",
      label: "头像",
      type: "Custom",
      render: (attrs: StandardFormFieldAttrs) => <UploadAvatar name="avatar" {...attrs} formRef={formRef} />,
    },
    !isAdd && {
      name: "nickname",
      label: "昵称",
      attrs: {},
    },
    {
      name: "name",
      label: "姓名",
      otherAttrs: {
        valid: "userName",
      },
    },
    {
      name: "type",
      label: "类型",
      type: "Select",
      attrs: {
        options: "RoleType",
      },
    },
    {
      name: "gender",
      label: "性别",
      type: "RadioGroup",
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
    {
      name: "phone",
      label: "电话",
      required: true,
      otherAttrs: {
        valid: "phone",
      },
    },
  ];
}

/**
 * 直接传入 data 的处理方式
 */
// export default ({ data, refreshList }: Props) => {
//   const formRef = useRef();
//   const initVals = Object.assign({ type: 3, gender: 1, age: 18 }, data);
//   return (
//     <BaseForm
//       ref={formRef}
//       initialValues={initVals}
//       style={{ width: "450px" }}
//       fields={getFields({
//         isAdd: !data,
//         formRef,
//       })}
//       fetch={PostMockCommon}
//       fetchSuccess={refreshList}
//     />
//   );
// };

/**
 * 通过 id 请求接口的处理方式
 */
export default ({ data, refreshList }: Props) => {
  const formRef = useRef();
  const [initVals, setInitVals] = useState<CommonObj | null>(data ? null : { type: 3, gender: 1, age: 18 });
  useEffect(() => {
    data && getDetail(data.id);
  }, [data]);
  //获取详情数据
  function getDetail(id: string) {
    GetUserInfo({ id }).then((res: CommonObj) => {
      setInitVals(res);
    });
  }
  return (
    (data ? !!initVals : true) && (
      <BaseForm
        ref={formRef}
        initialValues={initVals}
        style={{ width: "450px" }}
        fields={getFields({
          isAdd: !data,
          formRef,
        })}
        fetch={PostMockCommon}
        fetchSuccess={refreshList}
      />
    )
  );
};
