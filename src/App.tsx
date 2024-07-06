import RouterView from "@/components/RouterView";
import BaseProvider from "@/components/provider/BaseProvider";
import PopupProvider from "@/components/provider/PopupProvider";

// import { theme } from "antd";
// const { useToken } = theme;

export default () => {
  // const { token } = useToken();
  // console.log(token, "token-----------------");
  return (
    <>
      <BaseProvider>
        <PopupProvider>
          <RouterView />
        </PopupProvider>
      </BaseProvider>
    </>
  );
};
