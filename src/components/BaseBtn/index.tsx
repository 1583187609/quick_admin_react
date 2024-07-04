/**
 * 系统内置基础按钮
 */

import { Button, Popconfirm } from "antd";
import { ButtonSize } from "antd/es/button";
import { ButtonType } from "antd/lib/button";
import { CSSProperties } from "react";
import { BaseBtnType, BtnItem, BtnName, PopconfirmAttrs } from "./_types";
import { getBtnObj } from "./_utils";
import { useRouter } from "@/hooks";
import { showMessage } from "../_utils";

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
  [key: string]: any;
}

export default ({ className = "", style, btn, attrs, onClick, children, ...restProps }: Props) => {
  const router = useRouter();
  const newBtn: BtnItem = getBtnObj(btn, { attrs } as BtnItem);
  //处理点击事件
  function handleClick() {
    const { name, text, to } = newBtn;
    if (to) return router.push(to);
    if (onClick) return onClick(name);
    showMessage(`暂未处理 【${text}】按钮 - ${name}`, "error");
  }

  return newBtn.popconfirm ? (
    <Popconfirm onConfirm={handleClick} {...(newBtn.popconfirm as PopconfirmAttrs)}>
      <Button className={`${className}`} style={style} icon={newBtn.icon} {...restProps} {...newBtn.attrs}>
        {children ?? newBtn.text}
      </Button>
    </Popconfirm>
  ) : (
    <Button onClick={handleClick} className={`${className}`} style={style} icon={newBtn.icon} {...restProps} {...newBtn.attrs}>
      {children ?? newBtn.text}
    </Button>
  );
};
