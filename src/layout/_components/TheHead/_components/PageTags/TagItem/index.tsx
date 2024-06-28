import { Divider, Space, Tag, Dropdown, Button, message } from "antd";
import { CSSProperties, useState } from "react";
import type { MenuProps } from "antd";
import getMenus, { CloseMenuType } from "./menus";
import { MenusDisabledCase } from "..";
interface Props {
  className?: string;
  style?: CSSProperties;
  children?: any;
  active?: boolean;
  closable?: boolean;
  icon?: any;
  onClick?: () => void;
  onClose?: (type: CloseMenuType) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabledCase: MenusDisabledCase;
}
export default ({
  className = "",
  style,
  children,
  active = false,
  closable = true,
  icon,
  onClose,
  onClick,
  open = false,
  onOpenChange,
  disabledCase,
}: Props) => {
  function handleClose(type: CloseMenuType) {
    onClose?.(type);
  }
  return (
    <Dropdown
      // arrow
      // arrow={{ pointAtCenter: true }}
      menu={{ items: getMenus({ handleClose, disabledCase }) }}
      trigger={["contextMenu"]}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Tag
        className={`${className}`}
        style={style}
        // style={Object.assign(
        //   {
        //     maxWidth: "8em",
        //     overflow: "hidden",
        //     textOverflow: "ellipsis",
        //     whiteSpace: "nowrap",
        //   },
        //   style
        // )}
        color={active ? "#1677ff" : "blue"}
        closable={closable}
        icon={icon}
        onClick={onClick}
        onClose={() => handleClose("closeSelf")}
      >
        {children}
      </Tag>
    </Dropdown>
  );
};
