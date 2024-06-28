import { StrNum } from "@/vite-env";
import dayjs from "dayjs";
import Mock from "mockjs";

/**
 * 一、 语法规范
 * 'name|rule': value    name（属性名）、rule（生成规则）、value（属性值）
 * 二、生成规则的7种格式：
 * 'name|min-max': value
 * 'name|count': value
 * 'name|min-max.dmin-dmax': value     //表示生成一个名为 name 的属性，该属性的值是一个范围在 min 到 max 之间的浮点数，小数部分保留dmin~dmax位，并且初始值为 value
 * 'name|min-max.dcount': value   //表示生成一个名为 name 的属性，该属性的值是一个范围在 min 到 max 之间的浮点数，小数部分保留dcount位，并且初始值为 value
 * 'name|count.dmin-dmax': value
 * 'name|count.dcount': value
 * 'name|+step': value
 * 三、数据模板定义规范
 * 1、String
 * 'name|min-max': string   通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。
 * 'name|count': string    通过重复 string 生成一个字符串，重复次数等于 count。
 * 2、Number
 * 'name|+1': number    属性值自动加 1，初始值为 number。
 * 'name|min-max': number  生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
 * 'name|min-max.dmin-dmax': number    生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。
 * 3、Boolean
 * 'name|1': boolean    随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
 * 'name|min-max': value   随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
 * 4、Object
 * 'name|count': object 从属性值 object 中随机选取 count 个属性。
 * 'name|min-max': object  从属性值 object 中随机选取 min 到 max 个属性。
 * 5、Array
 * 'name|1': array  从属性值 array 中随机选取 1 个元素，作为最终值。
 * 'name|+1': array    从属性值 array 中顺序选取 1 个元素，作为最终值。
 * 'name|min-max': array   通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
 * 'name|count': array 通过重复属性值 array 生成一个新数组，重复次数为 count。
 * 6、Function
 * 'name': function 执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
 * 7、Regexp
 * 'name': regexp根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。
 * 四、数据占位符定义规范
 * 1、占位符只是在属性值字符串中占个位置，并不出现在最终的属性值中。
 * 2、占位符的格式为：@占位符 或 @占位符(参数 [, 参数])
 * 3、注意：
 * 用 @ 来标识其后的字符串是 占位符。
 * 占位符 引用的是 Mock.Random 中的方法。
 * 通过 Mock.Random.extend() 来扩展自定义占位符。
 * 占位符 也可以引用 数据模板 中的属性。
 * 占位符 会优先引用 数据模板 中的属性。
 * 占位符 支持 相对路径 和 绝对路径。
 */

/**
 * 根据数据模板生成模拟数据
 * @params {String} rurl 请求地址：可以是url字符串或url正则。例如 /\/domain\/list\.json/、'/domian/list.json'
 * @params {String} rtype 请求类型：可以是get、post、put、patch、delete
 * @params {Object、String} template 数据模板：可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
 * @params {Function}} handle 用于生成响应数据的函数
 * @returns
 */
// Mock.mock( rurl?, rtype?, template|handle( opts ) )  //opts指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性，参见 XMLHttpRequest 规范。
// Mock.mock( template )
// Mock.mock( rurl, template )
// Mock.mock( rurl, handle( opts ) )
// Mock.mock( rurl, rtype, template )
// Mock.mock( rurl, rtype, handle( opts ) )

/**
 * 配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。
 * @params {Object} settings 配置项集合。{timeout: 400}  400，表示400毫秒后才会返回响应内容；'200-600'，表示响应时间介于200和600毫秒之间。默认值是'10-100'
 */
// Mock.setup(settings)
// Mock.setup({ timeout: 3000 });

/**
 * Mock.Random是一个工具类，用于生成各种随机数据。提供的完整方法（占位符）如下：
 * Basic	boolean, natural, integer, float, character, string, range, date, time, datetime, now
 * Image	image, dataImage
 * Color	color
 * Text	    paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
 * Name	    first, last, name, cfirst, clast, cname
 * Web	    url, domain, email, ip, tld
 * Address	area, region
 * Helper	capitalize, upper, lower, pick, shuffle
 * Miscellaneous	guid, id
 *
 */

