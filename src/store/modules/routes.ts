import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../_utils";

export default createSlice({
  name: "route",
  initialState: {
    // routes: {}, //路由名称 - 路径映射
    isCreatedRoute: false, // 路由是否已创建完毕
  },
  reducers: {
    updateRoutesState: updateState,
  },
});
