import URL from "url";
import http from "http";
import querystring from "querystring";
/**
 * 请求方法体封装
 * @param method string 请求类型：GET,POST……
 * @param url string 请求地址
 * @param encoding json数据使用utf-8，下载图片会用到：binary
 * @example request("GET","https://game.gtimg.cn/images/lol/act/img/js/hero/1.js?ts=2780432").then((res) => {console.log(res, "请求成功-----------------");});
 */
export default async function request(
  method = "GET",
  url = "",
  data = {},
  encoding = "utf-8"
) {
  method = method.toUpperCase();
  return await new Promise((resolve, reject) => {
    const parseUrl = URL.parse(url, true);
    const { port, hostname, query, path } = parseUrl;
    const postData = method === "POST" ? querystring.stringify(data) : "";
    const options = {
      method,
      hostname, // 这里别加http://，否则会出现ENOTFOUND错误
      port,
      path, // 子路径
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Length": Buffer.byteLength(postData),
        //   authorization:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI0YjA4MDQ1ZS01NGNkLTQwYTgtODM3My03Y2ViYzA4MWY5MmEiLCJleHAiOjE2Nzg4NzUxMjgsImlhdCI6MTY3ODg3NDgyOCwic3ViIjoiNDk3ZWIwODItYjU4YS00NjNhLTgzNTAtMGI3NGEyNzIzMDM3In0.MPIo3ZjH59Tpj2l9i7q8FgXlz-1hozBo6T-kGvsgcAQ",
      },
    };
    const req = http.request(options, function (res) {
      let dataStr = "";
      res.setEncoding(encoding);
      res.on("data", function (chunk) {
        dataStr += chunk;
      });
      res.on("end", function () {
        // const data = encoding === "utf-8" ? JSON.parse(dataStr) : dataStr;
        // resolve(data);
        return resolve(dataStr);
      });
    });
    req.setTimeout(5000, function () {
      console.log("********** 请求超时 **********");
      req.abort();
      return reject({ msg: "请求超时", data: { url } });
    });
    req.on("error", function (err) {
      console.log("********** 请求错误 **********");
      return reject({ msg: "请求错误", data: { err, url } });
    });
    req.write(postData);
    req.end();
  });
}
