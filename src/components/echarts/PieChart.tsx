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
  theme?: ThemeTypes;
  height?: string | number;
  width?: string | number;
  title?: string;
  unit?: string;
  data?: DataItem;
  hollow?: boolean;
  radius?: [number, number];
  center?: [string, string];
  option?: CommonObj;
}
const defaultOption = {
  // title: {},
  tooltip: {},
  legend: {
    // x: "5%",
    // y: "center",
    itemGap: 20,
    itemHeight: 12,
    itemWidth: 12,
    // orient: "vertical",
    // formatter(name) {
    //     let val = dataset.source.find(item => {
    //         return item[0] === name;
    //     })[1];
    //     return `{label|${name}}{value|${val}${unit}}`;
    // },
    color: "#999",
    fontSize: 14,
    rich: {
      label: {
        width: 150,
      },
      value: {
        color: "#333",
        fontWeight: "bold",
        width: 100,
      },
    },
  },
  // dataset: {
  //   source: [
  //     ["主要负责人用车", 150],
  //   ],
  // },
  // series: [{type: "pie"}],
};
const tempData = [
  ["主要负责人用车", 150],
  ["其他公务用车", 149],
  ["经营和业务保险专用车", 150],
];
//获取空心饼图的legend配置
function getHollowLegendCfg() {
  return {
    legend: {
      x: "5%",
      y: "center",
      orient: "vertical",
    },
  };
}

export default ({
  title,
  unit,
  data = tempData,
  hollow = true,
  radius = [72, 93],
  center = ["75%", "50%"],
  option,
  ...restProps
}: Props) => {
  const newOpts = merge(
    {},
    defaultOption,
    {
      ...(title && { title: { text: title, ...titleCfg } }),
      ...(hollow ? getHollowLegendCfg() : {}),
      // legend: {
      //   formatter(name: string) {
      //     let val = data?.find((item: any) => {
      //       return item[0] === name;
      //     })[1];
      //     return `{label|${name}}{value|${val}${unit}}`;
      //   },
      // },
      dataset: {
        source: data,
      },
      series: [
        {
          type: "pie",
          ...(hollow ? getHollowSeriesCfg() : {}),
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
            color: (params: CommonObj) => {
              const ind = params.dataIndex;
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
            },
          },
        },
      ],
    },
    option
  );
  //获取空心饼图的series配置
  function getHollowSeriesCfg() {
    let total = 0;
    data.forEach((item) => {
      total += Number(item[1]);
    });
    return {
      radius,
      center,
      label: {
        show: true,
        position: "center",
        color: "#4c4a4a",
        formatter: `{value|${total}}\n\r{label|车辆总数${
          unit ? `(${unit})` : ""
        }}`,
        rich: {
          value: {
            color: "#333",
            fontSize: 24,
            lineHeight: 24,
            fontWeight: "bold",
          },
          label: {
            color: "#999",
            fontSize: 14,
            lineHeight: 24,
            fontWeight: "bold",
          },
        },
        emphasis: {
          show: true,
        },
      },
    };
  }
  return <BaseChart option={newOpts} {...restProps} />;
};
