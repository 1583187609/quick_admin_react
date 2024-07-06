// 首页
import BaseChart from "@/components/echarts/BaseChart";
import LineChart from "@/components/echarts/LineChart";
import BarChart from "@/components/echarts/BarChart";
import BarsChart from "@/components/echarts/BarsChart";
import PieChart from "@/components/echarts/PieChart";
import BaseSection from "@/components/BaseSection";
import s from "./index.module.less";

interface Props {}
export default ({}: Props) => {
  return (
    <div className={`${s.wrap}`}>
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
