/**
 * 文件说明 - 模板文件
 */

import { Tooltip } from "antd";
import { CSSProperties, useState } from "react";
import { useStoreSlice } from "@/hooks";
import { LayoutType } from "@/store/modules/set";
import { CommonObj } from "@/vite-env";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  value?: LayoutType;
  onChange?: (val: LayoutType) => void;
  [key: string]: any;
}

const tooltipAttrs = {
  //   placement: "top",
};
const layoutMap: { [key in LayoutType]: CommonObj } = {
  columns: {
    name: "分栏",
    class: "f-sb-s",
  },
  classics: {
    name: "经典",
    class: "f-fs-s-c",
  },
  vertical: {
    name: "纵向",
    class: "f-sb-s",
  },
  horizontal: {
    name: "横向",
    class: "f-fs-s-c",
  },
};
const keys: LayoutType[] = Object.keys(layoutMap) as LayoutType[];
export default ({ className = "", value, onChange, children, ...restProps }: Props) => {
  const { layout, updateSetState } = useStoreSlice("set");
  const [type, setType] = useState<LayoutType>(value ?? layout.type);
  function handleSelected(val: LayoutType) {
    setType(val);
    onChange?.(val);
    updateSetState(["layout", { type: val }, "set"]);
  }
  return (
    <div className={`${className} ${s["layout-style"]} f-sb-fs-w`} {...restProps}>
      {keys.map((key: LayoutType) => {
        const item = layoutMap[key];
        return (
          <Tooltip title={item.name} {...tooltipAttrs} key={key}>
            <div
              onClick={() => handleSelected(key)}
              className={`${s.item} ${type == key ? s.active : ""}  ${s[key]} ${item.class}`}
            >
              {key === "columns" ? (
                <>
                  <div className={`${s.menu} ${s.box} f-0`}></div>
                  <div className={`${s.side} ${s.box} f-0`}></div>
                  <div className="f-fs-s-c f-1">
                    <div className={`${s.side} ${s.box} ${s.right} f-0 `}>1</div>
                    <div className={`${s.main} ${s.box} f-1`}></div>
                  </div>
                </>
              ) : key === "classics" ? (
                <>
                  <div className={`${s.menu} ${s.box} f-0`}></div>
                  <div className="f-sb-s f-1">
                    <div className={`${s.side} ${s.box} f-0`}></div>
                    <div className={`${s.main} ${s.box} f-1`}></div>
                  </div>
                </>
              ) : key === "vertical" ? (
                <>
                  <div className={`${s.menu} ${s.box} f-0`}></div>
                  <div className={`${s.main} ${s.box} f-1`}></div>
                </>
              ) : key === "horizontal" ? (
                <>
                  <div className={`${s.menu} ${s.box} f-0`}></div>
                  <div className={`${s.main} ${s.box} f-1`}></div>
                </>
              ) : null}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
