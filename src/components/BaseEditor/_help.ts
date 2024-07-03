import { CommonObj } from "@/vite-env";
import { IDomEditor } from "@wangeditor/editor";
import { CSSProperties } from "react";
import { showMessage } from "../_utils";

type InsertFnType = (url: string, alt: string, href: string) => void;

//将文件大小（单位：b）转成带有单位（kb或MB）的文件大小
export function toFileSizeStr(size: number | string) {
  size = Number(size) / 1024;
  if (size >= 1024) {
    size = (size / 1024).toFixed(2) + "MB";
  } else {
    size = size.toFixed(2) + "kb";
  }
  return size;
}
//判断编辑器内容是否为空
export function getIsEmpty(editor: IDomEditor) {
  // editor.isEmpty()只能识别只有一个空段落情况，其他情况（如有一个空标题、空表格）需要使用 editor.getText() 来判断。
  return editor.isEmpty() || editor.getText() === "";
}

/**
 * 获取上传文件的配置
 * @param maxSize
 */
export function getUploadImageConfig(maxSize = 5 * 1024 * 1024) {
  return {
    // server: YUANXIN_API_URL + `/file/upload?time=${Date.now()}`,
    fieldName: "file",
    allowedFileTypes: ["image/*"],
    maxFileSize: maxSize, //默认5M
    // maxNumberOfFiles: 1,// 最多可上传几个文件
    // timeout: 5 * 1000, // 超时时间，默认10秒
    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
      path: "/ums-admin/editor-image",
    },
    withCredentials: true,
    // 自定义插入图片
    customInsert(res: { data: { url: string }; code: number; msg: string }, insertFn: InsertFnType) {
      if (!res) {
        showMessage("系统异常", "error");
        return;
      }
      const { data, code, msg = "上传失败" } = res;
      if (code !== 200) {
        showMessage(msg, "error");
        return;
      }
      insertFn(data?.url, "", "");
    },
    //图片上传失败
    onError(file: CommonObj) {
      const { size } = file;
      if (size > maxSize) {
        showMessage(`图片大小不能超过${toFileSizeStr(maxSize)}`, "warning");
      }
    },
  };
}

/**
 * 将纯文本字符串转换为带错别字，敏感词标识的html字符串
 * @param str
 * @param wrongWords string[] 错别字数组
 * @param sensWords string[]  敏感词数组
 * @param wrongStyle string 错别字样式
 * @param sensStyle string  敏感词样式
 * @example textToHtmlWithWords("我们的假象，在希望的田野上，热爱我们的祖国！",['假象'],['我', '的'])
 */
export function textToHtmlWithWords(
  str = "",
  wrongWords: string[] = [],
  sensWords: string[] = [],
  wrongStyle = "color: red;",
  sensStyle = "color: darkorange;"
) {
  // wrongGroups=['假象->家乡']
  // const wrongWords = wrongGroups.map(it=>it.split("->")[0])
  const reg = new RegExp(`(${wrongWords.join("|")})|(${sensWords.join("|")})`, "gi");
  if (str) {
    return str.replace(reg, (matchStr: string, chars: string, index: number) => {
      const isWrong = wrongWords.includes(matchStr);
      return `<span style="${isWrong ? wrongStyle : sensStyle}">${matchStr}</span>`;
    });
  }
  return "";
}

/**
 * 将html字符串转为文本字符串
 * @param htmlStr string html字符串
 */
export function htmlToText(htmlStr = "") {
  const el = document.createElement("div");
  el.innerHTML = htmlStr;
  return el.innerText;
}

/**
 * 将CSSProperties转成行内css样式字符串
 * @param cssProps CSSProperties react的css样式
 */
export function cssObjToCssStr(cssProps: CSSProperties = {}) {
  let str = "";
  const ents = Object.entries(cssProps);
  str = ents
    .map(([key, val], ind) => {
      key = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${key}:${val};`;
    })
    .join("");
  return str;
}
