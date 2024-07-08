/**
 * 富文本编辑器
 * @description 关键功能点：敏感词、错别字标红；插入自定义菜单；
 * @notice 处理了标红文本撤销时出现的第三方bug
 * @notice 处理了当失去或聚焦焦点时，会触发onChange事件的第三方bug
 */

import React, { useState, useEffect, useMemo, CSSProperties, useRef, useCallback } from "react";
import { debounce, merge } from "lodash";
import { IDomEditor, IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { toFileSizeStr, getIsEmpty, getUploadImageConfig, textToHtmlWithWords, htmlToText, cssObjToCssStr } from "./_help";
import { useEventListener } from "@/hooks";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import s from "./index.module.less";

interface Props {
  className?: string;
  value?: string;
  onCreated?: (editor: IDomEditor) => void;
  onChange?: (htmlStr: string, textStr: string, editor: IDomEditor) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  editorStyle?: CSSProperties;
  toolbarKeys?: string[];
  maxLength?: number;
  toolbarConfig?: Partial<IToolbarConfig>;
  editorConfig?: Partial<IEditorConfig> /** 请保持内容不可变，在创建富文本前设置的才生效 */;
  toolbarProps?: CommonObj;
  editorProps?: CommonObj;
  showImgTips?: boolean; //是否显示图片提示（类型、大小限制提示）
  wordsList?: {
    wrong: string[]; //错别字列表
    sens: string[]; //敏感词列表
  };
  wordsStyle?: {
    wrong?: CSSProperties;
    sens?: CSSProperties;
  };
  insertMenu?: () => void;
}

let oldHtmlVal = ""; //编辑器的旧值，用于判断是否值是否发生了更改，处理wangEditor 失去或聚焦焦点时，会触发onChange的bug
let isFocus = false; //是否聚焦
const emptyValue = ""; //编辑器的空值。默认是 '<p><br/></p>'， 可根据实际情况设置为 ''
//敏感词关键词默认样式
const defaultWordsStyle = {
  wrong: { color: "red" },
  sens: { color: "darkorange" },
};
//默认的toolBars
const defaultToolbarKeys: string[] = [
  "header1",
  "bold",
  "indent",
  "delIndent",
  "justifyLeft",
  "justifyRight",
  "justifyCenter",
  "justifyJustify",
  "bulletedList",
  "numberedList",
  "uploadImage",
  "redo",
  "undo",
  "fullScreen",
];
//默认的toolBar工具栏配置
const defaultToolbarConfig: Partial<IToolbarConfig> = {
  // toolbarKeys: defaultToolbarKeys,
  // noUseDefaultbarConfig: false, //不使用默认的toolbarKeys
  // excludeKeys: [],
  // modalAppendToBody: false,
  // insertKeys: {
  //   index: 0, // 插入的位置，基于当前的 toolbarKeys
  //   keys: ['tag-1', 'tag-2', 'html-view'],
  // },
};
//默认的editor编辑栏配置
const defaultEditorConfig: Partial<IEditorConfig> = {
  // maxLength: 99999,
  placeholder: "请输入内容",
  autoFocus: false,
  // onBlur() {},
  MENU_CONF: {
    uploadImage: {},
  },
  // 若调用浏览器自带的粘贴逻辑，请用  customPaste: ()=>true， 覆盖此操作
  customPaste(editor: IDomEditor, event: ClipboardEvent): boolean {
    // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent
    // const html = event?.clipboardData?.getData('text/html'); // 获取粘贴的 html
    const { clipboardData } = event || {};
    const text: string = clipboardData?.getData("text/plain") || ""; // 获取粘贴的纯文本
    try {
      const fragmentNode = editor.getFragment();
      // table 粘贴单独处理
      if (Array.isArray(fragmentNode) && fragmentNode.some((item: CommonObj) => item.type === "table")) {
        editor.insertText(text);
        event.preventDefault();
        return false;
      }
      const textArray = text.split("\r");
      const formatedText = textArray.map(item => `<div>${(item || "").replace(/([]|\r|\n)/g, "")}</div>`).join("");
      // 新版本应该已修复 https://github.com/wangeditor-team/wangEditor/commit/8b549f480434782107eda3412bf6530d0d7eb9ba
      editor.dangerouslyInsertHtml(formatedText);
    } catch (error) {
      editor.insertText(text.replace(/([]|\r)/g, ""));
    }
    // 阻止默认的粘贴行为
    event.preventDefault();
    return false;
  },
};

//如果只注册一个菜单，没有别的功能了，则推荐使用 registerMenu
// Boot.registerMenu(tagOne);
// 如果除了菜单之外还要同时注册其他能力，则建议使用 registerModule

export default ({
  className = "",
  value = "",
  onCreated,
  onChange,
  onBlur,
  onFocus,
  editorStyle = { height: "300px" },
  toolbarKeys = defaultToolbarKeys,
  maxLength,
  toolbarConfig = {},
  editorConfig = {},
  toolbarProps = {},
  editorProps = {},
  showImgTips = false,
  wordsList,
  wordsStyle,
  insertMenu,
}: Props) => {
  const [htmlValue, setHtmlValue] = useState("");
  const isCtrlZ = useRef(false);
  const [editor, setEditor] = useState<IDomEditor | null>(null); // editor 实例
  const { wrong: wrongStyle, sens: sensStyle } = merge({}, defaultWordsStyle, wordsStyle);
  const uploadImageCfg = getUploadImageConfig(); //上传图片的配置
  const imgTypesStr = uploadImageCfg?.allowedFileTypes.map((it: string) => it.split("/")[1]).join("、");
  const imgMaxSize = toFileSizeStr(uploadImageCfg?.maxFileSize);
  //工具栏配置 因为toolbarKeys配置使用频繁，所以单独预留一个属性直接配置它
  const toolbarDefaultConfig: Partial<IToolbarConfig> = merge({}, defaultToolbarConfig, toolbarConfig, { toolbarKeys });
  // 编辑器配置
  const editorDefaultConfig: Partial<IEditorConfig> = merge(
    {},
    defaultEditorConfig,
    {
      onBlur() {
        isFocus = false;
        // setTimeout(() => {
        onBlur?.();
        // }, 50);
      },
      onFocus() {
        isFocus = true;
        // setTimeout(() => {
        onFocus?.();
        // }, 50);
      },
      MENU_CONF: { uploadImage: uploadImageCfg },
    },
    editorConfig,
    { maxLength }
  );
  useEffect(() => {
    insertMenu?.();
  }, []);
  useEffect(() => {
    return () => {
      if (!editor) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // const memoValue = useMemo(() => {
  //   if (!value) return emptyValue;
  //   if (wordsList && !isFocus) {
  //     const { wrong: wrongWords, sens: sensWords } = wordsList;
  //     value = htmlToText(value);
  //     value = textToHtmlWithWords(value, wrongWords, sensWords);
  //   }
  //   if (!value.startsWith('<p>')) value = '<p>' + value; //当传入html文本时，需要p标签包裹行内元素，否则编辑器会显示不正常
  //   if (!value.endsWith('</p>')) value += '</p>';
  //   return value;
  // }, [value, wordsList]);
  useEffect(() => {
    if (!value) {
      setHtmlValue(emptyValue);
    } else {
      if (wordsList && !isFocus) {
        const { wrong: wrongWords, sens: sensWords } = wordsList;
        value = htmlToText(value);
        value = textToHtmlWithWords(value, wrongWords, sensWords, cssObjToCssStr(wrongStyle), cssObjToCssStr(sensStyle));
      }
      if (!value.startsWith("<p>")) value = "<p>" + value; //当传入html文本时，需要p标签包裹行内元素，否则编辑器会显示不正常
      if (!value.endsWith("</p>")) value += "</p>";
      setHtmlValue(value);
    }
  }, [value, wordsList]);
  //当编辑器刚创建时，可用于获取editor实例
  function handleCreated(editor: IDomEditor) {
    setEditor(editor);
    onCreated?.(editor);
  }

  /**
   * 编辑器onChang事件
   */
  const handleChange = debounce((editor: IDomEditor) => {
    // * https://github.com/wangeditor-team/wangEditor/issues/4493
    //  * 频繁执行会触发问题，setHtml 异步更新（像 Vue 和 React），用 setTimeout 隔离
    const _html = getIsEmpty(editor) ? emptyValue : editor.getHtml();
    //wangEditor 在失去或聚焦焦点时，均会触发 onChange事件，故做此处理用于区分
    const isChange = oldHtmlVal !== _html;
    if (isChange) {
      const _text = editor.getText();
      oldHtmlVal = _html;
      // editor.setHtml(_html);
      if (isCtrlZ.current) {
        setTimeout(() => {
          onChange?.(_html, _text, editor);
        }, 50);
      } else {
        onChange?.(_html, _text, editor);
      }
    }
  }, 500);
  // 监听ctrl-z键盘事件
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    isCtrlZ.current = (event.ctrlKey || event.metaKey) && event.key === "z";
  }, []);
  useEventListener("keydown", handleKeyDown);
  return (
    <>
      <div className={`${className} ${s["base-editor"]}`}>
        {!!toolbarDefaultConfig.toolbarKeys?.length && (
          <Toolbar
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
            editor={editor}
            defaultConfig={toolbarDefaultConfig}
            {...toolbarProps}
          />
        )}
        <Editor
          mode="simple"
          style={editorStyle}
          value={htmlValue}
          onCreated={handleCreated}
          onChange={handleChange}
          defaultConfig={editorDefaultConfig}
          {...editorProps}
        />
      </div>
      {showImgTips && toolbarDefaultConfig?.toolbarKeys?.includes("uploadImage") && (
        <div className={s.tips}>
          注：{imgTypesStr === "*" ? "" : `图片只能上传${imgTypesStr}格式，`}
          每张图片大小不能超过{imgMaxSize}。
        </div>
      )}
      {!!wordsList && (
        <div className="f-sb-c mt-8">
          <div className="f-1">
            <span>疑似敏感词：</span>
            <span style={sensStyle}>{wordsList?.sens?.join("、")}</span>
          </div>
          <div className="f-1">
            <span>疑似错别字：</span>
            <span style={wrongStyle}>{wordsList?.wrong?.join("、")}</span>
          </div>
        </div>
      )}
    </>
  );
};
