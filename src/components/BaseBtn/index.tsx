/**
 * 系统内置基础按钮
 */

import { Button, message, Popconfirm } from "antd";
import { ButtonSize } from "antd/es/button";
import { ButtonType } from "antd/lib/button";
import { useMemo, CSSProperties } from "react";

import {
  BaseBtnType,
  BtnItem,
  BtnName,
  BtnMap,
  PopconfirmAttrs,
  BtnFn,
} from "./_types";
import { getPopconfirmAttrs, getBtnObj } from "./_utils";
import { useRouter } from "@/hooks";

export * from "./_types";
export * from "./_utils";
export * from "./btns";

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: string;
  btn: BaseBtnType;
  attrs?: {
    size?: ButtonSize;
    type?: ButtonType;
  };
  onClick?: (name: BtnName) => void;
}

export default ({
  className = "",
  style,
  btn,
  attrs,
  children = "",
  onClick,
}: Props) => {
  const router = useRouter();
  const newBtn: BtnItem = useMemo(
    () => getBtnObj(btn, { attrs } as BtnItem),
    [btn]
  );
  //处理点击事件
  function handleClick() {
    const { name, text, to } = newBtn;
    if (to) {
      router.push(to);
    } else if (onClick) {
      onClick(name);
    } else {
      message.error(`暂未处理 【${text}】按钮 - ${name}`);
    }
  }

  return (
    <>
      {newBtn.popconfirm ? (
        <Popconfirm
          onConfirm={handleClick}
          {...(newBtn.popconfirm as PopconfirmAttrs)}
        >
          <Button
            className={`${className}`}
            style={style}
            icon={newBtn.icon}
            {...newBtn.attrs}
          >
            {children || newBtn.text}
          </Button>
        </Popconfirm>
      ) : (
        <Button
          onClick={handleClick}
          className={`${className}`}
          style={style}
          icon={newBtn.icon}
          {...newBtn.attrs}
        >
          {children || newBtn.text}
        </Button>
      )}
    </>
  );
};
