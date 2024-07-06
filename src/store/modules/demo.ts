/**
 * 这个 sliceStore 仅用作测试，和语法示例，并未承载任何业务功能
 * redux-toolkit中的createAsyncThunk使用介绍
 * @link https://blog.csdn.net/weixin_57017198/article/details/133796912
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 通过 createAsyncThunk 创建一个异步的 Action 并导出
export const getAsyncCountAction = createAsyncThunk(
  /**
   * 一个字符串类型的 action 名称，用于在 Redux 中识别该 action。
   * 该名称通常包含操作名称和状态
   */
  "getBannerAction",
  /**
   * 异步操作函数，该函数接收两个参数
   * 第一个参数是 thunk 的 payload，也就是调用的时候传过来的
   * 第二个参数是thunk对象
   * dispatch
   * 用于 dispatch 其他 action 的函数
   * getState
   * 用于获取当前 Redux store 中的 state 的函数
   * extra
   * 性是用于传递额外参数的对象
   * @returns 返回的数据会被传入到 extraReducers 中函数的 action.payload 参数中
   */
  async (payload, { dispatch, getState, extra }) => {
    // 执行异步操作
    // const res = await axios.get('http://123.207.32.32:8000/home/multidata')
    // // 返回的数据会被传入到 extraReducers 中函数的 action.payload 参数中
    // return res.data.data.banner.list.length
  },
  {} // 可选的配置项
);

// 创建 slice。每一个 slice 里都包含了 reducer 和 actions，可以实现模块化的封装
export default createSlice({
  //标记 slice，作为 action.type 的前缀
  name: "demo",
  //state 的初始值
  initialState: {
    num: 1,
  },
  // 相当于之前的 reducer 函数
  reducers: {
    /**
     * 增加
     * @produce 一个函数就相当于之前的 reducer 函数中的一个 case 语句
     * @produce 相当于既定义了组件中 dispatch 使用的同步 Action（函数名就相当于 Action 的类型），也定义了 Reducer 更新状态函数（函数体就相当于 Reducer 更新 State）
     */
    addNum: (state, { type, payload }) => {
      state.num += payload; // 可以直接使用赋值的方式修改 State，不再需要每一次都返回一个新的 state
    },
    // 减少
    cutNum: (state, { type, payload }) => {
      state.num -= payload;
    },
  },
  /**
   * 可以让 slice 处理在别处定义的 Action，包括由 createAsyncThunk 创建的异步的 Action或其他 slice 生成的 Action
   */
  extraReducers: builder => {
    const { pending, fulfilled, rejected } = getAsyncCountAction;
    builder
      .addCase(pending, (state, { payload }) => {
        console.log("pending--------------");
      })
      .addCase(rejected, (state, { payload }) => {
        console.log("rejected--------------");
      })
      .addCase(fulfilled, (state, { payload }) => {
        console.log("fulfilled--------------");
        // state.num = payload;
      });
  },
  selectors: {
    selectItems: state => state.num,
  },
});
