import { storage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "base",
  initialState: {
    isFold: storage.getItem("isFold", "session") ?? false,
  },
  reducers: {
    // 切换折叠状态
    toggleFold: (state, { payload }) => {
      state.isFold = payload ?? !state.isFold;
    },
  },
});
