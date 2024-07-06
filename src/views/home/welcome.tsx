/**
 * 文件说明-模板文件
 */

import { SmileOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import welcomeImg from "@/assets/images/welcome.png";
import { getUserInfo } from "@/utils";
import { useRouter } from "@/hooks";
interface Props {
  className?: string;
}
function getTimePeriodAlias() {
  const hours = new Date().getHours();
  let alias = "";
  if (hours < 2) {
    alias = "凌晨";
  } else if (hours < 8) {
    alias = "清晨";
  } else if (hours < 11) {
    alias = "上午";
  } else if (hours < 13) {
    alias = "中午";
  } else if (hours < 18) {
    alias = "下午";
  } else if (hours < 20) {
    alias = "傍晚";
  } else if (hours < 23) {
    alias = "晚上";
  } else {
    alias = "深夜";
  }
  return alias;
}
export default ({ className = "" }: Props) => {
  const router = useRouter();
  const userInfo = getUserInfo() ?? {};
  const timeAlias = getTimePeriodAlias();
  return (
    <div className={`${className} f-c-c-c f-1`}>
      <Result
        icon={<SmileOutlined />}
        title={`欢迎回来，${userInfo._title}`}
        subTitle={`${timeAlias}好，别忘了照顾好自己哦~`}
        extra={
          <Button icon={<ArrowUpOutlined />} onClick={() => router.push("/workbench")} type="primary">
            前往工作台
          </Button>
        }
      />
    </div>
  );
  // return (
  //   <img
  //     src={welcomeImg}
  //     style={{ height: "100%", width: "100%", objectFit: "scale-down" }}
  //   />
  // );
};
