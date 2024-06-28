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

export default function useEventListener<T>(
  eventName: string,
  handler: handleEvent,
  element = window
) {
  // 创建一个 ref 来存储处理程序
  const saveHandler = useRef<handleEvent | null>(null);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported =
      element && (element.addEventListener || element.attachEvent);
    if (!isSupported) return;

    const eventListener = (event: EventType) => {
      if (saveHandler.current) {
        saveHandler.current(event);
      }
    };

    // 添加事件监听
    if (element.addEventListener) {
      element.addEventListener(eventName, eventListener);
    } else if (element.attachEvent) {
      element.attachEvent(eventName, eventListener);
    }

    return () => {
      // 清除的时候移除事件监听
      if (element.removeEventListener) {
        element.removeEventListener(eventName, eventListener);
      } else if (element.detachEvent) {
        element.detachEvent(eventName, eventListener);
      }
    };
  }, [eventName, element]);
}
