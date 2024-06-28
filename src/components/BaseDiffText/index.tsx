const Diff = require("diff");
// import Diff from 'diff';
import { useEffect, useState } from "react";

export type DiffType = "words" | "chars" | "lines";

interface Props {
  className?: string;
  oldStr?: string;
  newStr?: string;
  type?: DiffType;
}

function getDiffHtmlStr(str1 = "", str2 = "", type: DiffType = "words") {
  let html = "";
  const Type = type[0].toUpperCase() + type.slice(1);
  const diffs = Diff["diff" + Type](str1, str2);
  diffs.forEach((item: CommonObj) => {
    const { added, removed, value } = item;
    html += added
      ? `<span style="color: red;">${value}</span>`
      : removed
      ? `<del style="color: #999;">${value}</del>`
      : value;
  });
  return html;
}

//oldStr: 一二三四五六七八九十1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
//newStr: 一二三四五我们的家乡1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
export default ({
  className = "",
  oldStr = "",
  newStr = "",
  type = "words",
}: Props) => {
  const [htmlStr, setHtmlStr] = useState("");
  useEffect(() => {
    setHtmlStr(getDiffHtmlStr(oldStr, newStr, type) || "-");
  }, []);
  return (
    <div
      className={`${className}}`}
      dangerouslySetInnerHTML={{
        __html: htmlStr,
      }}
    ></div>
  );
};
