import yapiFilesData from "../yapi/filesData.js";
import eolinkFilesData from "../eolink/filesData.js";
import { defaultOpts as yapiDefaultOpts } from "../yapi/consts.js";
import { defaultOpts as eolinkDefaultOpts } from "../eolink/consts.js";
import { getApiFilesStrs as yapiGetApiFilesStrs } from "../yapi/methods.js";
import { getApiFilesStrs as eolinkGetApiFilesStrs } from "../eolink/methods.js";
const filesDataMap = {
  yapi: yapiFilesData,
  eolink: eolinkFilesData,
};
const defaultOptsMap = {
  yapi: yapiDefaultOpts,
  eolink: eolinkDefaultOpts,
};
const getApiFilesStrsMap = {
  yapi: yapiGetApiFilesStrs,
  eolink: eolinkGetApiFilesStrs,
};
export function getFilesData(type) {
  return filesDataMap[type];
}
export function getDefaultOpts(type) {
  return defaultOptsMap[type];
}
export function getApiFilesStrsByType(type) {
  return getApiFilesStrsMap[type];
}
