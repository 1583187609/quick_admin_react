import { MockMethod } from "vite-plugin-mock";
import apis from "./apis";
// import resData from "./utils/response";
// import { getRequestParams } from "./utils";

// module.exports = [
//   ...apis,
//   // {
//   //   url: "/example/test",
//   //   method: "post",
//   //   response: (req: CommonObj) => {
//   //     const { name } = getRequestParams(req);
//   //     console.log(name, "req---------------");
//   //     return resData({ data: "Hello World, Test!" });
//   //   },
//   // },
// ] as MockMethod[];
export default apis as MockMethod[];
