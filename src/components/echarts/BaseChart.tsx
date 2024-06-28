import { useEffect, useRef } from "react";
import { merge } from "lodash";
import { gradColors } from "./_config";
import { CSSProperties } from "react";
import * as echarts from "echarts/core";
import {
  PieChart,
  PieSeriesOption,
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
export const coreEcharts = echarts;
export type ThemeTypes = "dark" | "macarons"; //echarts图表主题色
export type DataItem = (string | number)[][]; //echarts图表的数据

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;
interface Props {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  theme?: ThemeTypes;
  option?: CommonObj;
}
// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
let echartIns: any = null;
const tempOpts = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
export default ({
  className = "",
  height = "300px",
  width = "100%",
  theme = "macarons",
  option = tempOpts,
}: Props) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const newOpts = merge(
    {
      color: gradColors.map((item) => item[0]),
    },
    option
  );
  function handleResize() {
    echartIns.resize();
  }
  useEffect(() => {
    echartIns = echarts.init(chartRef?.current as HTMLElement, theme);
    echartIns.setOption(newOpts, true);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [newOpts]);
  return (
    <div className={className} style={{ height, width }} ref={chartRef}></div>
  );
};
