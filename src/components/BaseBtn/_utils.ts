import { typeOf } from "@/utils";
import { merge } from "lodash";
import { btnsMap } from "./btns";
import { BaseBtnType, BtnItem, BtnName, BtnFn } from "./_types";
import { CommonObj } from "@/vite-env";
// import { ExclamationCircleOutlined } from "@ant-design/icons";

/**
 * 获取popconfirm的属性对象
 * @param popconfirm string boolean object
 * @param text string 按钮文字
 */
export function getPopconfirmAttrs(popconfirm: string | boolean | CommonObj, text: string) {
  if (!popconfirm) return;
  //如果自定义popconfirm属性时忘记了加title属性，则自动加上，这个在antd中是必传的，如果为空，也会导致样式有点错乱
  if (typeOf(popconfirm) === "Object") return Object.assign({ title: "温馨提示" }, popconfirm);
  return {
    title: "温馨提示",
    description: `确认是否${text}？`,
    // icon: <ExclamationCircleOutlined className="color-danger" />,
    okButtonProps: {
      danger: true,
    },
    cancelButtonProps: {},
  };
}

/**
 * 根据按钮名或按钮对象获取按钮对象
 * @param btn string | object | function 按钮名或按钮对象或方法函数
 */
export function getBtnObj(btn: BaseBtnType, btnItem?: BtnItem, row?: CommonObj): BtnItem {
  const type = typeOf(btn);
  let btnObj: BtnItem = { name: "" };
  if (type === "String") {
    // icon 经过 JSON.parse(JSON.stringify())之后，重新渲染时会报错，故做此处理
    const { icon } = btnsMap[btn as BtnName];
    btnObj = JSON.parse(JSON.stringify(btnsMap[btn as BtnName]));
    btnObj.icon = icon;
  } else if (type === "Object") {
    btnObj = merge({}, btnsMap[(btn as BtnItem).name as BtnName], btn as BtnItem);
  } else if (type === "Function") {
    btnObj = getBtnObj((btn as BtnFn)(row), undefined, row);
  }
  if (btnObj.popconfirm) {
    const { popconfirm, text } = btnObj;
    btnObj.popconfirm = getPopconfirmAttrs(popconfirm, text as string);
  }
  merge(btnObj, btnItem);
  // 当type为link时，需要删除ghost属性，不然会触发警告
  if (btnObj!.attrs?.type === "link") {
    delete btnObj!.attrs!.ghost;
  }
  return btnObj;
}
