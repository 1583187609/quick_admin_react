import Router from "@/router";
import BaseDrawer, { PlacementType } from "@/components/BaseDrawer";
import BaseModal from "@/components/BaseModal";
import { useState, createContext } from "react";
import { showMessage, sortObjArrByKey } from "@/utils";

type BaseRenderData = any;
interface Props {
  children: any;
}
export type PopupType = "drawer" | "modal";
export type OpenPopupType =
  | ModalPopup
  | DrawerPopup
  | PopupType
  | ModalId
  | DrawerId; //打开的弹窗类型
export interface DrawerHeadAttrs {
  title?: string;
  [key: string]: any;
}
export interface ModalHeadAttrs {
  title?: string;
  [key: string]: any;
}
export interface DrawerPopup {
  id: number;
  name: "drawer";
  open: boolean;
  attrs: {
    title: string;
    placement?: PlacementType;
    [key: string]: any;
  };
  body: BaseRenderData;
  createAt: number; //创建时间戳
}
export interface ModalPopup {
  id: number;
  name: "modal";
  open: boolean;
  attrs: {
    title?: string;
    [key: string]: any;
  };
  body: BaseRenderData;
  foot?: FootRenderData; //底部按钮或自定义节点
  createAt: number; //创建时间戳
}
export type ClosePopupType = OpenPopupType | number | "all"; //关闭的弹窗类型：'all' 关闭所有modal、drawer；number：关闭顶层的 n 个弹窗
export type CloseModalType = ModalPopup | ModalId | "all";
export type CloseDrawerType = DrawerPopup | DrawerId | "all";
export type DrawerHeadTypes = string | DrawerHeadAttrs;
export type ModalHeadTypes = string | ModalHeadAttrs;
export type ModalId = `modal-${number}`; //id必须大于等于0，示例："modal-1"
export type DrawerId = `drawer-${number}`; //id必须大于等于0，示例："drawer-1"
export type FootRenderData = null | boolean | BaseRenderData;

export interface PopupContextProps {
  openDrawer: (head: DrawerHeadTypes | DrawerId, body?: BaseRenderData) => void;
  closeDrawer: (popup: CloseDrawerType, destroyed?: boolean) => void;
  openModal: (
    head: ModalHeadTypes | ModalId,
    body?: BaseRenderData,
    foot?: FootRenderData
  ) => void;
  closeModal: (popup: CloseModalType, destroyed?: boolean) => void;
  openPopup: (
    head: DrawerHeadTypes | ModalHeadTypes | ModalId | DrawerId,
    body: BaseRenderData,
    type?: PopupType | FootRenderData,
    foot?: FootRenderData
  ) => void;
  closePopup: (type?: ClosePopupType, destroyed?: boolean) => void;
  getPopups: (type?: PopupType) => void;
}

export const PopupContext = createContext({} as PopupContextProps);

const closeDelay = 500; //延迟关闭弹出层的时间（让关闭动画过渡完，再销毁组件，单位毫秒）
let modalTimer: SetTimeout = null;
let drawerTimer: SetTimeout = null;

