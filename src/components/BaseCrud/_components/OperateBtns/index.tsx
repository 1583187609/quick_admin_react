/**
 * BaseCrud 增删改查组件 - 操作栏 - 按钮组
 */

import { Button, Dropdown } from "antd";
import BaseBtn, { BtnName, BtnItem } from "@/components/BaseBtn";
import { DownOutlined } from "@ant-design/icons";
import { CSSProperties, useState } from "react";
import { CommonObj } from "@/vite-env";
import { defaultGroupBtnsMaxNum } from "@/components/_utils";
import { ButtonSize, ButtonType } from "antd/es/button";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  btns?: BtnItem[];
  maxNum?: number;
  onClick?: (name: BtnName) => void;
  [key: string]: any;
}

export interface DefaultBaseBtnAttrs {
  maxNum: number;
  size: ButtonSize;
  type: ButtonType;
}

export const defaultBaseBtnAttrs: DefaultBaseBtnAttrs = {
  maxNum: defaultGroupBtnsMaxNum,
  size: "small",
  type: "link",
};

export const btnGapMap: CommonObj = {
  small: {
    btnPadding: 12,
    btnMargin: 10,
    fontSize: 14,
  },
  middle: {
    btnPadding: 12,
    btnMargin: 10,
    fontSize: 14,
  },
  large: {
    btnPadding: 12,
    btnMargin: 10,
    fontSize: 14,
  },
};

export default ({
  className = "",
  btns = [],
  maxNum = defaultBaseBtnAttrs.maxNum,
  size = defaultBaseBtnAttrs.size,
  type = defaultBaseBtnAttrs.type,
  onClick,
  ...restProps
}: Props) => {
  const [show, setShow] = useState(false);
  const isOver = btns.length > maxNum;
  const btnAttrs = { size, type };
  return (
    <div className={`${className} ${s["operate-btns"]}`} {...restProps}>
      {btns.slice(0, isOver ? maxNum - 1 : maxNum).map((btn, ind: number) => {
        return <BaseBtn attrs={btnAttrs} className={s.btn} btn={btn} onClick={onClick} key={ind} />;
      })}
      {isOver && (
        <Dropdown
          open={show}
          onOpenChange={(visible: boolean) => setShow(visible)}
          trigger={["click"]}
          menu={{
            selectable: true,
            items: btns.slice(maxNum - 1).map((btn, ind: number) => {
              return {
                key: ind,
                label: (
                  <BaseBtn
                    attrs={btnAttrs}
                    className={s.btn}
                    btn={btn}
                    onClick={(name: BtnName) => {
                      setShow(false);
                      onClick?.(name);
                    }}
                  />
                ),
              };
            }),
          }}
        >
          <Button icon={<DownOutlined />} {...btnAttrs} type="text">
            更多
          </Button>
        </Dropdown>
      )}
    </div>
  );
};
