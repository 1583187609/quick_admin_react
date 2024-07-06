import { SliceNames, sliceMap, type RootState, RootDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { CommonObj } from "@/vite-env";

const getReducers = (actionsMap: CommonObj, dispatch: RootDispatch) => {
  const map: CommonObj = {};
  for (const key in actionsMap) {
    if (!actionsMap[key]) return console.error(`不存在该storeKey：${key}`);
    map[key] = (payload: any) => dispatch(actionsMap[key](payload));
  }
  return map;
};

/**
 * 后续再处理没有传入name时的逻辑
 */
export default (name: SliceNames): CommonObj => {
  if (!name) throw Error("请传入 store 唯一ID名称");
  const slice = sliceMap[name];
  if (!slice) throw new Error(`未找到名称为${name}的store slice`);
  const dispatch = useDispatch();
  return {
    ...useSelector((state: RootState) => state[name]),
    ...getReducers(slice.actions, dispatch),
    ...getReducers(slice.expose, dispatch),
  };
};