export default ({ children }: Props) => {
  const [drawers, setDrawers] = useState<DrawerPopup[]>([]);
  const [modals, setModals] = useState<ModalPopup[]>([]);

  /**
   * 构造生成弹出层head的新的attrs对象
   */
  function getHeadAttrs(head: any, popupId: DrawerId | ModalId): any {
    const type = popupId.split("-")[0] as PopupType;
    const closeKeyMap: CommonObj = {
      drawer: "onClose",
      modal: "onCancel",
    };
    if (typeof head === "object")
      return Object.assign(
        { [closeKeyMap[type]]: () => closePopup(popupId) },
        popupId.startsWith("modal")
          ? { onOk: () => closePopup(popupId) }
          : null,
        head
      );
    return {
      title: head,
      [closeKeyMap[type]]: () => closePopup(popupId),
    };
  }

  /**
   * 抽屉 drawer
   */
  function openDrawer(
    head: DrawerHeadTypes | DrawerId,
    body: BaseRenderData = "默认 drawer body 内容"
  ) {
    if (drawerTimer) return showMessage("您的操作太频繁了", "warning");
    if (typeof head === "string" && head.startsWith("drawer-")) {
      const id = Number(head.split("-")[1]);
      const target = drawers.find((it) => it.id === id);
      if (target) return (target.open = true);
      return showMessage(`不存在抽屉【drawer-${id}】`, "error");
    }
    const id = (drawers.at(-1)?.id ?? -1) + 1;
    drawers.push({
      id,
      name: "drawer",
      open: true,
      attrs: getHeadAttrs(head, `drawer-${id}`),
      body,
      createAt: Date.now(),
    });
    setDrawers(drawers.slice());
  }

  function closeDrawer(
    popup: CloseDrawerType = `drawer-${drawers.at(-1)?.id ?? 0}`,
    destroyed = true
  ) {
    if (popup === "all") {
      drawers.length = 0;
    } else {
      const ind = drawers.findIndex((item) => {
        if (typeof popup !== "string") return item === popup;
        return item.id === Number(popup.split("-")[1]);
      });
      if (ind === -1) return;
      drawers[ind].open = false;
      setDrawers(drawers.slice());
      if (!destroyed) return;
      drawerTimer = setTimeout(() => {
        drawers.splice(ind, 1);
        setDrawers(drawers.slice());
        drawerTimer = null;
      }, closeDelay);
    }
  }

  /**
   * 对话框modal
   */
  function openModal(
    head: ModalHeadTypes | ModalId,
    body: BaseRenderData = "默认 modal body 内容",
    foot: FootRenderData = null
  ) {
    if (modalTimer) return showMessage("您的操作太频繁了", "warning");
    if (typeof head === "string" && head.startsWith("modal-")) {
      const id = Number(head.split("-")[1]);
      const target = modals.find((it) => it.id === id);
      if (target) return (target.open = true);
      return showMessage(`不存在模态框【modal-${id}】`, "error");
    }
    const id = (modals.at(-1)?.id ?? -1) + 1;
    modals.push({
      id,
      name: "modal",
      open: true,
      attrs: getHeadAttrs(head, `modal-${id}`),
      body,
      foot,
      createAt: Date.now(),
    });
    setModals(modals.slice());
  }

  function closeModal(
    popup: CloseModalType = `modal-${modals.at(-1)?.id ?? 0}`,
    destroyed = true
  ) {
    if (popup === "all") {
      modals.length = 0;
    } else {
      const ind = modals.findIndex((item: ModalPopup) => {
        if (typeof popup !== "string") return item === popup;
        return item.id === Number(popup.split("-")[1]);
      });
      if (ind === -1) return;
      modals[ind].open = false;
      setModals(modals.slice());
      if (!destroyed) return;
      modalTimer = setTimeout(() => {
        modals.splice(ind, 1);
        setModals(modals.slice());
        modalTimer = null;
      }, closeDelay);
    }
  }

  /**
   * 弹出层 drawer, modal
   */
  function openPopup(
    head: DrawerHeadTypes | ModalHeadTypes | ModalId | DrawerId,
    body?: BaseRenderData,
    type: OpenPopupType | FootRenderData = "modal",
    foot: FootRenderData = null
  ) {
    if (typeof head === "string") {
      const isModId = head.startsWith("modal-");
      if (isModId || head.startsWith("drawer-"))
        return isModId ? openModal(head) : openDrawer(head);
    }
    if (type === "modal") {
      openModal(head, body, foot);
    } else if (type === "drawer") {
      openDrawer(head, body);
    } else {
      // 如果不是弹窗类型，则打开model，且type的值作为modal的footer渲染
      openModal(head, body, type);
    }
  }
  /**
   * 获取顶层弹窗的id数组
   */
  function getTopPopupIds(num = 1): (DrawerId | ModalId)[] {
    if (num <= 0) throw new Error("请传入一个正整数");
    const popups = sortObjArrByKey([...modals, ...drawers], "createAt", "desc");
    const topPops = popups.slice(0, num);
    return topPops?.map((it) => `${it.name}-${it.id}` as DrawerId | ModalId);
  }

  function closePopup(popup: ClosePopupType = 1, destroyed = true) {
    if (popup === "all") {
      closeModal(popup);
      closeDrawer(popup);
    } else if (typeof popup === "string") {
      const isModal = popup.startsWith("modal");
      const isId = popup.includes("-");
      if (isModal) {
        const isAll = popup === "modal";
        const m = isId ? (popup as CloseModalType) : isAll ? "all" : undefined;
        closeModal(m, destroyed);
      } else {
        const isAll = popup === "drawer";
        const d = isId ? (popup as CloseDrawerType) : isAll ? "all" : undefined;
        closeDrawer(d, destroyed);
      }
    } else if (typeof popup === "number") {
      const ids = getTopPopupIds(popup);
      ids.forEach((id: DrawerId | ModalId) => closePopup(id));
    } else {
      const isModal = popup.name === "modal";
      isModal ? closeModal(popup) : closeDrawer(popup);
    }
  }

  /**
   * 获取弹出层栈
   * @param type 弹出层类型，可选值：modal、drawer
   * @returns
   */
  function getPopups(type?: PopupType) {
    if (type === "modal") return JSON.parse(JSON.stringify(modals));
    if (type === "drawer") return JSON.parse(JSON.stringify(drawers));
    return JSON.parse(JSON.stringify({ modals, drawers }));
  }

  return (
    <>
      <PopupContext.Provider
        value={{
          openDrawer,
          closeDrawer,
          openModal,
          closeModal,
          openPopup,
          closePopup,
          getPopups,
        }}
      >
        {children}
        {/* 全局抽屉 */}
        {drawers.map((drawer, ind) => {
          const { open, attrs, body } = drawer;
          return (
            <BaseDrawer open={open} {...attrs} key={ind}>
              {body}
            </BaseDrawer>
          );
        })}
        {/* 全局Modal对话框 */}
        {modals.map((modal, ind) => {
          const { open, body, foot, attrs } = modal;
          return (
            <BaseModal
              open={open}
              footer={foot === true ? undefined : foot}
              {...attrs}
              key={ind}
            >
              {body}
            </BaseModal>
          );
        })}
      </PopupContext.Provider>
    </>
  );
};
