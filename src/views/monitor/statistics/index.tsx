/**
 * 页面 & 组件统计分析
 */

import { CSSProperties } from "react";
import { getDevelopPages, getDevelopComponents } from "@/utils";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}
export default ({ className = "", ...restProps }: Props) => {
  const pages = getDevelopPages();
  const comps = getDevelopComponents();
  return (
    <div className={`${className} ${s["test-seven"]} page-view f-sb-s `} {...restProps}>
      <div className={`${s.left} ${s.box} f-fs-s-c f-1`}>
        <div className={`${s.scroll} f-fs-s-c`}>
          <h3 className={`${s.h3} f-0`}>总计共开发有效页面（含复杂弹窗）：{pages.valideNames.length}个</h3>
          <ul className={`${s.list} hover-show-scroll`}>
            {pages.valideNames.map((item, ind) => {
              return (
                <li className={`${s.li}`} key={ind}>
                  {ind + 1}、{item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="f-0">
          <h3 className={`${s.h3} f-0 mt-o`}>暂时备用无效页面（含复杂弹窗）：{pages.unValidNames.length}个</h3>
          <ul className={`${s.list} f-0`}>
            {pages.unValidNames.map((item, ind) => {
              return (
                <li className={`${s.li}`} key={ind}>
                  {ind + 1}、{item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${s.right} ${s.box} ml-t f-fs-s-c f-1`}>
        <div className={`${s.scroll} f-fs-s-c`}>
          <h3 className={`${s.h3} f-0`}>总计共开发有效组件：{comps.valideNames.length}个</h3>
          <ul className={`${s.list} hover-show-scroll`}>
            {comps.valideNames.map((item, ind) => {
              return (
                <li className={s.li} key={ind}>
                  {ind + 1}、{item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="f-0">
          <h3 className={`${s.h3} f-0 mt-o`}>暂时备用无效组件：{comps.unValidNames.length}个</h3>
          <ul className={`${s.list} f-0`}>
            {comps.unValidNames.map((item, ind) => {
              return (
                <li className={`${s.li}`} key={ind}>
                  {ind + 1}、{item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
