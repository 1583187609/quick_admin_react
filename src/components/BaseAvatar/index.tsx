import { CSSProperties } from "react";
import avatarImg from "@/assets/images/default/avatar.png";
import avatarManImg from "@/assets/images/default/avatar-man.png";
import avatarWomanImg from "@/assets/images/default/avatar-woman.png";
import BaseImg from "@/components/BaseImg";
import { StrNum } from "@/vite-env";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  onClick?: (e: Event) => void;
  size?: StrNum;
  height?: StrNum;
  width?: StrNum;
  src?: string;
  to?: string; //要跳转的页面地址
  round?: boolean;
  gender?: 0 | 1; //性别
  preview?: boolean;
  [key: string]: any;
}
const avatarMap: Record<1 | 2, any> = {
  1: avatarManImg,
  2: avatarWomanImg,
};
export default ({ className = "", style, size = 40, height, width, src, gender, preview = !!src, ...restProps }: Props) => {
  return (
    <BaseImg
      className={`${className} ${s["base-avatar"]}`}
      size={size}
      height={size ?? height}
      width={size ?? width}
      src={src || avatarMap[gender as 1 | 2] || avatarImg}
      preview={preview}
      {...restProps}
    />
  );
};
