import { CSSProperties, MouseEventHandler, useState } from "react";
import { Image } from "antd";
import { useRouter } from "@/components/_hooks";
import emptyImg from "@/assets/images/default/img.png";
import errImg from "@/assets/images/default/err.png";
import { StrNum } from "@/vite-env";
import { RouteProps } from "../_hooks/router";
import s from "./index.module.less";

type Props = {
  className?: string;
  style?: CSSProperties;
  onClick?: Function;
  size?: StrNum;
  width?: StrNum;
  height?: StrNum;
  src?: string;
  to?: string | RouteProps; //要跳转的页面地址
  round?: boolean;
  loadTips?: string;
  errTips?: string;
  errImgSrc?: string;
  preview?: boolean;
  [key: string]: any;
};

export default ({
  className = "",
  style,
  onClick,
  size = 120,
  width,
  height,
  src,
  to,
  round,
  errImgSrc,
  loadTips = "玩命加载中…",
  errTips = "加载失败",
  preview = !!src,
  fallback = errImg,
  ...restProps
}: Props) => {
  const router = useRouter();
  function handleClick(event: MouseEventHandler<HTMLImageElement>) {
    to ? router.push(to) : onClick?.(event);
  }
  return (
    <>
      <Image
        className={`${className} ${s["base-img"]} ${round ? s.round : ""} ${to ? s.to : ""} ${src ? "" : s.empty}`}
        src={src ?? emptyImg}
        width={size ?? width}
        height={size ?? height}
        style={{ cursor: to ? "pointer" : "inherit", ...style }}
        onClick={handleClick}
        alt="图片加载失败"
        fallback={fallback}
        preview={preview}
        // onError={err => {
        //   console.log(err, "err---------");
        // }}
        {...restProps}
      />
    </>
  );
};
