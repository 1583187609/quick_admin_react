/**
 * 测试3
 */

import BaseEditor from "@/components/BaseEditor";
import { useEffect, useState } from "react";
import {
  tagOne,
  tagTwo,
  htmlView,
  copyHtml,
  copyText,
} from "@/components/BaseEditor/menu";
import { Boot, IModuleConf } from "@wangeditor/editor";

interface Props {
  className?: string;
}

export default ({ className = "" }: Props) => {
  const [sensWords, setSensWords] = useState<string[]>([]);
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    setTimeout(() => {
      setSensWords(["祖国", "田野"]);
      setWrongWords(["假象", "上"]);
      setValue("我们的假象，在希望的田野上，热爱我们的祖国！");
    }, 500);
  }
  function handleBlur() {
    setTimeout(() => {
      setSensWords(["祖"]);
      setWrongWords(["假"]);
    }, 500);
  }
  function insertMenu() {
    const module: Partial<IModuleConf> = {
      menus: [tagOne, tagTwo, htmlView, copyHtml, copyText],
    };
    Boot.registerModule(module);
  }
  return (
    <>
      <BaseEditor
        // toolbarConfig={{
        //   insertKeys: {
        //     index: 0, // 插入的位置，基于当前的 toolbarKeys
        //     keys: ["html-view", "tag-1", "tag-2", "copy-text"],
        //   },
        // }}
        // insertMenu={insertMenu}
        value={value}
        onBlur={handleBlur}
        onChange={setValue}
        wordsList={{ wrong: wrongWords, sens: sensWords }}
      />
    </>
  );
};
