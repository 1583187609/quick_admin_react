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
  smooth?: boolean; //折线是否平滑
  symbolSize?: number; //折线连接点的大小
  option?: CommonObj;
}
const defaultOption = {
  // title: {},
  legend: {
    // y: '92%',
  },
  tooltip: {
    trigger: "axis",
  },
  //类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: "category", ...axisCfg },
  //数值轴（value）。
  yAxis: {
    type: "value",
    // name: unit, //纵轴单位
    ...axisCfg,
  },
  grid: { left: 0, top: 40, right: 0, bottom: 0, containLabel: true },
  // dataset: {
  //   // dimensions: ["product", "2015", "2016", "2017"],
  //   source: [["Matcha Latte", 43.3, 85.8, 93.7],["Milk Tea", 83.1, 73.4, 55.1]],
  // },
  // 声明多个 line 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  // series: [{ type: "line" }, { type: "line" }, { type: "line" }],
};
const tempData = [
  ["product", "2015", "2016", "2017"],
  ["第一季度", 43.3, 85.8, 93.7],
  ["第二季度", 83.1, 73.4, 55.1],
  ["第三季度", 86.4, 65.2, 82.5],
  ["第四季度", 72.4, 53.9, 39.1],
];
function getItemColor(ind: number) {
  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: gradColors[ind][0],
    },
    {
      offset: 1,
      color: gradColors[ind][0],
    },
  ]);
}
export default ({
  title,
  unit,
  data = tempData,
  smooth = false,
  symbolSize = 6,
  option,
  ...restPorps
}: Props) => {
  const dimensions = data?.[0] || ["product"];
  const series =
    dimensions?.slice(1)?.map((item: any, ind: number) => {
      return {
        type: "line",
        symbolSize,
        smooth,
        lineStyle: {
          color: getItemColor(ind),
        },
        itemStyle: {
          color: getItemColor(ind),
        },
      };
    }) || [];
  const newOpts: CommonObj = merge(
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
  return <BaseChart option={newOpts} {...restPorps} />;
};
