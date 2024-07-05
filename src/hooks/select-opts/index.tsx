import CompanyOption from "./_components/CompanyOption";
import { GetOptionsSchool, GetOptionsCompany } from "@/api-mock";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export type SelectSearchType = "school" | "company";

const typeMap: CommonObj = {
  school: {
    reqNameKey: "name",
    resValKey: "id", //跟下方的handleItem中的value对应的键名保持一致
    fetchApi: GetOptionsSchool,
    defaultField: { prop: "xx", label: "学校", type: "select" },
    handleItem(item: CommonObj) {
      const { name, id } = item;
      return { label: name, value: id };
    },
  },
  company: {
    reqNameKey: "name",
    resValKey: "id",
    fetchApi: GetOptionsCompany,
    defaultField: { prop: "gs", label: "公司", type: "select" },
    handleItem(item: CommonObj) {
      const { fullName, shortName, id } = item;
      return {
        label: fullName,
        value: id,
        shortName,
      };
    },
  },
};

export default () => {
  /**
   * 获取输入并搜索的下拉项
   * @tips 作为 "school" | "company" 两个搜索下拉项的整合
   */
  function getSearchOpts(
    type: SelectSearchType,
    field: FormFieldAttrs,
    name?: string,
    cb?: (val: StrNum, row: CommonObj) => void
  ) {
    if (!typeMap[type]) throw new Error(`不存在type为${type}的类型`);
    const { fetchApi, defaultField, handleItem, reqNameKey = "name", resValKey = "id", extraParams } = typeMap[type];

    const [loading, setLoading] = useState(false);
    const [opts, setOpts] = useState<OptionItem[]>([]);
    const [value, setValue] = useState<string>();

    const fetchOpts = (val: string = "") => {
      setLoading(true);
      fetchApi({ [reqNameKey]: val, ...extraParams })
        .then((res: any[]) => {
          const resList = res || [];
          setOpts(resList.map(handleItem));
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleChange = (val: string) => {
      setValue(val);
      if (!cb) return;
      const target = opts.find((it: CommonObj) => it.value === val) as CommonObj;
      cb(val, target);
    };

    useEffect(() => {
      name && fetchOpts(name);
    }, []);

    return {
      ...{ ...defaultField, ...field },
      attrs: {
        value,
        options: opts,
        // optionRender: (option: CommonObj) => {
        //   // console.log(option, "option--------------");
        //   return <CompanyOption fullName="" shortName="" />;
        // },
        showSearch: true,
        // suffixIcon: null,
        // filterOption: false,
        notFoundContent: loading ? <Spin size="small" /> : null,
        onSearch: fetchOpts,
        onFocus: (e: Event) => fetchOpts(),
        onChange: handleChange,
      },
    };
  }

  return {
    getSearchOpts,
  };
};
