import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import App from "./App";
import zhCN from "antd/locale/zh_CN";
import store from "./store";
import BaseEmpty from "@/components/BaseEmpty";
import FullLoading from "@/components/FullLoading";
import { setupProdMockServer } from "./mockProdServer";

import "@/assets/styles/base.less";
import "@/assets/styles/global.less";
import "antd/dist/reset.css";

setupProdMockServer();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //注：react 18 dev环境严格模式下首屏 useEffect会执行两次，生产环境正常
  // <React.StrictMode>
  <Suspense fallback={<FullLoading mask={false}></FullLoading>}>
    <ConfigProvider
      // renderEmpty={() => <BaseEmpty></BaseEmpty>} //全局空状态处理
      locale={zhCN}
      //是为了全局解决Select，DatePicker，Cascader等组件选项框在Modal等弹出层中不跟随页面滚动的问题
      // 在 5.x版本中，不要使用，不然会导致预期之外的bug
      // getPopupContainer={(node: any) => {
      //   if (node) {
      //     return node; //ant   4.x
      //     // return node.parentNode;　//ant  3.x
      //   }
      //   return document.body;
      // }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </Suspense>
  // </React.StrictMode>
);
