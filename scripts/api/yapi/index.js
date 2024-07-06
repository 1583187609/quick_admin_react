import { writeFileSync, deleteFolderSync } from "../utils/common.js";
import { getApiFilesStrs } from "./methods.js";
import { getApiIndexStr } from "../utils/public.js";
import fetch from "./fetch.js";
import fs from "fs";

/**
 * 请求数据
 */
async function fetchData(
  params,
  filesDataPath = "scripts/api/yapi/filesData.js"
) {
  const { urls = {}, token, groupIds = [], projectId } = params;
  const { base, group, list, detail } = urls;
  const groupUrl = base + group;
  const listUrl = base + list;
  const detailUrl = base + detail;
  //获取文件信息
  async function getFile(id, title) {
    try {
      const file = await fetch(
        "GET",
        `${listUrl}?page=1&limit=9999&catid=${id}&token=${token}`
      ).then(async (res) => {
        const { list, count, total } = JSON.parse(res).data;
        const datas = [];
        for (let j = 0; j < list.length; j++) {
          const item = list[j];
          const data = await fetch(
            "GET",
            `${detailUrl}?id=${item._id}&token=${token}`
          ).then((res) => {
            const resData = JSON.parse(res)?.data ?? {};
            // 返回的是schema数据，需要转换json使用
            resData.res_body = JSON.parse(resData.res_body || "{}");
            resData.req_body_other = JSON.parse(resData.req_body_other || "{}");
            return resData;
          });
          datas.push(data);
        }
        return { id, title, datas };
      });
      return file;
    } catch (err) {
      console.error("getFile发生错误：", err);
    }
  }
  //根据groupIds(catIds)抓取数据
  async function fetchByGroupIds() {
    const files = [];
    const newGroupIds = groupIds.map((it) => {
      if (typeof it === "string" || typeof it === "number") {
        return { id: it, title: "" };
      } else {
        return it;
      }
    });
    try {
      for (let i = 0; i < newGroupIds.length; i++) {
        const { id, title } = newGroupIds[i];
        const file = await getFile(id, title);
        files.push(file);
      }
    } catch (err) {
      console.error("fetchByGroupIds发生错误：", err);
    }
    return files;
  }
  //根据groupUrl抓取数据
  async function fetchByGroupUrl() {
    try {
      if (!projectId) {
        throw new Error("配置中缺少projectId参数");
      }
      const groupRes = await fetch(
        "GET",
        `${groupUrl}?project_id=${projectId}&token=${token}`
      );
      const files = await Promise.all(
        JSON.parse(groupRes).data.map(async (item, ind) => {
          let { _id, name } = item;
          const file = await getFile(_id, name);
          return file;
        })
      );
      return files;
    } catch (err) {
      console.error("fetchByGroupUrl发生错误：", err);
    }
  }
  try {
    let files = groupIds?.length
      ? await fetchByGroupIds()
      : await fetchByGroupUrl();
    files = files.filter((it) => it.datas.length > 0);
    if (filesDataPath) {
      writeFileSync(filesDataPath, "export default " + JSON.stringify(files));
    }
    return files;
  } catch (err) {
    console.error("抓取数据发生错误:", err);
  }
}

/**
 * 生成api文件
 */
export default async function create(opts) {
  const { name, outPath, lang, httpPath, ...rest } = opts;
  const filesData = await fetchData(rest);
  const filesStrs = getApiFilesStrs(filesData, httpPath, lang);
  if (!filesStrs.length) return;
  if (fs.existsSync(outPath)) {
    deleteFolderSync(outPath, false);
  }
  filesStrs.forEach((item) => {
    const { id, fileStr } = item;
    writeFileSync(`${outPath}/${id}.${lang}`, fileStr, true);
  });
  const indexStr = getApiIndexStr(name, filesData, lang);
  writeFileSync(`${outPath}/index.${lang}`, indexStr, true);
}
