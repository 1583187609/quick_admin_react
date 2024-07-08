import { checkObjKeyError } from "@/utils";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";
import { SliceNames } from "..";
import { StorageType } from "@/components/_utils/common/storage";
import { current } from "@reduxjs/toolkit";

interface StorageConfig {
  localList: (SliceNames | string)[];
  sessionList: (SliceNames | string)[];
}
const config: StorageConfig = {
  localList: ["set"],
  sessionList: ["menu.isCollapse"],
};

/**
 * 修改state的值
 * 配置允许存储的白名单，黑名单后续再完善
 * @example payload 可以是对象，也可以是元祖[pathKey,val]
 */
export function updateState(state: any, res: CommonObj) {
  const { type, payload } = res;
  const name: SliceNames = type.split("/")[0];
  /**
   * 如果传入数组，例：[pathKey,val]，其中 pathKey 可以为a.b.c路径形式
   */
  if (Array.isArray(payload)) {
    const [key, val] = payload;
    const keys: string[] = key.split(".");
    let currState = state;
    let prevState = state;
    keys.forEach((k: string, i: number) => {
      if (i > 0) prevState = currState;
      currState = currState[k];
    });
    if (typeof currState === "object" && currState !== null) {
      checkObjKeyError(currState, val); // 是为了校验防止传参出错
      Object.assign(currState, val);
    } else {
      const lastKey: string = keys.at(-1) as string;
      checkObjKeyError(prevState, { [lastKey]: val }); // 是为了校验防止传参出错
      Object.assign(prevState, { [lastKey]: val });
    }
  } else {
    checkObjKeyError(state, payload); // 是为了校验防止传参出错
    Object.assign(state, payload);
  }
  // 配置允许存储的白名单，黑名单后续再完善
  const { localList, sessionList } = config;
  if (localList?.includes(name)) {
    storage.setItem(name, state); // 传入第三个参数 'session'，可以使用 sessionStorage 来存储，默认是 localStorage
  } else if (sessionList?.includes(name)) {
    storage.setItem(name, state, "session");
  }
}
