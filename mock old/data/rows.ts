export const testRows = Array(10)
  .fill("")
  .map((item) => {
    return {
      col_1: 1,
      col_2: 2,
      col_3: 3,
      col_4: 4,
      col_5: 5,
    };
  });
export const userRows = Array(119)
  .fill("")
  .map((item, ind) => {
    const num = ind + 1;
    return {
      id: num,
      yhxm: "张三" + num,
      yhmc: "小巴兔" + num,
      js: "管理员",
      xb: "男",
      sjhm: "18483221518",
      zt: ind % 2,
      cjsj: "2023-02-26 10:00:00",
    };
  });
