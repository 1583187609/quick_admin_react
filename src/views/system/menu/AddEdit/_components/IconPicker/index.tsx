import BaseIcon, { IconNames } from "@/components/BaseIcon";
import { useContext } from "react";
import Model from "./Model";
import { PopupContext } from "@/components/provider/PopupProvider";
import s from "./index.module.less";

interface Props {
  id?: string;
  value?: IconNames | "";
  onChange?: (name: IconNames | "") => void;
}
export default ({ value = "", onChange }: Props) => {
  const { openPopup, closePopup } = useContext(PopupContext);
  function handleChange(name: IconNames) {
    onChange?.(name);
    closePopup();
  }
  return (
    <div onClick={() => openPopup("选择图标", <Model onChange={handleChange} />)} className={`${s["icon-box"]} f-fs-c`}>
      {value ? (
        <>
          <BaseIcon size="28" name={value} />
          <span className="ml-h">{value}</span>
        </>
      ) : (
        <span className={`${s.placeholder}`}>请点击选择菜单图标</span>
      )}
    </div>
  );
};
