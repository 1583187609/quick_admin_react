/**
 * 计算src/views下开发的有效页面
 * @return
 */
export function getDevelopPages() {
  const pages = import.meta.glob("@/views/**/*.tsx");
  const allNames = Object.keys(pages);
  const unValidNames: string[] = []; //无效页面
  //有效页面
  const valideNames = allNames.filter((key: string) => {
    if (key.includes(" ")) unValidNames.push(key);
    return !key.includes("/_") && !key.includes(" ");
  });
  return {
    valideNames,
    unValidNames,
  };
}
