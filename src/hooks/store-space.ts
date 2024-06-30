import { actions, exposes } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { CommonObj } from "@/vite-env";

function getReducers(actionsMap: CommonObj, dispatch: any) {
  const map: CommonObj = {};
  for (const key in actionsMap) {
    if (!actionsMap[key]) return console.error(`不存在该storeKey：${key}`);
    map[key] = (payload: any) => dispatch(actionsMap[key](payload));
  }
  return map;
}

/**
 * 后续再处理没有传入name时的逻辑
 */
export default (name: string) => {
  if (!name) throw Error("请传入 store 唯一ID名称");
  const dispatch = useDispatch();
  return {
    ...useSelector((state) => state[name]),
    ...getReducers(actions[name], dispatch),
    ...getReducers(exposes[name], dispatch),
  };
};
