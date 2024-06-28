import Router from "@/router";
import BaseProvider from "@/components/provider/BaseProvider";
import PopupProvider from "@/components/provider/PopupProvider";

export default () => {
  return (
    <>
      <BaseProvider>
        <PopupProvider>
          <Router />
        </PopupProvider>
      </BaseProvider>
    </>
  );
};
