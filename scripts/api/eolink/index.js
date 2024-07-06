import { writeFileSync, deleteFolderSync } from "../utils/common.js";
import { getApiFilesStrs } from "./methods.js";
import { getApiIndexStr } from "../utils/public.js";
import fetch from "./fetch.js";
import fs from "fs";

/**
 * 抓取数据
 */
async function fetchData(
  opts,
  filesDataPath = "scripts/api/eolink/filesData.js"
) {
  const { urls, spaceKey, projectHashKey, token, groupIds = [] } = opts;
  const { base, group, list, detail } = urls;
  const groupUrl = base + group;
  const listUrl = base + list;
  const detailUrl = base + detail;
  const others = {
    headers: { authorization: token },
  };
  //获取datas数据
  async function getDatas(apiList) {
    try {
      const datas = await Promise.all(
        apiList.map(async (item, ind) => {
          const { apiID } = item;
          const detailRes = await fetch(
            "post",
            detailUrl,
            { spaceKey, projectHashKey, apiID },
            others
          );
          return detailRes.apiInfo;
        })
      );
      return datas;
    } catch (err) {
      console.error("getDatas发生错误：", err);
    }
  }
  //根据groupIds抓取数据
  async function fetchByGroupIds() {
    try {
      const newGroupIds = groupIds.map((it) => {
        if (typeof it === "string" || typeof it === "number") {
          return { id: it, title: "" };
        }
        return it;
      });
      const files = await Promise.all(
        newGroupIds.map(async (item, ind) => {
          const { id, title = "" } = item;
          const res = await fetch(
            "post",
            listUrl,
            { spaceKey, projectHashKey, groupID: id },
            others
          );
          const datas = await getDatas(res.apiList);
          return { id, datas, title };
        })
      );
      return files;
    } catch (err) {
      console.error("fetchByGroupIds发生错误：", err);
    }
  }
  //根据groupUrl抓取数据
  async function fetchByGroupUrl() {
    try {
      const groupRes = await fetch(
        "post",
        groupUrl,
        { spaceKey, projectHashKey },
        others
      );
      const files = await Promise.all(
        groupRes.apiGroupData.map(async (item, ind) => {
          const { groupID, apiList, groupName } = item;
          const datas = await getDatas(apiList);
          return { id: groupID, datas, title: groupName };
        })
      );
      return files;
    } catch (err) {
      console.error("fetchByGroupUrl发生错误：", err);
    }
  }
  try {
    if (!spaceKey) {
      throw new Error("配置中缺少spaceKey参数");
    }
    if (!projectHashKey) {
      throw new Error("配置中缺少projectHashKey参数");
    }
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
  writeFileSync(
    `${outPath}/index.${lang}`,
    getApiIndexStr(name, filesData, lang),
    true
  );
}
