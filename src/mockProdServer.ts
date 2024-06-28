//  mockProdServer.ts
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// 逐一导入您的mock.js文件
// 如果使用vite.mock.config.js，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import apis from "../mock/apis";
console.log(apis, "apis------------------------");
export function setupProdMockServer() {
  createProdMockServer(apis);
}

// import Mock from "mockjs";
// const mockServer = (data: any) => {
//   Object.keys(data).forEach((path) => {
//     Mock.mock(
//       new RegExp(`^${process.env.VITE_API_BASE_URL}${path}`),
//       data[path]
//     );
//   });
// };
// mockServer(apis);
