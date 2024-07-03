/**
 * BaseCrud 增删改查组件 - 操作栏 - 按钮组
 */

import { Button, Dropdown } from "antd";
import BaseBtn, { BtnName, BtnItem } from "@/components/BaseBtn";
import { DownOutlined } from "@ant-design/icons";
import { CSSProperties, useState } from "react";
import { CommonObj } from "@/vite-env";
import s from "./index.module.less";
interface Props {
  className?: string;
  style?: CSSProperties;
  btns?: BtnItem[];
  maxNum?: number;
  onClick?: (name: BtnName) => void;
  [key: string]: any;
}

const defaultBaseBtnAttrs: CommonObj = {
  size: "small",
  type: "link",
};

export default ({ className = "", btns = [], maxNum = 3, onClick, ...restProps }: Props) => {
  const [show, setShow] = useState(false);
  const isOver = btns.length > maxNum;
  return (
    <div className={`${className} ${s["operate-btns"]}`} {...restProps}>
      {btns.slice(0, isOver ? maxNum - 1 : maxNum).map((btn, ind: number) => {
        return <BaseBtn attrs={defaultBaseBtnAttrs} className={s.btn} btn={btn} onClick={onClick} key={ind} />;
      })}
      {isOver && (
        <Dropdown
          open={show}
          onOpenChange={(visiable: boolean) => setShow(visiable)}
          trigger={["click"]}
          menu={{
            selectable: true,
            items: btns.slice(maxNum - 1).map((btn, ind: number) => {
              return {
                key: ind,
                label: (
                  <BaseBtn
                    attrs={defaultBaseBtnAttrs}
                    className={s.btn}
                    btn={btn}
                    onClick={(name: BtnName) => {
                      onClick?.(name);
                      setShow(false);
                    }}
                  />
                ),
              };
            }),
          }}
        >
          <Button icon={<DownOutlined />} {...Object.assign({}, defaultBaseBtnAttrs, { type: "text" })}>
            更多
          </Button>
        </Dropdown>
      )}
    </div>
  );
};
