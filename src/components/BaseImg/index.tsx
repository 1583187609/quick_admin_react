import { CSSProperties, MouseEventHandler } from "react";
import logoImg from "@/assets/images/logo.svg";
import { toCssVal } from "@/utils";
import { useRouter } from "@/components/_hooks";
import s from "./index.module.less";

type Props = {
  className?: string;
  style?: CSSProperties;
  onClick?: Function;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  src?: string;
  to?: string; //要跳转的页面地址
  round?: boolean;
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
  round = false,
  ...restProps
}: Props) => {
  const router = useRouter();
  function handleClick(event: MouseEventHandler<HTMLImageElement>) {
    to ? router.push(to) : onClick?.(event);
  }
  return (
    <>
      <img
        onClick={handleClick}
        className={`${className} ${s["base-img"]} ${round ? s.round : ""}`}
        src={src ?? logoImg}
        style={{
          cursor: to ? "pointer" : "inherit",
          height: toCssVal(size ?? height),
          width: toCssVal(size ?? width),
          ...style,
        }}
        alt="图片加载失败"
        {...restProps}
      />
    </>
  );
};
