import { Divider, Button } from "antd";
import type { MenuProps } from "antd";
import { MenusDisabledCase } from "..";
import {
  CloseOutlined,
  ColumnWidthOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  FileDoneOutlined,
  CopyOutlined,
  SnippetsOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { CommonObj } from "@/vite-env";

export type CloseMenuType =
  | "closeSelf" //点击标签右侧的关闭图标
  | "closeCurrent" //点击右键菜单的关闭按钮
  | "closeOther"
  | "closeAll"
  | "closeToRight"
  | "closeToLeft"
  | "reload"
  | "closeSaved"
  | "copyPath"
  | "copyWholePath";
interface Props {
  handleClose: (type: CloseMenuType) => void;
  disabledCase: MenusDisabledCase;
}
const btnProps: CommonObj = {
  type: "text",
  size: "small",
  style: { width: "100%", textAlign: "left" },
};
export default ({ handleClose, disabledCase }: Props) => {
  return [
    {
      key: "closeCurrent",
      disabled: disabledCase.closeCurrent,
      label: (
        <Button
          icon={<CloseOutlined />}
          onClick={() => handleClose("closeCurrent")}
          disabled={disabledCase.closeCurrent}
          {...btnProps}
        >
          关闭
        </Button>
      ),
    },
    {
      key: "closeOther",
      disabled: disabledCase.closeOther,
      label: (
        <Button
          icon={<ColumnWidthOutlined />}
          onClick={() => handleClose("closeOther")}
          disabled={disabledCase.closeOther}
          {...btnProps}
        >
          关闭其他
        </Button>
      ),
    },
    {
      key: "closeAll",
      disabled: disabledCase.closeAll,
      label: (
        <Button
          icon={<CloseCircleOutlined />}
          onClick={() => handleClose("closeAll")}
          disabled={disabledCase.closeAll}
          {...btnProps}
        >
          全部关闭
        </Button>
      ),
    },
    {
      key: "d-0",
      label: <Divider {...btnProps} />,
    },
    {
      key: "closeToRight",
      disabled: disabledCase.closeToRight,
      label: (
        <Button
          icon={<ArrowRightOutlined />}
          onClick={() => handleClose("closeToRight")}
          disabled={disabledCase.closeToRight}
          {...btnProps}
        >
          关闭到右侧
        </Button>
      ),
    },
    {
      key: "closeToLeft",
      disabled: disabledCase.closeToLeft,
      label: (
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => handleClose("closeToLeft")}
          disabled={disabledCase.closeToLeft}
          {...btnProps}
        >
          关闭到左侧
        </Button>
      ),
    },
    {
      key: "closeSaved",
      disabled: disabledCase.closeSaved,
      label: (
        <Button
          icon={<FileDoneOutlined />}
          onClick={() => handleClose("closeSaved")}
          disabled={disabledCase.closeSaved}
          {...btnProps}
        >
          关闭已保存
        </Button>
      ),
    },
    {
      key: "d-1",
      label: <Divider {...btnProps} />,
    },
    {
      key: "copyPath",
      disabled: disabledCase.copyPath,
      label: (
        <Button icon={<CopyOutlined />} onClick={() => handleClose("copyPath")} disabled={disabledCase.copyPath} {...btnProps}>
          复制简单路径
        </Button>
      ),
    },
    {
      key: "copyWholePath",
      disabled: disabledCase.copyWholePath,
      label: (
        <Button
          icon={<SnippetsOutlined />}
          onClick={() => handleClose("copyWholePath")}
          disabled={disabledCase.copyWholePath}
          {...btnProps}
        >
          复制完整路径
        </Button>
      ),
    },
    {
      key: "d-2",
      label: <Divider {...btnProps} />,
    },
    {
      key: "reload",
      disabled: disabledCase.reload,
      label: (
        <Button icon={<ReloadOutlined />} onClick={() => handleClose("reload")} disabled={disabledCase.reload} {...btnProps}>
          刷新
        </Button>
      ),
    },
  ] as MenuProps["items"];
};
