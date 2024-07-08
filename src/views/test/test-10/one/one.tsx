/**
 * 测试10-1-1
 */

import { filterNames, getStorage, setStorage } from "@/store/_utils/_help";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";
import { CSSProperties } from "react";
// import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const state: CommonObj = {
  menu: {
    isFold: false,
    other: {
      name: "光宗耀祖",
    },
    list: [1, 2, 3],
    isNull: null,
    isUndefined: false,
  },
};
function updateState(payload: [string, any]) {
  const [key, val] = payload;
  const keys: string[] = key.split(".");
  let currState = state;
  let prevState = state;
  keys.forEach((k: string, i: number) => {
    if (i > 0) {
      prevState = currState;
    }
    currState = currState[k];
  });
  if (typeof currState === "object" && currState !== null) {
    Object.assign(currState, val);
  } else {
    const lastKey: string = keys.at(-1) as string;
    Object.assign(prevState, { [lastKey]: val });
  }
  // console.log(state, prevState, currState, "temState-------------------");
}

/***
 * 存储相关
 */
const locals = ["set", "set.isFold", "menu", "base", "sys.other", "sys.other.name", "sys.happy"];
// console.log(filterNames(locals), "比较-----2222222222222------");

// storage.setItem("test", state);
// console.log(getStorage("test1"), "getStorage---------------------");
// console.log(getStorage("test.ddd.oth"), "getStorage---------------------");
// console.log(getStorage("test.menu.isFold.data.isNull"), "getStorage---------------------");

// setStorage("test", state);
// setStorage("test.data.info.list", [{ id: 1, text: "1" }]);
// setStorage("test_1.info.data", state);
// storage.setItem("test_1.info.data", state);
// console.log(storage.getItem("test"), "test--------------");
export default ({ className = "", ...restProps }: Props) => {
  // updateState(["menu", { isFold: true, isUndefined: true, isNull: true }]);
  // updateState(["menu.other", { name: "五福盈门，笑脸迎开" }]);
  // updateState(["menu.list", [4, 5, 6]]);
  // updateState(["menu.isFold", true]);
  // updateState(["menu.isNull", false]);
  // updateState(["menu.isUndefined", false]);
  return (
    <div className={`${className}`} {...restProps}>
      测试10-1-1
    </div>
  );
};
