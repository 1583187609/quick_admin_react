// import { LocationQueryValue, useRoute } from "vue-router";
/**
 * 将route.query中的能转成数字的值都转成数字，用于BaseCrud中的下拉项正确识别数字code
 * @param exceptKeys 要排除掉转成数字的键名
 */
export default (exceptKeys?: string[])=>{
    // const route = useRoute();
    // const { query } = route;
    // for (const key in query) {
    //   const val = query[key];
    //   if (!exceptKeys?.includes(key)) {
    //     const num = Number(val);
    //     if (!isNaN(num)) {
    //       query[key] = num as unknown as LocationQueryValue;
    //     } else {
    //       if (val === "true") {
    //         query[key] = true as unknown as LocationQueryValue;
    //       } else if (val === "false") {
    //         query[key] = false as unknown as LocationQueryValue;
    //       }
    //     }
    //   }
    // }
    // return query;
}