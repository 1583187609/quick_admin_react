/**
 * 自定义路由映射后，可以使用 router.push({name: 'home',query:{}}) 方式进行页面跳转
 */

import { CommonObj } from "@/vite-env";

export default {
  home: "/",
  login: "/login",
} as CommonObj;
