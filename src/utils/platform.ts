import { storage } from "@/utils";

//获取用户信息
export function getUserInfo() {
  const info = storage.getItem("userInfo") || {};
  const { id = "", name = "", nickname = "", type_text = "" } = info;
  info._title = name || nickname || type_text + id;
  return info;
}
