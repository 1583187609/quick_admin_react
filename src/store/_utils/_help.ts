/***
 * 存储相关
 */

import { StorageType } from "@/components/_utils/common/storage";
import { storage } from "@/utils";
import { CommonObj } from "@/vite-env";

/**
 * 过滤可能重复的 slice 路径
 * @param names
 * @returns
 */
export function filterNames(names: string[]) {
  names.sort();
  const arr: string[] = [];
  names.forEach((name: string, ind: number) => {
    if (ind === 0) return arr.push(name);
    if (!name.includes(arr.at(-1) as string)) arr.push(name);
  });
  return arr;
}

/**
 * 获取本地存储数据
 */
export function getStorage(key: string, type?: StorageType) {
  const [name, ...keys] = key.split(".");
  const item = storage.getItem(name, type);
  if (!keys.length) return item;
  if (!item) return item;
  let currItem = item;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    currItem = currItem[k];
    if (currItem === undefined) return currItem;
  }
  return currItem;
}

/**
 * 设置本地存储数据
 */
export function setStorage(key: string, val: any, type?: StorageType) {
  const [name, ...keys] = key.split(".");
  if (!keys.length) return storage.setItem(name, val, type);
  const item = storage.getItem(name, type);
  if (item) {
    let currState = item;
    let prevState = item;
    keys.forEach((k: string, i: number) => {
      if (i > 0) prevState = currState;
      currState = currState[k];
      if (currState === undefined) {
        console.log(k, "kkkk------------");
        // currState = {};
      }
    });
    if (typeof currState === "object" && currState !== null) {
      Object.assign(currState, val);
    } else {
      const lastKey: string = keys.at(-1) as string;
      Object.assign(prevState, { [lastKey]: val });
    }
    storage.setItem(name, item, type);
  } else {
    const obj: CommonObj = { [name]: {} };
    let nextState = obj[name];
    let prevState = obj;
    keys.forEach((k: string, i: number) => {
      if (i === keys.length - 1) {
        nextState[k] = val;
      } else {
        nextState[k] = {};
        nextState = nextState[k];
      }
    });
    storage.setItem(name, obj, type);
  }
}
