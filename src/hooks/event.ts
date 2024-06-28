import { useEffect } from "react";

export default (
  name: string,
  fn: (e?: Event) => void,
  effect: any[],
  isImmediate = false
) => {
  useEffect(() => {
    isImmediate && fn();
    window.addEventListener(name, fn);
    return () => {
      window.removeEventListener(name, fn);
    };
  }, effect);
};
