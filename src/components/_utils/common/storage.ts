/********************************************************************/
/***** 构造cookie存储，让api跟localStorage、sessionStorage保持一致 *****/
/********************************************************************/

export type StorageType = "local" | "session" | "cookie";
const cookieStorage = {
  setItem(key: string, val: any, hours = 24) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 3600 * 1000);
    document.cookie = key + "=" + val + ";expires=" + date.toUTCString();
  },
  getItem(key: string) {
    const arrCookie = document.cookie.split(";");
    let val = null;
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split("=");
      if (key == arr[0]) {
        val = arr[1];
        break;
      }
    }
    return val;
  },
  removeItem(key: string) {
    const date = new Date();
    date.setTime(date.getTime() - 1000);
    document.cookie = key + "=0; expires =" + date.toUTCString();
  },
  clear() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--; ) document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  },
};
interface StorageMap {
  [key: string]: any;
}
//定义一个映射关系，方便下面直接动态赋予属性
const storageMap: StorageMap = {
  cookieStorage,
  localStorage,
  sessionStorage,
};
export default {
  /**
   * 存数据
   * @param key {String} 要存储数据的键名
   * @param val {*} 要存储的数据值
   * @param type {String} 存储类型：local, session, cookie
   * @param hours {Number} cookie的过期时间，只有当type为cookie时，才会用到这个参数
   */
  setItem(key: string, val: any, type: StorageType = "local", hours?: number) {
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    return storageMap[type + "Storage"].setItem(key, val, hours);
  },
  /**
   * 取数据
   * @param key {String} 要取数据的键名
   * @param type {String} 存储类型：local, session, cookie
   */
  getItem(key: string, type: StorageType = "local") {
    let val = storageMap[type + "Storage"].getItem(key);
    if (val === null) return null;
    if (val === "undefined") return;
    if (val === "false") return false;
    if (val === "true") return true;
    if (val.startsWith("{") || val.startsWith("[")) {
      val = JSON.parse(val);
    }
    return val;
  },
  /**
   * 删除指定键名对应的数据
   * @param key {String} 要删除数据的键名
   * @param type {String} 删除类型：local, session, cookie
   */
  removeItem(key: string, type: StorageType = "local") {
    return storageMap[type + "Storage"].removeItem(key);
  },
  /**
   * 删除所有存储数据
   * @param type
   */
  clear(type: StorageType = "local") {
    return storageMap[type + "Storage"].clear();
  },
  /**
   * 删除所有存储的键名
   * @param type
   */
  getKeys(type: StorageType = "local") {
    return Object.keys(storageMap[type + "Storage"]);
  },
};
