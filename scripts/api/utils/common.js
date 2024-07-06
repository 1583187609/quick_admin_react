// 这个文件仅供node环境使用，在浏览器中 from "path" 会提示路径错误，需要写成 "./path"或"/path"或"../path"等
import path from "path";
import fs from "fs";

/**
 * 删除某个文件夹下的所有内容(同步方法)
 * 注：nodejs不能一次性创建多层目录，需要递归处理
 * @param folderPath 多层目录路径 示例： hello/a/b/c
 * @param isDelSelf 是否删除自身文件夹，及目录路径的最后一级为空文件夹时，是否删除
 */
export function deleteFolderSync(folderPath, isDelSelf = true) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 如果是文件夹则递归删除
        deleteFolderSync(curPath, true);
      } else {
        // 如果是文件则直接删除
        fs.unlinkSync(curPath);
      }
    });
    isDelSelf && fs.rmdirSync(folderPath); // 删除空文件夹
  }
}

/**
 * 递归创建目录(同步方法)
 * 注：nodejs不能一次性创建多层目录，需要递归处理
 * @param dirname 多层目录路径 示例： hello/a/b/c
 */
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 写入文件
 * @param writePath string
 * @param writeStr string 写入的文件内容
 * @param encoding 编码格式
 * @return error 错误信息，如果没有错误，则为null
 */
export function writeFileSync(
  writePath,
  writeStr,
  showSuccess = false,
  encoding = "utf-8"
) {
  const basename = path.basename(writePath);
  const isSuccess = mkdirsSync(writePath.replace(basename, ""));
  if (isSuccess) {
    const err = fs.writeFileSync(writePath, writeStr, encoding);
    if (err) {
      console.log(writePath + "写入失败", err);
    } else {
      showSuccess && console.log(writePath + "写入成功！");
    }
    return err;
  } else {
    console.log("创建文件目录失败");
    return { err: "创建文件目录失败" };
  }
}
