import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.svg";
import { toCssVal } from "@/utils";
import s from "./index.module.less";
import { useRouter } from "../_hooks";

type Props = {
  className?: string;
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
  onClick,
  size,
  width,
  height,
  src = logo,
  to,
  round = false,
}: Props) => {
  const [style, setStyle] = useState({});
  const router = useRouter();
  function handleClick() {
    onClick && onClick();
    to && router.push(to);
  }
  useEffect(() => {
    setStyle({
      cursor: to ? "pointer" : "inherit",
      height: toCssVal(size || height),
      width: toCssVal(size || width),
    });
  }, []);
  return (
    <>
      <img
        onClick={handleClick}
        className={`${s["base-img"]} ${round ? s.round : ""} ${className}`}
        src={src}
        style={style}
        alt="图片加载失败"
      />
    </>
  );
};
