/**
 * 文件说明-模板文件
 */

import { useContext, useEffect } from "react";
import { Popover, Divider } from "antd";
import { Button, Modal } from "antd";
import PageTags from "./_components/PageTags";
import { PopupContext } from "@/components/provider/PopupProvider";
import UserInfo from "./_components/UserInfo";
import SystemInfo from "./_components/SystemInfo";
import BaseAvatar from "@/components/BaseAvatar";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  ExclamationCircleFilled,
  UserOutlined,
  InfoCircleOutlined,
  RedoOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useRouter, useStoreSlice } from "@/hooks";
import PathBreadcrumb from "./_components/PathBreadcrumb";
import SystemSet from "./_components/SystemSet";
import BaseImg from "@/components/BaseImg";
import logoImg from "@/assets/images/logo.svg";
import { defaultHomePath } from "@/utils";
import SideMenu from "../SideMenu";
import s from "./index.module.less";

interface Props {
  className?: string;
  [key: string]: any;
}

const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "", ...restProps }: Props) => {
  const { isFold, toggleFold } = useStoreSlice("base");
  const { layout } = useStoreSlice("set");
  const { userInfo, handleLoginOut } = useStoreSlice("user");
  const router = useRouter();
  const location = useLocation();
  const { openPopup } = useContext(PopupContext);
  useEffect(() => {
    // openPopup({ title: "系统设置", maskClosable: true }, <SystemSet />, "drawer");
  }, []);
  //打开退出登录对话框
  function openLogoutDialog() {
    Modal.confirm({
      title: "温馨提示",
      icon: <ExclamationCircleFilled />,
      content: "确定退出登录吗？",
      onOk: () =>
        handleLoginOut({
          params: { phone: "18483221518" },
          other: { router, location },
        }),
      onCancel() {},
    });
  }
  return (
    <div className={`${className} ${s.header} ${layout.type === "vertical" ? s.white : ""} layout-the-head`} {...restProps}>
      <div className={`${layout.type === "vertical" ? s["border-bottom"] : ""} f-sb-c pr-h`}>
        {layout.type === "horizontal" ? (
          <div onClick={() => router.push(defaultHomePath)} className={`${s.title} f-0 f-c-c`}>
            <BaseImg size={30} src={logoImg} />
            <span className="line-2 ml-h">{isFold ? VITE_APP_NAME?.slice(0, 1) : VITE_APP_NAME}</span>
          </div>
        ) : null}
        <div className={`${s["toggle-btn"]} f-0`} onClick={() => toggleFold()}>
          {isFold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        {layout.type === "horizontal" ? <SideMenu className="f-1" mode="horizontal" /> : <PathBreadcrumb className="f-1" />}

        <div className="f-0 ml-8 mr-8 f-fe-s">
          <div className={`${s.info} f-sa-fe-c`}>
            <div className={`${s.name}`}>{userInfo?._title ?? ""}</div>
            <div className={`${s.type}`}>{userInfo?.type_text ?? ""}</div>
          </div>
          <Popover
            placement="bottom"
            trigger="hover"
            content={
              <>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() => openPopup("个人信息", <UserInfo id={1} />, "drawer")}
                  icon={<UserOutlined />}
                  type="link"
                >
                  个人信息
                </Button>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() => openPopup("刷新系统", "【刷新系统】暂未开发", "drawer")}
                  icon={<RedoOutlined />}
                  type="link"
                >
                  刷新系统
                </Button>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() => openPopup({ title: "系统设置", maskClosable: true }, <SystemSet />, "drawer")}
                  icon={<SettingOutlined />}
                  type="link"
                >
                  系统设置
                </Button>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() => openPopup({ title: "关于系统", maskClosable: true }, <SystemInfo />, "drawer")}
                  icon={<InfoCircleOutlined />}
                  type="link"
                >
                  关于系统
                </Button>
                <Divider className="m-0" />
                <Button className={`${s["pop-btn"]}`} onClick={openLogoutDialog} icon={<PoweroffOutlined />} type="link" danger>
                  退出登录
                </Button>
              </>
            }
          >
            <BaseAvatar className="f-0 ml-h" size={40} round />
          </Popover>
        </div>
      </div>
      {layout.type === "horizontal" && (
        <div className={`${s["breadcrumb-box"]} ${s.white} f-fs-c`}>
          <PathBreadcrumb />
        </div>
      )}
      <PageTags
      // updatedTitle
      // updatedTitle={updatedTitle}
      //  reload={reload}
      />
    </div>
  );
};
