/**
 * 文件说明-模板文件
 */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { message, Popover, Divider } from "antd";
import { Menu, Button, Modal } from "antd";
import { handleNavs } from "../../_help";
import { MenusItem } from "../TheMenu";
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
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { handleLoginOut } from "@/store/modules/user";
import { getUserInfo } from "@/utils";
import s from "./index.module.less";
import { useDispatch } from "react-redux";
import { useRouter } from "@/hooks";

interface Props {
  className?: string;
  groups?: MenusItem[];
  collapsed?: boolean;
  setCollapsed: (isFold: boolean) => void;
  onMenuItem: (ind: number, info: CommonObj) => void;
  reload: (cb?: () => void) => void;
  rootInd: number;
  setRootInd: (ind: number) => void;
}
const { VITE_APP_NAME } = import.meta.env;
export default ({
  className = "",
  collapsed = false,
  setCollapsed,
  groups = [],
  onMenuItem,
  reload,
  rootInd,
  setRootInd,
}: Props) => {
  const router = useRouter();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const { openPopup } = useContext(PopupContext);
  const location = useLocation();
  const { pathname } = location;
  const [updatedTitle, setUpdatedTitle] = useState(false); //是否更新了document.title
  const newGroups: MenusItem[] =
    groups?.map((item: MenusItem, ind: number) => {
      const { id, label, icon, path } = item;
      return { id, label, icon, path };
    }) || [];
  const rootKey = useMemo(
    () => findRootKey(groups, pathname, rootInd),
    [groups, pathname, rootInd]
  );
  //获取根key
  function findRootKey(
    groups: MenusItem[],
    pathname: string,
    rootInd: number
  ): string {
    setUpdatedTitle(false);
    if (groups[rootInd]?.children?.length) {
      function isFind(children: MenusItem[]): boolean {
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
        if (find) {
          setRootInd(gInd); //会触发警告，暂时不知道什么原因引起的
        }
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
  function handleClickMenuItem<MenuProps>(info: CommonObj) {
    const { key } = info;
    const ind: number = newGroups?.findIndex((it) => it.path === key) as number;
    setRootInd(ind);
    onMenuItem(ind, info);
  }
  //退出登录
  function handlePostLogout() {
    dispatch(handleLoginOut({ id: 1 }) as any).then((res: CommonObj) => {
      message.success("退出成功！");
      router.push("/login");
    });
  }
  //打开退出登录对话框
  function openLogoutDialog() {
    Modal.confirm({
      title: "温馨提示",
      icon: <ExclamationCircleFilled />,
      content: "确定退出登录吗？",
      onOk: handlePostLogout,
      onCancel() {},
    });
  }
  return (
    <div className={`${className} ${s.header} layout-the-head`}>
      <div className="f-sb-c">
        <div
          className={`${s["toggle-btn"]} f-0`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Menu
          className="f-1"
          onClick={handleClickMenuItem}
          selectedKeys={[rootKey]}
          mode="horizontal"
          theme="dark"
          items={handleNavs(newGroups)}
        />
        <div className="f-0 ml-8 mr-8 f-fe-s">
          <div className={`${s.nickname} f-sa-fe-c`}>
            <div>{userInfo._title}</div>
            <div>{userInfo.type_text}</div>
          </div>
          <Popover
            placement="bottom"
            trigger="hover"
            content={
              <>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() =>
                    openPopup("个信息", <UserInfo id={1} />, "drawer")
                  }
                  icon={<UserOutlined />}
                  type="link"
                >
                  个人信息
                </Button>
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={() =>
                    openPopup("关于系统", <SystemInfo />, "drawer")
                  }
                  icon={<InfoCircleOutlined />}
                  type="link"
                >
                  关于系统
                </Button>
                <Divider className="m-0" />
                <Button
                  className={`${s["pop-btn"]}`}
                  onClick={openLogoutDialog}
                  icon={<PoweroffOutlined />}
                  type="link"
                  danger
                >
                  退出登录
                </Button>
              </>
            }
          >
            <BaseAvatar className="f-0 ml-8" size={40} />
          </Popover>
        </div>
      </div>
      <PageTags updatedTitle={updatedTitle} reload={reload} />
    </div>
  );
};
