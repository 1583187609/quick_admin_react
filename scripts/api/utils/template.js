import { t, n, br } from "./consts.js";

//index文件头部注释模板
export function getIndexHeadAnnoTpl(name = "", total = 0) {
  return `/**${br}
 * 本文件为自动生成，不可手动更改${br}
 * @projectName ${name}${br}
 * @total ${total}${br}
 */${n}${n}`;
  // * @updateTime ${new Date().toLocaleString()}${br}
}

//每个api文件头部注释模板
export function getFileHeadAnnoTpl(data, httpPath) {
  const { title, total } = data;
  return `/**${br}
 * 本文件为自动生成，不可手动更改${br}
 * @title ${title}${br}
 * @total ${total}${br}
 */${br}
import http from '${httpPath}';${n}${n}`;
  //  * @updateTime ${new Date().toLocaleString()}${br}
}

//单个api头部注释模板
export function getApiHeadAnnoTpl(data, isBrief = false) {
  const { title, desc, author, createTime, updateTime } = data;
  if (isBrief) {
    return `/**
 * ${title}${desc ? `${n}* ${desc}` : ""}${br}
 */`;
  } else {
    return `/**${br}
 * ${title}${br}
 * @description ${desc}${br}
 * @author ${author}${br}
 * @createTime ${createTime}${br}
 * @updateTime ${updateTime}${br}
 */${n}`;
  }
}

//单个api导出模板
export function getApiExportTpl(data, isTs = true) {
  if (isTs) {
    const { reqProps, resProps, apiName, method, path } = data;
    return `export ${reqProps}${br}
export ${resProps}${br}
export const ${apiName} = (data: ${apiName}Req) => {${br}
${t}return http("${method}", "${path}", data);${br}
};${n}${n}`;
  } else {
    const { apiName, method, path } = data;
    return `export const ${apiName} = (data) => return http("${method}", "${path}", data);${br}${n}`;
  }
}
