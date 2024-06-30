import { CommonObj } from "@/vite-env";

// 修改state的值
export function updateState(state: any, { payload }: CommonObj) {
  Object.assign(state, payload);
}
