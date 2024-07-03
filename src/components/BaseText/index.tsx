/**
 * 文件说明-模板文件
 */

import { StrNum } from "@/vite-env";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "@/components/provider/PopupProvider";
import { getIsOver } from "@/utils";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  maxLine?: StrNum; //最多显示几行，可选值：1~5 必须为整数
  title?: string;
  width?: StrNum;
  [key: string]: any;
}
export default ({ className = "", maxLine = 5, title = "详情", width = "500px", children, ...restProps }: Props) => {
  const { openPopup } = useContext(PopupContext);
  const baseTextRef = useRef<any>(null);
  const [isOver, setIsOver] = useState<boolean>(false);
  useEffect(() => {
    setIsOver(getIsOver(baseTextRef.current));
  }, []);
  function handleClick(e: any) {
    if (isOver) openPopup({ title, width }, e.target.innerText);
  }
  return (
    <div
      className={`${className} ${s["base-text"]} line-${maxLine} ${isOver ? s.over : ""}`}
      onClick={handleClick}
      ref={baseTextRef}
      {...restProps}
    >
      {children}
    </div>
  );
};
