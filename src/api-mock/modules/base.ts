import http from "@/services/http";
import { CommonObj } from "@/vite-env";

/************ select 下拉项 *************/
//获取学校列表数据
export const GetOptionsSchool = (data?: CommonObj) => http("get", "/options/school", data);
//获取公司列表数据
export const GetOptionsCompany = (data?: CommonObj) => http("get", "/options/company", data);

/************ cascader 下拉项 *************/
// 获取mock 地区省市区县
export const GetCascaderRegion = (data?: CommonObj) => http("get", "/cascader/region", data);
