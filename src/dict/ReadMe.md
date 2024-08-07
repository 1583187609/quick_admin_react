# 前言

- 全局字典是为了统一管理、统一查阅
- 全局字典写法示例：两种方案
- @notice 字典名采用大驼峰，是为了方便改动时方便全局搜索

# 方案一：此方案适合后端字典 code 值不统一时使用，本质是前端强行拦截一层，将不统一变得统一。

- @description 不统一的含义是指：当中文含义一样时，code 值却不一样。例：关于你（0 待审核，1 已通过，2 已驳回）、关于我（3 待审核，2 已通过，1 已驳回），导致前端组件复用时，会因为这种不统一，会做好些额外的逻辑处理，一旦后续需求迭代更改，内部的额外逻辑会变得愈加复杂，使得开发更费神
- @notice 下面的 key 属性保持命名统一是必要的。例：所有的未知都用 unknown，待审核都用 wait，已通过都用 pass，已驳回都用 reject。否则，前端强行拦截一层则没有意义
- @notice 优点：强行统一后端未做到统一的 code 值，减少后续逻辑复杂度，提升开发效率；缺点：定义这套字典需要写额外多的字符，显得有点繁琐。但对于【代码是写给人看的，只是恰好机器能够执行】而言，提升开发效率、可维护性，显得更为重要。

# 常用单词推荐（目的是做到单词统一）

- @param 状态类（审核）：pass(通过)、reject(驳回)；enable(启用)、forbid(禁用)；
- @param 枚举类（性别）：unknown(未知)、
- @param 其他类（暂无）：

```js
export default {
  // 性别
  Gender: {
    unknown: {
      label: "未知",
      value: 0,
      // attrs:{} , //其他自定义属性，比如根据字典映射，有时候有标签展示的需求，对应的标签颜色风格，可在此处定义
    },
    man: {
      label: "男",
      value: 1,
    },
    woman: {
      label: "女",
      value: 2,
    },
  },
  // 审核状态
  AuditStatus: {
    wait: {
      label: "待审核",
      value: 1,
    },
    pass: {
      label: "已通过",
      value: 2,
    },
    reject: {
      label: "已驳回",
      value: 3,
    },
  },
};
```

# 方案二：此方案适合后端字典 code 值能保证统一或几乎绝大多数能够保证统一的情况

- @description 此方案比方案一看着会清爽很多，能够少些好些字符，但很依赖后端 code 值的统一性

```js
export default {
  // 性别
  Gender: {
    0: {
      text: "未知",
      // attrs:{} , //其他自定义属性，比如根据字典映射，有时候有标签展示的需求，对应的标签颜色风格，可在此处定义
    },
    1: { text: "男" },
    2: { text: "女" },
  },
  // 审核状态
  AuditStatus: {
    1: { text: "待审核" },
    2: { text: "已通过" },
    3: { text: "已驳回" },
  },
};
```
