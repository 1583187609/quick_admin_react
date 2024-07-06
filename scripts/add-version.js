/**
 * npm run build打包前执行此段代码，让版本号自动加1
 * 参考博客：https://blog.csdn.net/weixin_48451943/article/details/127879944
 * @example 脚本命令配置："build:simple": "node ./scripts/add-version.js && set NODE_ENV=production && node --max_old_space_size=8000 ./node_modules/vite/bin/vite build"
 */

const fs = require("fs");
const pkg = getPackage();
pkg.version = getNewVersion(pkg.version);
fs.writeFile("./package.json", JSON.stringify(pkg, null, "\t"), (err) => {});

//获取package数据
function getPackage() {
  const data = fs.readFileSync("./package.json");
  return JSON.parse(data);
}
//生成新的版本号
function getNewVersion(v) {
  const arr = v.split(".");
  arr[2] = Number(arr[2]) + 1;
  return arr.join(".");
}
