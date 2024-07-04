import { CSSProperties, MouseEventHandler } from "react";
import { Image } from "antd";
import { useRouter } from "@/components/_hooks";
import emptyImg from "@/assets/images/default/img.png";
import { StrNum } from "@/vite-env";
import s from "./index.module.less";
import { RouteProps } from "../_hooks/router";

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
  size,
  width,
  height,
  src,
  to,
  round,
  errImgSrc,
  loadTips = "玩命加载中…",
  errTips = "加载失败",
  preview = !!src,
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
        style={{
          cursor: to ? "pointer" : "inherit",
          ...style,
        }}
        onClick={handleClick}
        alt="图片加载失败"
        preview={preview}
        {...restProps}
      />
    </>
  );
};
