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
  titles?: string[];
  units?: string[];
  datas?: DataItem[];
  option?: CommonObj;
}
const defaultOption = {
  // title: titles,
  tooltip: {
    trigger: "item",
  },
  barWidth: 12,
  barGap: "50%",
  grid: [
    { left: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
    { right: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
  ],
  // xAxis,
  // yAxis,
  // dataset: datasets,
  // series,
};
const tempData = [
  [
    ["name", "国内", "国外"],
    ["示例1", 30, 22],
    ["示例2", 14, 42],
    ["示例3", 18, 23],
    // ["name", "国内"],
    // ["建筑工程", 30],
    // ["能源化工", 14],
    // ["交通运输", 18],
  ],
  [
    ["name", "国内", "国外"],
    ["示例1", 23, 62],
    ["示例2", 65, 88],
    ["示例3", 66, 48],
    // ["name", "国内"],
    // ["建筑工程", 23],
    // ["能源化工", 65],
    // ["交通运输", 66],
  ],
];

export default ({
  titles = ["标题1", "标题2"],
  units = ["元", "元"],
  datas = tempData,
  option,
  ...restProps
}: Props) => {
  // const { datas, option, titles, units } = props;
  let [datasets, newTitles, series, xAxis, yAxis]: any = [[], [], [], [], []];
  datas.forEach((data, index) => {
    const title = titles[index];
    const unit = units[index];
    newTitles.push({
      gridIndex: index,
      left: index == 0 ? "25%" : "75%",
      bottom: 0,
      textAlign: "center",
      text: `{label|${title}}  {amount|${getTotal(data.slice(1))}${unit}}`,
      textStyle: {
        rich: {
          label: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#666",
          },
          amount: {
            color: "#333",
            fontSize: 15,
            fontWeight: "bold",
          },
        },
      },
    });
    xAxis.push({
      type: "category",
      gridIndex: index,
      ...axisCfg,
    });
    yAxis.push({
      type: "value",
      gridIndex: index,
      name: unit,
      ...axisCfg,
    });
    datasets.push({ source: data });
    const dimensions = data[0];
    for (let i = 0; i < dimensions.length - 1; i++) {
      series.push({
        type: "bar",
        xAxisIndex: index,
        yAxisIndex: index,
        datasetIndex: index,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              offset: 0,
              color: gradColors[i][0],
            },
            {
              offset: 1,
              color: gradColors[i][1],
            },
          ]),
          borderRadius: [6, 6, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          color: "#666",
          fontSize: 14,
        },
      });
    }
  });
  const newOpts = merge(
    {},
    defaultOption,
    {
      title: newTitles,
      // tooltip: {
      //   trigger: "item",
      // },
      // barWidth: 12,
      // barGap: "50%",
      grid: [
        { left: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
        { right: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
      ],
      xAxis,
      yAxis,
      dataset: datasets,
      series,
    }
    // option
  );
  function getTotal(arr: any[]) {
    let total = 0;
    arr.forEach((itemArr) => {
      for (let i = 1; i < itemArr.length; i++) {
        total += Number(itemArr[i]);
      }
    });
    return total;
  }
  return <BaseChart option={newOpts} {...restProps} />;
};