/**
 * 校验真实数据 data 是否与数据模板 template 匹配。
 * @params {Object,String} 数据模板，可以是对象或字符串。例如 { 'list|1-10':[{}] }、'@EMAIL'。
 * @params {*} data 真实数据
 */
//  Mock.valid( template, data )

/**
 * 把 Mock.js 风格的数据模板 template 转换成 JSON Schema。
 * @params {Object,String} 数据模板，可以是对象或字符串。例如 { 'list|1-10':[{}] }、'@EMAIL'。
 */
// Mock.toJSONSchema( template )

/**
 * 使用示例
 */
// const Example = Mock.mock({
//     //这是将属性值随机循环随机次数，最小为1次，最大为3次
//     "name|1-3": "随机字符串示例",
//     // 属性值自动加 1，初始值为 202
//     "id|+1": 202,
//     // 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 2 位
//     "price|1-100.1-2": 1,
//     // 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
//     "isTrue|1": true,
//     //随机生成一个布尔值， 值为 value 的概率是 1 / (1 + 9)， 值为!value 的概率是 9 / (1 + 9)。
//     "isOne|9-1": true,
//     //从属性值 object 中随机选取 2 到 4 个属性。
//     "randProvince|2-4": {
//         "110000": "北京市",
//         "120000": "天津市",
//         "130000": "河北省",
//         "140000": "山西省"
//     },
//     // 通过重复属性值 array 生成一个新数组，重复次数大于等于 1，小于等于 10
//     "randArray|1-5": [
//         "flc"
//     ],
//     //按照正则表达式生成数据
//     'strByRegexp': /[a-z][A-Z][0-9]/,
//     //将上面属性 id 和 strByRegexp 的值获取并赋值给 absolutePath
//     "_mixVal": "@/id @/strByRegexp",
//     //占位符的使用
//     "userName": {
//         first: '@FIRST',
//         middle: '@FIRST',
//         last: '@LAST',
//         full: '@first @middle @last'
//     }
// })
// console.log(Example, 'Example')

/**
 * 自定义扩展Mock
 */
// Mock.Random.extend({
//   // 生成早于当前时间的随机日期
//   getRandomEarlyDate,
//   // 获取随机的日志时间（创建时间、修改时间）
//   getRandomLogDate(createTime?: number, fmt = "YYYY-MM-DD HH:mm:ss") {
//     if (!createTime)
//       return dayjs(getRandomEarlyDate(undefined, undefined, "")).format(fmt);
//     const nowTime = Date.now();
//     const diff = nowTime - new Date(createTime).getTime();
//     const randomDiff = Math.floor(Math.random() * diff);
//     return dayjs(new Date(nowTime - randomDiff)).format(fmt);
//   },
// });
// export const extendMock = Mock;

/**
 * 生成早于当前时间的随机日期
 * @param maxDiff 距离现在最久的时刻（单位：秒）
 * @param minDiff 距离现在最近的时刻（单位：秒）
 * @returns
 */
// function getRandomEarlyDate(
//   minDiff = 60 * 60 * 0.1,
//   maxDiff = 60 * 60 * 24 * 365,
//   fmt = "YYYY-MM-DD HH:mm:ss"
// ): StrNum {
//   const now = Date.now();
//   const randomDiff = (Math.floor(Math.random() * maxDiff) + minDiff) * 1000;
//   const randomTime = new Date(now - randomDiff).getTime();
//   return fmt ? dayjs(randomTime).format(fmt) : randomTime;
// }

/**
 * 生成响应内容
 * @param {Object} param 参数内容 code: 0 成功;  <0失败且不显示失败内容;  >0失败，但是提示消息内容
 * @returns
 */
export interface ResponseType {
  code?: number;
  msg?: string;
  data?: any;
}
export default (res: ResponseType = { code: 0, msg: "成功", data: null }): ResponseType => {
  const { code = 0, msg = "成功", data = null } = res;
  return { code, msg, data };
};
