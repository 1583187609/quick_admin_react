import { t, n, br, baseDataTypes } from "../utils/consts.js";
import { upperFirst, camelCase } from "../utils/public.js";
import { paramTypeMap, requestTypeMap } from "./consts.js";
import {
  getFileHeadAnnoTpl,
  getApiHeadAnnoTpl,
  getApiExportTpl,
} from "../utils/template.js";

/**
 * 生成接口头部注释信息
 */
function getApiAnnotation(baseInfo, isBrief = false) {
  const { apiName, apiUpdateTime, createTime, creator } = baseInfo;
  let { apiNote } = baseInfo;
  //处理某些返回<p>……</p>的情况
  if (apiNote.startsWith("<")) {
    apiNote = "";
  }
  const tpl = getApiHeadAnnoTpl(
    {
      title: apiName,
      desc: apiNote,
      author: creator,
      createTime,
      updateTime: apiUpdateTime,
    },
    isBrief
  );
  return tpl;
}

/**
 * 获取数组元素
 */
function getArrItemProp(params, num = 0, type) {
  // const { type, properties, items, required } = params;
  if (!params && type) {
    return type;
  } else {
    //是对象
    if (params) {
      let str = resolveProps(params, num + 1);
      return `{${str}${str ? `${n}${t.repeat(num)}` : ""}}`;
    }
    // //是数组
    // else if (items) {
    //   return `Array<${resolveProps(
    //     items.properties,
    //     items.required,
    //     num
    //   )}${n}${t.repeat(num)}>`;
    // }
    else {
      console.error("还未处理0：");
    }
  }
}

/**
 * 解析成props
 */
function resolveProps(params = [], num = 1, baseInfo) {
  let str = "";
  function selectable(notNull) {
    return notNull === "0" ? "" : "?";
  }
  params.forEach((item, ind) => {
    const {
      default: defaultVal,
      paramKey,
      paramLimit,
      paramName,
      paramNotNull,
      paramNote,
      paramType,
      paramValue,
      paramValueList,
      childList,
      type: childType,
    } = item;
    const type = paramTypeMap[paramType];
    if (baseDataTypes.includes(type)) {
      str += `${n}${t.repeat(num)}${paramKey}${selectable(
        paramNotNull
      )}: ${type};`;
      if (paramName) {
        str += ` //${paramName}`;
      }
    } else if (type === "integer") {
      str += `${n}${t.repeat(num)}${paramKey}${selectable(
        paramNotNull
      )}: number;`;
      if (paramName) {
        str += ` //${paramName}`;
      }
    } else if (type === "file") {
      str += `${n}${t.repeat(num)}${paramKey}${selectable(
        paramNotNull
      )}: File;`;
      if (paramName) {
        str += ` //${paramName}`;
      }
    } else if (type === "object") {
      const tempStr = resolveProps(childList, num + 1);
      str += `${n}${t.repeat(num)}${paramKey}${selectable(paramNotNull)}: {${
        tempStr ? tempStr + n + t.repeat(num) : ""
      }};`;
      if (paramName && !tempStr) {
        str += ` //${paramName}`;
      }
    } else if (type === "array") {
      const tempStr = getArrItemProp(childList, num, paramTypeMap[childType]);
      str += `${
        paramName && tempStr ? `${n}${t.repeat(num)}//${paramName}` : ""
      }${n}${t.repeat(num)}${paramKey}${selectable(
        paramNotNull
      )}: Array<${tempStr}>;`;
      if (!tempStr && paramName) {
        str += ` //${paramName}`;
      }
    } else {
      console.error("发现数据类型空type：" + type, baseInfo, item);
    }
  });
  return str;
}

/**
 * 将结构体或参数统一处理成一维数组参数
 */
function handleStructrue(items, dataStructureList) {
  const paramsArr = items.map((item) => {
    const { structureID } = item;
    if (structureID) {
      return dataStructureList[structureID].structureData;
    } else {
      return [item];
    }
  });
  return paramsArr.flat(1);
}

/**
 * 获取（解析）请求体参数
 */
function getReqParams(apiInfo) {
  const { urlParam = [], requestInfo = [], dataStructureList = {} } = apiInfo;
  const params = [
    ...handleStructrue(urlParam, dataStructureList),
    ...handleStructrue(requestInfo, dataStructureList),
  ];
  return params;
}

/**
 * 获取（解析）响应体参数
 */
function getResParams(apiInfo, dataKey = "data") {
  const { resultInfo = [], dataStructureList = {} } = apiInfo;
  const resBody = handleStructrue(
    resultInfo.find((it) => it.responseCode === "200").paramList,
    dataStructureList
  );
  const params = resBody.find((it) => it.paramKey === dataKey) || {
    paramType: "15",
  };
  return params;
}

/**
 * 生成api props
 */
function getApiProps(apiInfo, propsName) {
  let str = "";
  const isReq = propsName.endsWith("Req");
  let params = [];
  let resData = {};
  if (isReq) {
    params = getReqParams(apiInfo);
  } else {
    resData = getResParams(apiInfo);
  }
  const type = paramTypeMap[isReq ? "13" : resData.paramType]; // 参数类型 apiRequestParamType
  if (type === "object") {
    str += resolveProps(params, undefined, apiInfo.baseInfo);
    return `interface ${propsName} {${str ? str + n : ""}};`;
  } else if (type === "array") {
    if (params) {
      return `type ${propsName} = Array<{${resolveProps(params)}${n}}>;`;
    } else {
      return `type ${propsName} = Array<${paramTypeMap[resData.type]}>;`;
    }
  } else if (type === "integer") {
    return `type ${propsName} = number;`;
  } else if (type === "file") {
    return `type ${propsName} = File;`;
  } else if (baseDataTypes.includes(type)) {
    return `type ${propsName} = ${type};`;
  } else {
    console.error("未处理3：", type);
    return `interface ${propsName} {/** 未处理3：*/}`;
  }
}

/**
 * api文件数据数组
 */
export function getApiFilesStrs(filesData = [], httpPath, lang = "ts") {
  const fileStrs = [];
  filesData.forEach((item, ind) => {
    const { id, datas, title } = item;
    let datasStr = getFileHeadAnnoTpl({ title, total: datas.length }, httpPath);
    datas.forEach((data, ind) => {
      const isTs = lang === "ts";
      const { baseInfo } = data;
      const { apiURI, apiRequestType } = baseInfo;
      const method = requestTypeMap[apiRequestType] || "unknow";
      const apiName = upperFirst(
        camelCase(method.toLowerCase() + "-" + apiURI)
      );
      if (method === "unknow") {
        console.error("发现unknown请求类型:", apiRequestType, apiURI);
      }
      datasStr += `${getApiAnnotation(baseInfo)}`;
      datasStr += getApiExportTpl(
        {
          reqProps: getApiProps(data, `${apiName}Req`),
          resProps: getApiProps(data, `${apiName}Res`),
          apiName,
          method,
          path: apiURI,
        },
        isTs
      );
    });
    fileStrs.push({ id, fileStr: datasStr });
  });
  return fileStrs;
}
