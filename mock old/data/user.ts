import { createUserList } from "../create";
export default [
  ...createUserList({ type: 0, phonePre: "18483221518" }, 1), //超级管理员
  ...createUserList({ type: 1, phonePre: "180" }, 2, 2),
  ...createUserList({ type: 1, phonePre: "181" }, 3, 4),
  ...createUserList({ type: 2, phonePre: "182" }, 4, 7),
  ...createUserList({ type: 3, phonePre: "183" }, 100, 13),
];
