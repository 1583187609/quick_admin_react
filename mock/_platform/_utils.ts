/**
 * 获取域名+pathname
 * @example 发布到gitee上的有效地址：https://fanlichuan.gitee.io/quick_admin_vue3/dist/static/imgs/girl-1.jpg
 * @example VsCode Live Sever打开的有效地址：http://127.0.0.1:5500/dist/static/imgs/boy-6.jpg
 * @example 发布到github上的有效地址：https://1583187609.github.io/quick_admin/react/preview/static/imgs/boy-4.jpg
 */
export function getBasePath(projectName = "quick_admin", rootPath = "/react/preview") {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return ""; //开发模式
  const { origin, host } = location;
  const isLiveSever = host.startsWith("127");
  return `${origin}/${isLiveSever ? "" : projectName}${rootPath}`;
}
