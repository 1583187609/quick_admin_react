import { CSSProperties } from "react";
import avatar from "@/assets/images/default/avatar.png";
import { toCssVal } from "@/utils";
import { merge } from "lodash";
import s from "./index.module.less";
import { useRouter } from "@/hooks";

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
export default ({
  className = "",
  style,
  onClick,
  size,
  src,
  to,
  round = true,
  ...restProps
}: Props) => {
  const router = useRouter();
  const newStyle = merge(
    {
      cursor: to || onClick ? "pointer" : "inherit",
      height: toCssVal(size),
      width: toCssVal(size),
    },
    style
  );
  function handleClick() {
    onClick && onClick();
    to && router.push(to);
  }
  return (
    <>
      <img
        onClick={handleClick}
        style={newStyle}
        className={`${s["base-avatar"]} ${round ? s.round : ""} ${className}`}
        src={src || avatar}
        alt="图片加载失败"
        {...restProps}
      />
    </>
  );
};
