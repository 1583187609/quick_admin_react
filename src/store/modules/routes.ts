import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../_utils";

export default createSlice({
  name: "route",
  initialState: {
    // isCreatedRoute: false, // 路由是否已创建完毕
    // routes: {}, //路由名称 - 路径映射
  },
  reducers: {
    // updateRoutesState: updateState,
  },
});
