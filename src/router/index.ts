/**
 * 自定义路由映射后，可以使用 router.push({name: 'home',query:{}}) 方式进行页面跳转
 */

import { CommonObj } from "@/vite-env";
import base from "./modules/base";
import system from "./modules/system";

export default {
  ...base,
  ...system,
} as CommonObj;
