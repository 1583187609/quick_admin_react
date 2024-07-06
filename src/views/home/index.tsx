// 首页
import { useEffect } from "react";
import { Tabs } from "antd";
import BaseChart from "@/components/echarts/BaseChart";
import LineChart from "@/components/echarts/LineChart";
import BarChart from "@/components/echarts/BarChart";
import BarsChart from "@/components/echarts/BarsChart";
import PieChart from "@/components/echarts/PieChart";
import BaseTable from "@/components/table/BaseTable";
import BaseSection from "@/components/BaseSection";
import s from "./index.module.less";

interface Props {}
const tabs = [
  {
    label: "我的待办",
    value: 1,
    columns: [
      { dataIndex: "follow", title: "关注" },
      { dataIndex: "title", title: "标题" },
      { dataIndex: "from_unit", title: "来文单位" },
      { dataIndex: "accept_time", title: "接受时间" },
    ],
    dataSource: [],
  },
  {
    label: "我的待阅",
    value: 2,
    columns: [
      { dataIndex: "follow", title: "关注1" },
      { dataIndex: "title", title: "标题1" },
      { dataIndex: "from_unit", title: "来文单位1" },
      { dataIndex: "accept_time", title: "接受时间1" },
    ],
    dataSource: [],
  },
  {
    label: "我的已办",
    value: 3,
    columns: [
      { dataIndex: "follow", title: "关注2" },
      { dataIndex: "title", title: "标题2" },
      { dataIndex: "from_unit", title: "来文单位2" },
      { dataIndex: "accept_time", title: "接受时间2" },
    ],
    dataSource: [],
  },
  {
    label: "我发起的",
    value: 4,
    columns: [
      { dataIndex: "follow", title: "关注3" },
      { dataIndex: "title", title: "标题3" },
      { dataIndex: "from_unit", title: "来文单位3" },
      { dataIndex: "accept_time", title: "接受时间3" },
    ],
    dataSource: [],
  },
];
export default ({}: Props) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className={`${s.wrap}`}>
      <div className={`${s.row} f-sb-s`}>
        <BaseSection title="待办事项" count={108} className={`${s.section} f-2`}>
          <Tabs
            onChange={onChange}
            type="card"
            size="small"
            items={tabs.map((item, ind) => {
              const { label, value, columns, dataSource } = item;
              return {
                label,
                key: String(value),
                children: <BaseTable size="small" columns={columns} dataSource={dataSource} />,
              };
            })}
          />
        </BaseSection>
        <BaseSection title="消息通知" count={12} className={`${s.section} f-1`}>
          <ul className={`${s.notices} all-hide-scroll`}>
            {Array(20)
              .fill("")
              .map((item, ind) => {
                return (
                  <li className={`${s.item} f-sb-c`} key={ind}>
                    <div className="f-1">
                      <span className="line-1">这是第{ind + 1}条消息</span>
                    </div>
                    <time className="f-0 ml-h">2023-06-19</time>
                  </li>
                );
              })}
          </ul>
        </BaseSection>
      </div>
      <BaseSection title="通图图表 - 折线图" className={`${s.row} ${s.section}`}>
        <LineChart unit="亿元" />
      </BaseSection>
      <div className={`${s.row} f-sb-s`}>
        <BaseSection title="基础万能图 - BaseChart" className={`${s.section} f-1`}>
          {<BaseChart />}
        </BaseSection>
        <BaseSection title="折线图 - LineChart" className={`${s.section} f-1`}>
          <LineChart unit="亿元" />
        </BaseSection>
      </div>
      <div className={`${s.row} f-sb-s`}>
        <BaseSection title="柱状图 - BarChart（单维度）" className={`${s.section} f-1`}>
          <BarChart
            unit="亿元"
            data={[
              ["product", "2015"],
              ["第一季度", 43.3],
              ["第二季度", 83.1],
              ["第三季度", 86.4],
              ["第四季度", 72.4],
            ]}
          />
        </BaseSection>
        <BaseSection title="柱状图 - BarChart（多维度）" className={`${s.section} f-1`}>
          <BarChart unit="亿元" />
        </BaseSection>
        <BaseSection title="柱状图 - BarsChart（多个）" className={`${s.section} f-1`}>
          <BarsChart />
        </BaseSection>
        <BaseSection title="饼图 - PieChart" className={`${s.section} f-1`}>
          <PieChart />
        </BaseSection>
      </div>
    </div>
  );
};
