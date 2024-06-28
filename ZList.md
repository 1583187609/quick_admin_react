::: tips 注意事项
已实现的功能大都没记录在下方列表中。以下清单是为了记录平时开发中临时发现（或想到的）的 bug、优化、功能点等。正持续完善中……
:::

# 一、功能清单

## 待完善

7、BaseCrud 表格列显隐设置功能
9、封装 PieChart、BarChart、LineChart 组件
~~13、页面标签功能~~
~~15、按钮权限控制~~
3、操作栏按钮按条件显示
~~22、菜单折叠功能~~
17、权限控制相关页面开发及逻辑梳理整理：路由权限控制（未登录不能进入页面）、页面 403 提示等
19、BaseFormItem 日期表单控件的传值、回显值问题
20、让所有的组件实现全继承属性参数
21、使用状态管理 redux

## 待实现

2、BaseCrud 表格排序功能
8、BaseCrud 打印设置功能
10、富文本编辑器组件
11、个性化工作台可拖动
12、大屏页面制作
20、按钮做防抖处理
23、增强批量处理功能：全选、全不选、反选等
31、登录加密处理（采用 md5）
30、env 文件配置、打包配置
18、文档（教程）整理：开源后的使用查阅指南
26、BaseCrud 增加拖动行排序的功能
29、BaseCrud 全选/全不选/反选逻辑处理
27、vite 启动首次打开页面是自动跳转到 login 页面
9、页面标签增加拖动功能
21、使用 redux 进行状态管理
22、工作台模块自定义拖动摆放功能
~~21、添加水印功能~~
2、路由管理文件添加 重定向功能
~~1、筛选条件-年龄-自定义年龄范围组件（自动触发表单校验、回显数据）~~
~~5、BaseCrud 统一导出、删除提示语~~
~~16、动态路由进行菜单权限控制~~
~~25、完善缺省页：404，403，500~~
~~28、顶部导航及页签，左侧菜单，三方联动~~

# 二、优化清单

## 待完善

3、BaseFormItem 密码框默认配置显示是否可见按钮
6、左侧折叠菜单时的动画优化
2、关闭其他页签之后，始终保持存在一个选中的页签
~~1、动态路由 vite 懒加载警告处理~~
~~3、去掉 moment 包~~
~~4、页面右键菜单添加图标~~

## 待实现

1、BaseCrud 点击更多按钮，点击启用，弹出 popconfirm 后，滚动表单，popconfirm 会错位的问题处理
4、BaseDrawer 延迟关闭，让过渡动画完毕后再关闭弹窗
5、去掉谷歌浏览器 input 输入框背景色
8、BaseCrud 序号列从 1 开始递增处理
11、page-tags 优化内容：点击不同的关闭类型，做跳转到其他页面处理；新增路由栈时，自动滚动到选中的页签处；
12、处理切换路由时，总是会闪屏的问题，useMemo 缓存优化
13、BaseForm 设置自动撑满，总是撑满，默认撑满属性
~~15、readonly（只读）、pureText （纯文本展示处理，不显示输入框）~~
25、参照这个进行工程全局化配置：https://ant.design/components/config-provider-cn
16、控制台警告处理
~~17、BaseFormItem 设置默认 showCount 属性（并支持统一传参改变该属性）~~
~~2、自定义年龄范围组件自动动触发表单校验 【最小值不能超过最大值】~~
~~7、layout TheHead 监听路由变化来选中指定菜单~~
8、全局 drawer、modal 区分关闭之后是否销毁弹出层

# 三、Bug 清单

~~1、处理新增窗口提交后，不能关闭 Drawer 的问题~~
~~2、处理页面中点击刷新按钮后，右键菜单未自动关闭的 bug~~

# 四、React 极致优化清单：

1、useCallback 和 useMemo 配合使用优化所有组件:
参考：https://www.jianshu.com/p/78a8ee86742d
2、React 嵌套路由优化：

# 五、Mock 清单

~~1、完善省市区联动的接口~~

# 六、工程处理清单

1、整个工程的逻辑低耦合、高内聚、高可配置性处理
2、env 类环境文件配置
3、提取所有基础组件配置到统一的配置文件中
4、ts 类型优化
5、vite 打包配置优化

# 十、文件目录组织规则清单（待完善）

1、有路由对应的叫页面，否则都叫组件；
2、命名风格：

```
- 页面：page-name
- 组件：ComponentName
- 全局组件：src/components
- 全局基础组件：src/components/BaseCrud //Base 开头，绝大多数情况都会用到的
- src/pages-data/user/account
  ├── _components //局部组件（下划线开始有助于和其他文件夹区分开，同时置顶
  │   ├── AddEdit.tsx //大驼峰命名（组件）  简单组件：代码少，单个页面可写完
  │   ├── OtherComplex.tsx //大驼峰命名（组件）  复杂组件：代码多，拆分成多个文件写
  │         ├── _help.tsx //类似于utils文件，以下滑线开头，会被置顶，用于区分其他文件
  │         ├── fileds.tsx
  │         ├── index.tsx
  │── fields.tsx
  │── index.tsx 小写短横线链接命名（页面）
```

# 文件目录结构（部分）

    ├── .vscode // 本地vscode配置
    │   └── settings.json
    ├── mock //mock 数据相关
    ├── node_modules
    ├── public // 公共资源
    │   ├── favicon.ico
    │   └── vite.svg
    ├── src //项目主要逻辑代码均在里面
    │   ├── api // API 目录
    │   ├── api-mock // MOCK API 目录
    │   ├── assets //静态资源 css 图片等
    │   ├── components //全局基础组件
    │   ├── config //全局配置
    │   ├── hooks //全局hooks
    │   ├── http //请求方法体封装（一个项目可能需要多个封装类型，所以单独提取成一个文件夹）
    │   ├── layout //后台管理的页面布局
    │   ├── pages-auth //权限管理模块页面
    │   ├── pages-data //业务数据模块页面
    │   ├── pages-public //任意项目公用页面：登录、缺省页（403、404、500等）
    │   ├── pages-test //测试专用页面
    │   │  └── index.tsx  // 首页
    │   ├── utils //常用工具方法
    │   ├── App.tsx //
    │   ├── main.tsx //入口文件配置
    │   └── vite-env.d.ts //全局ts类型
    ├── .env  //环境变量配置
    ├── .env.dev
    ├── .env.local
    ├── .env.prod
    ├── .env.test
    ├── .eslintrc.json // ESlint 配置
    ├── .gitnore
    ├── .prettierrc // Prettier 配置
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json  //ts 配置
    ├── Zlist.md  //任务清单：功能、优化、bug等
    └── README.md
