import { createUserList } from "../create";
export default [
  ...createUserList({ type: 0, phonePre: "18483221518" }, 1), //超级管理员
  ...createUserList({ type: 1, phonePre: "180" }, 1, 11),
  ...createUserList({ type: 1, phonePre: "181" }, 3, 21),
  ...createUserList({ type: 2, phonePre: "182" }, 4, 31),
  ...createUserList({ type: 3, phonePre: "183" }, 93, 100),
  ...createUserList({ type: 4, phonePre: "184" }, 10, 200),
  ...createUserList({ type: 5, phonePre: "185" }, 10, 220),
];
