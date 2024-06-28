import * as Icons from "@ant-design/icons";
import BaseIcon from "@/components/BaseIcon";
import { useState } from "react";
import { Tabs } from "antd";
import BaseModal from "@/components/BaseModal";
import s from "./index.module.less";

interface Props {
  id?: string;
  value?: string;
  onChange?: (name: string) => void;
}
const icons: string[] = Object.keys(Icons);
const tabs: CommonObj = [
  { text: "线框风格", list: [] },
  { text: "实底风格", list: [] },
  { text: "双色风格", list: [] },
];
icons.forEach((icon) => {
  if (icon.endsWith("Outlined")) {
    tabs[0].list.push(icon);
  } else if (icon.endsWith("Filled")) {
    tabs[1].list.push(icon);
  } else if (icon.endsWith("TwoTone")) {
    tabs[2].list.push(icon);
  }
});
export default ({ id, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [list, setList] = useState(tabs[activeKey].list);
  function handleClickIcon(name: string) {
    onChange!(name);
    setOpen(false);
  }
  function handleClickTabItem(key: string) {
    setActiveKey(key);
    setList(tabs[key].list);
  }
  return (
    <>
      <div onClick={() => setOpen(true)} className={`${s["icon-box"]} f-fs-c`}>
        {value ? (
          <>
            <BaseIcon size="28" name={value} />
            <span className="ml-h">{value}</span>
          </>
        ) : (
          <span className={`${s.placeholder}`}>请点击选择菜单图标</span>
        )}
      </div>
      <BaseModal
        title="选择图标"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Tabs
          activeKey={activeKey}
          onTabClick={handleClickTabItem}
          items={tabs.map((tab: CommonObj, ind: number) => {
            return {
              label: <>{tab.text}</>,
              key: String(ind),
            };
          })}
        />
        <ul className={`${s.list} f-fs-fs-w all-hide-scroll`}>
          <li
            onClick={() => handleClickIcon("")}
            className={`${s.item} ${value === "" ? s.active : ""} f-c-c-c`}
          >
            <span
              className="f-c-c"
              style={{ height: "32px", width: "32px", fontSize: "22px" }}
            >
              无
            </span>
            <span className={`${s.text} line-1`}>none</span>
          </li>
          {list.map((name: any, ind: number) => {
            return (
              <li
                onClick={() => handleClickIcon(name)}
                className={`${s.item} ${
                  value === name ? s.active : ""
                } f-c-c-c`}
                key={ind}
              >
                <BaseIcon size={34} name={name} />
                <span className={`${s.text} line-1`}>{name}</span>
              </li>
            );
          })}
        </ul>
      </BaseModal>
    </>
  );
};
