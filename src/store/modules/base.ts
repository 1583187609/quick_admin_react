import { storage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "base",
  initialState: {
    isFold: storage.getItem("isFold", "session") ?? true,
  },
  reducers: {
    // 切换折叠状态
    toggleFold: (state, { payload }) => {
      // const { isFold } = payload;
      state.isFold = !state.isFold;
    },
  },
});
