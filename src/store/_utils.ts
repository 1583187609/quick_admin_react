// import { checkObjKeyError } from "@/utils";
// import { storage } from "@/utils";
import { typeOf } from "#/mock/utils";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";
import { SliceNames, sliceMap } from "@/store";

// 修改state的值
export function updateState(state: any, { payload }: CommonObj) {
  // checkObjKeyError(defaultSet[name], obj); // 是为了校验防止传参出错
  if (typeOf(payload) === "Array") {
    const [key, value, name] = payload;
    Object.assign(state[key], value);
    if (!name) return;
    if (!sliceMap[name as SliceNames]) throw new Error(`sliceStore的name错误，请检查：${name}`);
    storage.setItem(name, state);
  } else {
    Object.assign(state, payload);
  }
}
