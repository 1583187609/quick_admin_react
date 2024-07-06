import { CSSProperties } from "react";
import * as Icons from "@ant-design/icons";
import BaseIcon, { IconNames } from "@/components/BaseIcon";
import { useCallback, useState } from "react";
import { Input, Tabs } from "antd";
import { CommonObj } from "@/vite-env";
import BaseCopy from "@/components/BaseCopy";
import { debounce } from "@/utils";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const icons: string[] = Object.keys(Icons);
const tabs: CommonObj = [
  { text: "所有图标", list: [] },
  { text: "线框风格", list: [] },
  { text: "实底风格", list: [] },
  { text: "双色风格", list: [] },
];
icons.forEach((icon, ind: number) => {
  if (icon.endsWith("Outlined")) {
    tabs[0].list.push(icon);
    tabs[1].list.push(icon);
  } else if (icon.endsWith("Filled")) {
    tabs[0].list.push(icon);
    tabs[2].list.push(icon);
  } else if (icon.endsWith("TwoTone")) {
    tabs[0].list.push(icon);
    tabs[3].list.push(icon);
  } else {
    // 可以通过使用 getTwoToneColor() 和 setTwoToneColor(colorString) 来全局设置图标主色。
  }
});

export default ({ className = "", onChange, children, ...restProps }: Props) => {
  const [activeKey, setActiveKey] = useState("0");
  const [value, setValue] = useState("");
  const [filterIcons, setFilterIcons] = useState<IconNames[]>(tabs[activeKey].list);
  function handleClickIcon(name: IconNames | "") {
    onChange?.(name);
    setValue(name);
  }
  const handleInputChange = useCallback((e: any) => {
    const icons = getFilterIcons(e.target.value);
    setFilterIcons(icons);
  }, []);
  function getFilterIcons(searchVal: string) {
    const names = tabs[activeKey].list;
    if (!searchVal) return names;
    return names.filter((it: IconNames) => {
      const val = searchVal.toLowerCase();
      return it.toLowerCase().includes(val);
    });
  }
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onTabClick={(key: string) => {
          setActiveKey(key);
          setFilterIcons(tabs[key].list);
        }}
        tabBarExtraContent={<Input onChange={debounce(handleInputChange, false, 500)} placeholder="请输入图标名称" allowClear />}
        items={tabs.map((tab: CommonObj, ind: number) => {
          return {
            label: <>{tab.text}</>,
            key: String(ind),
          };
        })}
        {...restProps}
      />
      <ul className={`${s.list} f-fs-fs-w all-hide-scroll`}>
        <li onClick={() => handleClickIcon("")} className={`${s.item} ${value === "" ? s.active : ""} f-c-c-c`}>
          <span className="f-c-c" style={{ height: "32px", width: "32px", fontSize: "22px" }}>
            无
          </span>
          <span className={`${s.text} line-1`}>none</span>
        </li>
        {filterIcons.map((name: any, ind: number) => {
          return (
            <li onClick={() => handleClickIcon(name)} className={`${s.item} ${value === name ? s.active : ""} f-c-c-c`} key={ind}>
              <BaseIcon size={34} name={name} />
              <BaseCopy className={`${s.text} line-1`} text={name} clickIconCopy />
            </li>
          );
        })}
      </ul>
    </>
  );
};
