# 编辑器配置相关

1. 配置快速创建文件模板（以 VsCode 编辑器为例）
   左下角点击“设置”图标 -> 用户代码片段 -> 输入“vue.json” -> 将如下代码复制粘贴进去 -> 在工程目录下新建\*.vue 文件，输入 vuets，按下回车，即可快速创建模板代码

```json
{
  // vue3 + ts + scss 文件模板
  "Create a new vue3-ts-scss": {
    "scope": "vue",
    "prefix": "vuets",
    "body": [
      "<!-- 页面 - 简介 -->",
      "<template>",
      "\t<div class=\"example-vue\">example-vue</div>",
      "</template>",
      "<script lang=\"ts\" setup>",
      "import {ref,reactive,watch,computed} from \"vue\"",
      "import {CommonObj,FinallyNext,StrNum} from \"@/vite-env\"",
      // "defineOptions({",
      // "\tname: \"_example\"",
      // "});",
      "const props = withDefaults(",
      "\tdefineProps<{",
      "\t\t_example_prop?: CommonObj;",
      "\t}>(),",
      "\t{",
      "\t\t_example_prop: () => ({}),",
      "\t}",
      ");",
      "</script>",
      "<style lang=\"scss\" name=\"$1\" scoped>",
      "</style>"
    ],
    "description": "快速创建vue3 + ts + scss文件"
  },
  // vue3 + ts + less 文件模板
  "Create a new vue3-ts-less": {
    "scope": "vue",
    "prefix": "vuetl",
    "body": [
      "<!-- 页面 - 简介 -->",
      "<template>",
      "\t<div class=\"example-vue\">example-vue</div>",
      "</template>",
      "<script lang=\"ts\" setup>",
      "import {ref,reactive,watch,computed} from \"vue\"",
      "import {CommonObj,FinallyNext,StrNum} from \"@/vite-env\"",
      // "defineOptions({",
      // "\tname: \"_example\"",
      // "});",
      "const props = withDefaults(",
      "\tdefineProps<{",
      "\t\t_example_prop?: CommonObj;",
      "\t}>(),",
      "\t{",
      "\t\t_example_prop: () => ({}),",
      "\t}",
      ");",
      "</script>",
      "<style lang=\"less\" name=\"$1\" scoped>",
      "</style>"
    ],
    "description": "快速创建vue3 + ts + scss文件"
  }
}
```
