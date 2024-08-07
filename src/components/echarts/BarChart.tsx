import { merge } from "lodash";
import { CSSProperties } from "react";
import { axisCfg, gradColors, titleCfg } from "./_config";
import BaseChart, {
  coreEcharts as echarts,
  DataItem,
  ThemeTypes,
} from "./BaseChart";
interface Props {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  theme?: ThemeTypes;
  title?: string;
  unit?: string;
  data?: DataItem;
  option?: CommonObj;
}
const defaultOption = {
  // title: {},
  legend: {},
  barWidth: 16,
  barGap: "50%",
  tooltip: {
    trigger: "item",
  },
  //类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: "category", ...axisCfg },
  //数值轴（value）。
  yAxis: {
    type: "value",
    // name: unit, //纵轴单位
    ...axisCfg,
  },
  grid: { left: 0, top: 30, right: 0, bottom: 0, containLabel: true },
  // dataset: {
  //   // dimensions: ["product", "2015", "2016", "2017"],
  //   source: [["Matcha Latte", 43.3, 85.8, 93.7],["Milk Tea", 83.1, 73.4, 55.1]], // 提供一份数据。
  // },
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  // series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
const tempData = [
  /** 单维度示例 **/
  // ["product", "2015"],
  // ["第一季度", 43.3],
  // ["第二季度", 83.1],
  // ["第三季度", 86.4],
  // ["第四季度", 72.4],
  /** 多维度示例 **/
  ["product", "2015", "2016", "2017"],
  ["第一季度", 43.3, 85.8, 93.7],
  ["第二季度", 83.1, 73.4, 55.1],
  ["第三季度", 86.4, 65.2, 82.5],
  ["第四季度", 72.4, 53.9, 39.1],
];
/**
 * 获取series 的itemStyle的color值
 * @param ind {number} 数组下标值
 * @param isMulti {boolean} 是否是多维度
 */
function getItemColor(ind: number, isMulti: boolean) {
  // const isMulti = dimensions.length > 2;
  /** 多维度多色，同一维度同一种颜色 */
  if (isMulti) {
    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: gradColors[ind][0],
      },
      {
        offset: 1,
        color: gradColors[ind][1],
      },
    ]);
  } else {
    /** 单维度多色可用，同一维度不同颜色 */
    return (params: CommonObj) => {
      const i = params.dataIndex;
      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: gradColors[i][0],
        },
        {
          offset: 1,
          color: gradColors[i][1],
        },
      ]);
    };
  }
}
export default ({
  title,
  unit,
  data = tempData,
  option,
  ...restProps
}: Props) => {
  const barWidth = option?.barWidth || defaultOption.barWidth;
  const dimensions = data[0] || ["product"];
  const series =
    dimensions?.slice(1)?.map((item: any, ind: number) => {
      return {
        type: "bar",
        itemStyle: {
          borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
          color: getItemColor(ind, dimensions.length > 2),
        },
        label: {
          show: true,
          position: "top",
          color: "#666",
          fontSize: 14,
        },
      };
    }) || [];
  const newOpts = merge(
    {},
    defaultOption,
    {
      ...(title && { title: { text: title, ...titleCfg } }),
      ...(unit && { yAxis: { name: unit } }),
      dataset: {
        source: data,
      },
      series,
    },
    option
  );
  return <BaseChart option={newOpts} {...restProps} />;
};
