/********************************************************************/
/************** 为临时放置的后续可能会移到其他文件下的方法 *************/
/********************************************************************/

import { regexp, showMessage } from "@/components/_utils";
import { dayjs } from "element-plus";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";

/**
 * 获取时间阶段
 */
export function getTimePeriodAlias() {
  const hours = new Date().getHours();
  let alias = "";
  if (hours < 1) {
    alias = "凌晨";
  } else if (hours < 8) {
    alias = "清晨";
  } else if (hours < 11) {
    alias = "上午";
  } else if (hours < 13) {
    alias = "中午";
  } else if (hours < 18) {
    alias = "下午";
  } else if (hours < 20) {
    alias = "傍晚";
  } else if (hours < 23) {
    alias = "晚上";
  } else {
    alias = "深夜";
  }
  return alias;
}

/**
 * 计算百分比
 */
export function getPercentage(num: number, total: number, fixedNum = 2) {
  if (!total) return Number(0).toFixed(fixedNum);
  return ((num / total) * 100).toFixed(fixedNum);
}

/**
 * 获取带错别字，敏感词标识的html字符串
 * @param str
 * @param wrongWords string[] 错别字数组
 * @param sensWords string[]  敏感词数组
 * @param wrongStyle string 错别字样式
 * @param sensStyle string  敏感词样式
 * @example getTagHtmlStr("我们的假象，在希望的田野上，热爱我们的祖国！",['假象'],['我', '的'])
 */
export function getTagHtmlStr(
  str = "",
  wrongWords: string[] = [],
  sensWords: string[] = [],
  wrongStyle = "color: red;",
  sensStyle = "color: darkorange;"
) {
  // wrongGroups=['假象->家乡']
  // const wrongWords = wrongGroups.map(it=>it.split("->")[0])
  const wrongStr = wrongWords.join("|");
  const sensStr = sensWords.join("|");
  const wordStr = [wrongStr, sensStr]
    .filter(it => it !== "")
    .map(item => (item ? `(${item})` : item))
    .join("|");
  if (str && wordStr) {
    const reg = new RegExp(wordStr, "g");
    str = str.replace(reg, (matchStr: string, chars: string, index: number) => {
      const isWrong = wrongWords.includes(matchStr);
      return `<span style="${isWrong ? wrongStyle : sensStyle}">${matchStr}</span>`;
    });
  }
  return str;
}

/**
 * 获取 css 变量的值
 * @tips 暂时没用上
 */
// export function getCssVarVal(name: string = "--color-primary") {
//   const val = getComputedStyle(document.documentElement).getPropertyValue(name); // 获取计算后的样式
//   if (!val) {
//     throw new Error(`不存在此CSS变量：${name}`);
//   }
//   return val;
// }

/**
 * 监测本地文件是否更改
 * @link 参考：https://geek-docs.com/html/html-ask-answer/256_html_check_if_file_has_changed_using_html5_file_api.html
 */
export function checkFileChanged(e: any) {
  const { lastModifiedDate: lastModified } = e.target.files[0];
  const isChanged = localStorage.getItem("lastModified") !== lastModified.toString();
  if (isChanged) {
    localStorage.setItem("lastModified", lastModified);
  }
  return isChanged;
}

/**
 * 将浏览器路径参数转为对象
 * @param searchStr string 要转化的字符串
 */
export function urlSearchToParams(searchStr = location.search.slice(1)) {
  return Object.fromEntries(new URLSearchParams(searchStr));
}

/**
 * 获取html文本
 * @param title 要高亮的文本
 * @param words 关键词
 * @returns html字符串
 */
export const getHtmlStr = (str: string, words: string) => {
  return str;

  // 关键词高亮处理
  // const index = str.indexOf(words);
  // const beforeStr = str.substring(0, index);
  // const afterStr = str.slice(index + words.length);
  // if (index > -1) return `<span>${beforeStr}<span style="color:red">${words}</span>${afterStr}</span>`;
  // return `<span>${str}</span>`;

  // react tsx 写法
  // return index > -1 ? (
  //   <span>
  //     {beforeStr}
  //     <span style={{ color: "red" }}>{words}</span>
  //     {afterStr}
  //   </span>
  // ) : (
  //   <span>{str}</span>
  // );
};

/**
 * 根据关键词模糊过滤树节点
 * @param val 模糊搜索的关键词
 * @param tree 树数据
 * @param newArr 缓存的节点树
 * @returns 返回一个新的树，不改变原数组
 */
export const filterTreeByKeywords = (val: string, tree: CommonObj[], newArr: CommonObj[] = []): CommonObj[] => {
  if (!(tree.length && val)) return tree;
  tree.forEach(item => {
    const { title, children } = item;
    if (title.includes(val)) {
      item.title = getHtmlStr(title, val);
      if (children?.length) {
        item.children = filterTreeByKeywords(val, children);
      }
      return newArr.push(item);
    }
    if (!children?.length) return item;
    const subArr = filterTreeByKeywords(val, children);
    if (subArr?.length) {
      item.title = getHtmlStr(title, val);
      newArr.push({ ...item, children: subArr });
    }
    return item;
  });
  return newArr;
};

/**
 * 给数字每隔 3 位就增加一个逗号
 * @param num 要转化的数字
 * @returns
 */
export const addCommasToNumber = (num: string | number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
