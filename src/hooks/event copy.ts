import { useRef, useEffect } from "react";

type EventType =
  | Event
  | KeyboardEvent
  | WheelEvent
  | TouchEvent
  | MouseEvent
  | DeviceMotionEvent
  | PointerEvent
  | FormDataEvent
  | FocusEvent
  | ProgressEvent;
type handleEvent = (event: any) => void;

export default function useEventListener<T>(eventName: string, handler: handleEvent, ele = window) {
  // 创建一个 ref 来存储处理程序
  const saveHandler = useRef<handleEvent | null>(null);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = ele && (ele.addEventListener || ele.attachEvent);
    if (!isSupported) return;

    const eventListener = (event: EventType) => {
      if (saveHandler.current) {
        saveHandler.current(event);
      }
    };

    // 添加事件监听
    if (ele.addEventListener) {
      ele.addEventListener(eventName, eventListener);
    } else if (ele.attachEvent) {
      ele.attachEvent(eventName, eventListener);
    }

    return () => {
      // 清除的时候移除事件监听
      if (ele.removeEventListener) {
        ele.removeEventListener(eventName, eventListener);
      } else if (ele.detachEvent) {
        ele.detachEvent(eventName, eventListener);
      }
    };
  }, [eventName, ele]);
}
