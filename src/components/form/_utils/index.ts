import { BtnAttrs } from "@/components/form/_types";

export function getBtnProps(btn: string | BtnAttrs): BtnAttrs {
  if (typeof btn === "string") return { children: btn };
  return btn;
}
