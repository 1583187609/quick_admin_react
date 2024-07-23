# 基础安装与配置

## 1、文件目录规范检测

`npm i @ls-lint/ls-lint -D`

```yml
ls:
  .dir: kebab-case | regex:__[a-z0-9]+__
  .vue: kebab-case | PascalCase
  .js: kebab-case

ignore:
  - node_modules
  - .git
  - .vscode
  - .hbuilderx
  - .idea
  - dist
  - .eslintrc.js
  - babel.config.js
  - postcss.config.js
```

```json
{
  "scripts": {
    "lint:ls": "ls-lint"
  }
}
```

## 2、husky 和 lint-staged 配置

Husky 就是 Git 的生命周期工具，在安装它之后，它能够自动的在项目的.git 目录下增加相应的钩子，让你可以监听到 Git 的各个生命周期，并且配置对应的的 shell 命令
我们通过这个工具来监听 Git 的 commit 动作，让 ESLint 在 commit 之前自动检查一下我们的代码。高版本 husky 会对 Git 有兼容问题，Git 不会触发 pre-commit

lint-stated 就是针对 Git 暂存区的文件做校验的一个工具。由于在 commit 之前，我们要提交的文件是在暂存区的，我们可以利用这个工具来校验我们即将 commit 的文件，而不会校验其它的文件

`npm i husky -D`
`npm i lint-staged -D`

初始化 husky，并创建 .husky 文件夹。不同版本的 husky 配置可能不一样，具体配置可查看文档。
`npx husky install`

在 package.json 中增加 prepare 钩子，用于在 npm install 之后自动初始化 Husky

如果执行 `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'` 抛出错误 `add command is deprecated`，则换用命令
`echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,ts}": "eslint --fix",
    "*.{css,scss,sass}": "stylelint --fix",
    "**/*": "prettier --write",
    "src/**": "ls-lint"
  }
  // "husky": {
  //   "hooks": {
  //     "pre-commit": "eslint src/**/*{.js,.vue}"
  //   }
  // },
  // "lint-staged": {
  //   "*.{js,jsx,vue}": ["eslint --ext .js,.jsx,.vue src", "prettier --write ./src"]
  // }
}
```

## 提交规范检查

commit message 的格式，采用 Angular 规范如下

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必填，Body 和 Footer 是选填。
每个团队对提交的 commit message 格式有约定俗称的要求，但是没有一个统一的规范，导致大家提交的 commit message 或多或少不太一样。因此，需要一个工具来帮助大家统一 commit message 的格式，也方便后续的分析和拓展。

`npm i @commitlint/cli @commitlint/config-conventional -D`

在项目根目录添加.commitlintrc.js 配置文件

```js
const types = ["chore", "docs", "feat", "fix", "refactor", "revert", "test"];
module.exports = {
  extents: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", types],
  },
};
```

在 package.json 中

```json
  "husky": {
    // "hooks": {
    //   "pre-commit": "lint-staged",
    //   "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    // }
  },
```

## Git 提交注意事项

git --no-verify 是 Git 命令的一个选项，用于在提交代码时绕过 Git 钩子（hook）的校验。
`git commit -m "xxx" --no-verify`
