import base from "./modules/base";
import other from "./modules/other";
import system from "./modules/system";

export * from "./_config";
export * from "./_types";
export * from "./cascader";

/**
 * 字典映射集合
 */

export default {
  ...base,
  ...other,
  ...system,
};
