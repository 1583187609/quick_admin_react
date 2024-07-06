import http from "@/services/http";
import { CommonObj } from "@/vite-env";

/************ 用户相关 *************/

// 通用的获取数据（信息对象）接口
export const GetCommonDetail = (data?: CommonObj) => http("get", "/mock/common/detail", data);
