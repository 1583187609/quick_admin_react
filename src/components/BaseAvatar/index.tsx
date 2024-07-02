import { CSSProperties, MouseEventHandler } from "react";
import avatar from "@/assets/images/default/avatar.png";
import { toCssVal } from "@/utils";
import { useRouter } from "@/hooks";
import s from "./index.module.less";

type Props = {
  className?: string;
  style?: CSSProperties;
  onClick?: Function;
  size?: number | string;
  src?: string;
  to?: string; //要跳转的页面地址
  round?: boolean;
  [key: string]: any;
};
export default ({ className = "", style, onClick, size, src, to, round = true, ...restProps }: Props) => {
  const router = useRouter();
  function handleClick(e: MouseEventHandler<HTMLImageElement>) {
    to ? router.push(to) : onClick?.(e);
  }
  return (
    <>
      <img
        className={`${s["base-avatar"]} ${round ? s.round : ""} ${className}`}
        style={{
          cursor: to || onClick ? "pointer" : "inherit",
          height: toCssVal(size),
          width: toCssVal(size),
          ...style,
        }}
        onClick={handleClick}
        src={src || avatar}
        alt="图片加载失败"
        {...restProps}
      />
    </>
  );
};
