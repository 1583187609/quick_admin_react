# 编辑器配置相关

1. 配置快速创建文件模板（以 VsCode 编辑器为例）
   左下角点击“设置”图标 -> 用户代码片段 -> 输入“react.json” -> 将如下代码复制粘贴进去 -> 在工程目录下新建\*.tsx 文件，输入 rtl，按下回车，即可快速创建模板代码

```json
{
  // Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
  // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
  // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
  // used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
  // Placeholders with the same ids are connected.
  // Example:
  // "Print to console": {
  // 	"scope": "javascript,typescript",
  // 	"prefix": "log",
  // 	"body": [
  // 		"console.log('$1');",
  // 		"$2"
  // 	],
  // 	"description": "Log output to console"
  // }
  "Create a new react-ts-scss": {
    // "scope": "typescript",
    "prefix": "rts",
    "body": [
      "/**",
      " * 文件说明 - 模板文件",
      " */",
      "",
      "import { CSSProperties } from 'react'",
      "//import s from './index.module.scss'",
      "",
      "interface Props {",
      "\tclassName?: string;",
      "\tstyle?: CSSProperties;",
      "\t[key: string]: any;",
      "}",
      "",
      "export default ({ className = '', children, ...restProps }: Props) => {",
      "\treturn (",
      "\t\t<div className={`\\${className}`} {...restProps}>",
      "\t\t\t模板文件{children}",
      "\t\t</div>",
      "\t);",
      "}"
    ],
    "description": "快速创建react + ts + scss文件"
  },
  "Create a new react-ts-less": {
    // "scope": "typescript",
    "prefix": "rtl",
    "body": [
      "/**",
      " * 文件说明 - 模板文件",
      " */",
      "",
      "import { CSSProperties } from 'react'",
      "//import s from './index.module.less'",
      "",
      "interface Props {",
      "\tclassName?: string;",
      "\tstyle?: CSSProperties;",
      "\t[key: string]: any;",
      "}",
      "",
      "export default ({ className = '', children, ...restProps }: Props) => {",
      "\treturn (",
      "\t\t<div className={`\\${className}`} {...restProps}>",
      "\t\t\t模板文件{children}",
      "\t\t</div>",
      "\t);",
      "}"
    ],
    "description": "快速创建react + ts + less文件"
  }
}
```
