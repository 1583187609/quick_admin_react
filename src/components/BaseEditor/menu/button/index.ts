import HtmlView from './HtmlView';
import TagLevels from './TagLevels';
import Copy from './Copy';

// 查看html文本
export const htmlView = {
  key: 'html-view', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new HtmlView();
  },
};
// 一级标签
export const tagOne = {
  key: 'tag-1',
  factory() {
    return new TagLevels('tag-1', '一级标签');
  },
};
// 二级标签
export const tagTwo = {
  key: 'tag-2',
  factory() {
    return new TagLevels('tag-2', '二级标签');
  },
};
// 复制text文本
export const copyText = {
  key: 'copy-text',
  factory() {
    return new Copy('text', '复制全文');
  },
};
// 复制html文本
export const copyHtml = {
  key: 'copy-html',
  factory() {
    return new Copy('html', '复制html');
  },
};
