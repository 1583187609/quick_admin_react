import { t, n, br, baseDataTypes } from "../utils/consts.js";
import { upperFirst, camelCase } from "../utils/public.js";
import {
  getFileHeadAnnoTpl,
  getApiHeadAnnoTpl,
  getApiExportTpl,
} from "../utils/template.js";

/**
 * 生成接口头部注释信息
 */
function getApiAnnotation(data, isBrief = false) {
  const { title, desc, username, add_time, up_time } = data;
  const addTime = new Date(add_time * 1000).toLocaleString();
  const upTime = new Date(up_time * 1000).toLocaleString();
  const tpl = getApiHeadAnnoTpl(
    { title, desc, author: username, createTime: addTime, updateTime: upTime },
    isBrief
  );
  return tpl;
}

/**
 * 获取数组元素的props类型
 */
function getArrItemProp(parItems, num = 0) {
  const { type, properties, items, required } = parItems;
  if (type) {
    return type;
  } else {
    //是对象
    if (properties) {
      let str = resolveProps(properties, required, num + 1);
      return `{${str}${str ? `${n}${t.repeat(num)}` : ""}}`;
    }
    //是数组
    else if (items) {
      return `Array<${resolveProps(
        items.properties,
        items.required,
        num
      )}${n}${t.repeat(num)}>`;
    }
  }
}

/**
 * 解析props
 */
function resolveProps(props = {}, requs = [], num = 1) {
  let str = "";
  function selectable(key, requs) {
    return requs.includes(key) ? "" : "?";
  }
  for (const key in props) {
    const {
      type,
      items,
      properties = {},
      required = [],
      description,
      example,
      enum: enums,
    } = props[key];
    if (baseDataTypes.includes(type)) {
      str += `${n}${t.repeat(num)}${key}${selectable(key, requs)}: ${type};`;
      if (description) {
        str += ` //${description}`;
      }
    } else if (type === "integer") {
      str += `${n}${t.repeat(num)}${key}${selectable(key, requs)}: number;`;
      if (description) {
        str += ` //${description}`;
      }
    } else if (type === "object") {
      const tempStr = resolveProps(properties, required, num + 1);
      str += `${n}${t.repeat(num)}${key}${selectable(key, requs)}: {${
        tempStr ? tempStr + n + t.repeat(num) : ""
      }};`;
      if (description && !tempStr) {
        str += ` //${description}`;
      }
    } else if (type === "array") {
      //items.type 可能会为undefined（不是字符串undefined），有properties属性时也是undefined
      str += `${n}${t.repeat(num)}${key}${selectable(
        key,
        requs
      )}: ${getArrItemProp(items, num)};`;
      const isBaseChild = baseDataTypes.includes(items.type);
      if (isBaseChild) {
        if (description) {
          str += ` //${description}`;
        }
      }
    } else {
      console.error("暂未处理此类型：" + type);
    }
    const hasEnums = enums?.length && enums[0];
    if (hasEnums) {
      str += `${description ? " " : "//"}可选：${enums.join(", ")}`;
    }
    if (example) {
      str += `${description || hasEnums ? " " : "//"}示例：${example}`;
    }
  }
  return str;
}

/**
 * 生成接口Props
 */
function getApiProps(obj, propsName) {
  let str = "";
  const { type, items } = obj;
  if (type === "object") {
    const { properties = {}, required = [] } = obj;
    str += resolveProps(properties, required);
    return `interface ${propsName} {${str ? str + n : ""}};`;
  } else if (type === "array") {
    return `type ${propsName} = Array<${getArrItemProp(items)}>;`;
  } else if (type === "integer") {
    return `type ${propsName} = number;`;
  } else if (type === "file") {
    return `type ${propsName} = File;`;
  } else if (baseDataTypes.includes(type)) {
    return `type ${propsName} = ${type};`;
  } else if (JSON.stringify(obj) === "{}") {
    return `type ${propsName} = null;`;
  } else {
    console.error("未处理3：");
    return `interface ${propsName} {/** 未处理3：*/}`;
  }
}

/**
 * api文件数据数组
 */
export function getApiFilesStrs(filesData = [], httpPath, lang = "ts") {
  const filesStrs = [];
  filesData.forEach((item, ind) => {
    const { id, datas, title } = item;
    let datasStr = getFileHeadAnnoTpl({ title, total: datas.length }, httpPath);
    datas.forEach((data, ind) => {
      const isTs = lang === "ts";
      const { path, method } = data;
      const apiName = upperFirst(camelCase(method.toLowerCase() + "-" + path));
      datasStr += `${getApiAnnotation(data)}`;
      datasStr += getApiExportTpl(
        {
          reqProps: getApiProps(data.req_body_other, `${apiName}Req`),
          resProps: getApiProps(data.res_body.properties.data, `${apiName}Res`),
          apiName,
          method,
          path,
        },
        isTs
      );
    });
    filesStrs.push({ id, fileStr: datasStr });
  });
  return filesStrs;
}
