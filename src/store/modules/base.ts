import { storage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../_utils";

export default createSlice({
  name: "base",
  initialState: {},
  reducers: {
    updateBaseState: updateState,
  },
});
