/**
 * 文件说明-模板文件
 */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { message, Popover, Divider } from "antd";
import { Menu, Button, Modal } from "antd";
import { getMenuNavs } from "@/store/modules/menu";
import { ResponseMenuItem } from "../TheMenu";
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
import { defaultHomePath, getUserInfo } from "@/utils";
import { useDispatch } from "react-redux";
import { useRouter, useStoreSpace } from "@/hooks";
import PathBreadcrumb from "./_components/PathBreadcrumb";
import { CommonObj } from "@/vite-env";
import s from "./index.module.less";

interface Props {
  className?: string;
  // onMenuItem: (ind: number, info: CommonObj) => void;
  // reload: (cb?: () => void) => void;
  // rootInd: number;
  // setRootInd: (ind: number) => void;
}

const { VITE_APP_NAME } = import.meta.env;

export default ({ className = "" }: Props) => {
  const { isFold, toggleFold } = useStoreSpace("base");
  const { userInfo, handleLoginOut } = useStoreSpace("user");
  const { activeIndex, allMenus } = useStoreSpace("menu");
  const router = useRouter();
  const location = useLocation();
  const { pathname } = location;
  const { openPopup } = useContext(PopupContext);
  const [updatedTitle, setUpdatedTitle] = useState(false); //是否更新了document.title
  const rootKey = useMemo(() => findRootKey(allMenus, pathname, activeIndex), [allMenus, pathname, activeIndex]);
  // 获取根key
  function findRootKey(groups: ResponseMenuItem[], pathname: string, rootInd: number): string {
    setUpdatedTitle(false);
    if (groups[rootInd]?.children?.length) {
      function isFind(children: ResponseMenuItem[]): boolean {
        return !!children.find((sItem, sInd) => {
          const { children = [], path, label } = sItem;
          if (path === pathname) {
            document.title = label;
            setUpdatedTitle(true);
          }
          return path === pathname || isFind(children);
        });
      }
      const target = groups.find((gItem, gInd) => {
        const { children = [] } = gItem;
        const find = isFind(children);
        // if (find) {
        //   setRootInd(gInd); //会触发警告，暂时不知道什么原因引起的
        // }
        return find;
      });
      return target?.path || "";
    } else {
      const { path = "", label = VITE_APP_NAME } = groups?.[rootInd] || {};
      document.title = label;
      setUpdatedTitle(path !== ""); //处理初始化刷新页面时，会更新页签中的值为pkg.name
      return path;
    }
  }
  //处理点击菜单选项
  // function handleClickMenuItem<MenuProps>(info: CommonObj) {
  //   const { key } = info;
  //   const ind: number = newGroups?.findIndex((it) => it.path === key) as number;
  //   // setRootInd(ind);
  //   onMenuItem(ind, info);
  // }
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
    <div className={`${className} ${s.header} layout-the-head`}>
      <div className="f-sb-c">
        <div className={`${s["toggle-btn"]} f-0`} onClick={() => toggleFold()}>
          {isFold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <PathBreadcrumb className="f-1" />
        {/* <Menu
          className="f-1"
          onClick={handleClickMenuItem}
          selectedKeys={[rootKey]}
          mode="horizontal"
          theme="dark"
          items={getMenuNavs(newGroups)}
        /> */}
        <div className="f-0 ml-8 mr-8 f-fe-s">
          <div className={`${s.nickname} f-sa-fe-c`}>
            <div>{userInfo?._title ?? ""}</div>
            <div>{userInfo?.type_text ?? ""}</div>
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
                  onClick={() => openPopup("系统设置", "【系统设置】暂未开发", "drawer")}
                  icon={<SettingOutlined />}
                  type="link"
                >
                  系统设置
                </Button>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() => openPopup("关于系统", <SystemInfo />, "drawer")}
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
            <BaseAvatar className="f-0 ml-8" size={40} />
          </Popover>
        </div>
      </div>
      <PageTags
        updatedTitle={updatedTitle}
        //  reload={reload}
      />
    </div>
  );
};
