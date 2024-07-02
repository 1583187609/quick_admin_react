import { CommonObj } from "@/vite-env";
import { useNavigate } from "react-router-dom";

export interface RouteProps {
  name: string;
  query?: CommonObj;
}

export default () => {
  const navigate = useNavigate();
  return {
    go(num: number) {
      navigate(num);
    },
    push(path: string | RouteProps) {
      if (typeof path === "string") {
        navigate(path);
      } else {
        // navigate(path.name);
        console.error("暂未处理路由参数传入对象的跳转方式");
      }
    },
    replace() {},
  };
};
