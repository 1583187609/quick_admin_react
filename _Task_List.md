# 任务清单列表

::: tips 注意事项  
已实现的功能大都没记录在下方列表中。以下清单是为了记录平时开发中临时发现（或想到的）的 bug、优化、功能点等。正持续完善中……  
:::

## 一、功能清单

### 待完善

7、BaseCrud 表格列显隐设置功能完善（存在 Bug）  
~~9、封装 PieChart、BarChart、LineChart 组件~~  
~~13、页面标签功能~~  
~~15、按钮权限控制~~  
3、操作栏按钮按条件显示  
~~22、菜单折叠功能~~  
17、权限控制相关页面开发及逻辑梳理整理：路由权限控制（未登录不能进入页面）、页面 403 提示等  
~~19、BaseFormItem 日期表单控件的传值、回显值问题~~  
~~20、让所有的组件实现全继承属性参数~~  
~~21、使用状态管理 redux~~

### 待实现

2、BaseCrud 表格排序功能  
8、BaseCrud 打印设置功能  
10、富文本编辑器组件  
11、个性化工作台可拖动  
12、大屏页面制作  
~~20、按钮做防抖处理~~  
23、增强批量处理功能：全选、全不选、反选等  
31、登录加密处理（采用 md5）  
~~30、env 文件配置、打包配置~~  
18、文档（教程）整理：开源后的使用查阅指南  
26、BaseCrud 增加拖动行排序的功能  
29、BaseCrud 全选/全不选/反选逻辑处理  
~~27、vite 启动首次打开页面是自动跳转到 login 页面~~  
9、页面标签增加拖动功能  
~~21、使用 redux 进行状态管理~~  
22、工作台模块自定义拖动摆放功能  
~~21、添加水印功能~~  
2、路由管理文件添加 重定向功能  
~~1、筛选条件-年龄-自定义年龄范围组件（自动触发表单校验、回显数据）~~  
~~5、BaseCrud 统一导出、删除提示语~~  
~~16、动态路由进行菜单权限控制~~  
~~25、完善缺省页：404，403，500~~  
~~28、顶部导航及页签，左侧菜单，三方联动~~  
29、切换路由时增加过渡动画  
30、工程量大了后，全局字典，以及命名是否会重复的优化处理手段  
31、国际化语言处理（只做 layout 的国际化就够了）  
32、换肤处理（绿色）  
33、完善上传头像逻辑，使得本地也可以显示刚选择好的头像

## 二、优化清单

### 待完善

~~3、BaseFormItem 密码框默认配置显示是否可见按钮~~  
6、左侧折叠菜单时的动画优化  
2、关闭其他页签之后，始终保持存在一个选中的页签  
~~1、动态路由 vite 懒加载警告处理~~  
~~3、去掉 moment 包~~  
~~4、页面右键菜单添加图标~~  
~~5、vite 打包配置优化（参照 vue 版的）~~  
5、工程 Eslint、Prettier、husky、ls-lint 配置处理  
6、实现 Select 公司下拉项的自定义  
~~7、菜单选中后，自动跳转到第一级子菜单处理~~  
~~8、PathBreadcrumb 点击某一级后跳转到对应页面处理~~  
9、页签采用 Tabs 处理，并实现缓存功能  
10、仅开发环境下查看的页面，发布到生产环境之后，跳转到 403（未授权）页面进行提示  
11、BaseNumberRange 组件功能完善  
12、BaseCrud 显示/隐藏列功能存在 Bug  
~~13、完善 router 路由系统~~  
14、表单提交时候，给 switch 的值做 true 和 false 的值映射处理

### 待实现

~~1、BaseCrud 点击更多按钮，点击启用，弹出 popconfirm 后，滚动表单，popconfirm 会错位的问题处理~~  
~~4、BaseDrawer 延迟关闭，让过渡动画完毕后再关闭弹窗~~  
5、去掉谷歌浏览器 input 输入框背景色  
~~8、BaseCrud 序号列从 1 开始递增处理~~  
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
9、封装的表单组件，对于区间类型的，dataIndex 可以传一个字段或两个字段（数组）处理  
10、表单组件封装完善，参照 Vue 版本的  
11、全局 Ts 命名语义化，从 UI 库中继承，从当前工程定义好的基础类型继承  
~~12、auth 权限处理~~  
13、基础组件配置提取  
14、SectionForm、BaseForm 值的转换处理

## 三、Bug 清单

~~1、处理新增窗口提交后，不能关闭 Drawer 的问题~~  
~~2、处理页面中点击刷新按钮后，右键菜单未自动关闭的 bug~~

## 四、React 极致优化清单：

~~1、useCallback 和 useMemo 配合使用优化所有组件:~~  
参考：https://www.jianshu.com/p/78a8ee86742d  
2、React 嵌套路由优化：

## 五、Mock 清单

~~1、完善省市区联动的接口~~

## 六、工程处理清单

1、整个工程的逻辑低耦合、高内聚、高可配置性处理  
~~2、env 类环境文件配置~~  
3、提取所有基础组件配置到统一的配置文件中  
4、ts 类型优化  
~~5、vite 打包配置优化~~
