const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../src/assets/imgs"); //要写入的文件地址
// const domain = "https://fanlichuan.gitee.io/assets/out-single-vue3"; //远程地址前缀
const domain = "https://xiangqinjiao.oss-cn-shanghai.aliyuncs.com/ws-new"; //远程地址前缀

// 文件处理
const dealFiles = async (path, sourceFiles) => {
  if (!sourceFiles.length) return [];
  let targetFiles = [];
  let fileName = "";
  for (let i = 0; i < sourceFiles.length; i++) {
    fileName = sourceFiles[i];
    if (/^[\w-]*(\.jpeg|\.png|\.jpg|\.svg|\.gif)$/.test(fileName)) {
      targetFiles.push({
        path: path.replace(/^\//, ""),
        fileName: fileName,
      });
    } else if (/^[^.]/.test(fileName)) {
      // 非以点开头文件,过滤掉系统生成隐藏文件
      const results = await readFiles(`${path}/${fileName}`);
      if (results.length) {
        targetFiles = [...targetFiles, ...results];
      }
    }
  }
  return targetFiles;
};

// 文件读取
const readFiles = (path) => {
  return new Promise((resolve) => {
    fs.readdir(`${filePath}${path}`, (err, files) => {
      if (err) {
        console.log(path, "====>", err);
        resolve([]);
      } else {
        dealFiles(path, files)
          .then((results) => {
            resolve(results);
          })
          .catch(() => {
            resolve([]);
          });
      }
    });
  });
};

const writeIndexFile = (files) => {
  let baseDomain = `const domain = '${domain}';\n`;
  files.forEach((file) => {
    let name = file.fileName
      .replace(/([^.]+)\..+/, "$1")
      .replace(/[-_]([a-z0-9])/g, (val, $1) => $1.toUpperCase());
    name = name.slice(0, 1).toLowerCase() + name.slice(1);
    // || file.path.startsWith("local")
    if (file.path.startsWith("temp") || file.path.startsWith("local")) {
      baseDomain += `export const ${name}Img = require('./${file.path}${
        file.path ? "/" : ""
      }${file.fileName}');\n`;
    } else if (file.path.startsWith("remote")) {
      baseDomain += `export const ${name}Img = domain + '${file.path.slice(
        "remote".length
      )}${file.path ? "/" : ""}${file.fileName}';\n`;
    }
  });
  fs.writeFileSync(filePath + "/index.ts", baseDomain);
};

readFiles("").then((files) => {
  console.log("===========> 成功", files?.length);
  // console.log(`%c 成功：`, `background:green;color:#fff;`);
  writeIndexFile(files);
});
