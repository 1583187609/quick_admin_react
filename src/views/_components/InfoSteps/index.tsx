/**
 * 完善资料阶段步骤
 */

import { CSSProperties, useMemo } from "react";
import BaseIcon from "@/components/BaseIcon";
import { CommonObj } from "@/vite-env";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  data?: CommonObj;
  [key: string]: any;
}

const statusMap: CommonObj = {
  0: {
    text: "已完善 - 已通过",
    class: "success",
  },
  1: {
    text: "已完善 - 未通过",
    class: "danger",
  },
  2: {
    text: "已完善 - 待审核",
    class: "primary",
  },
  3: {
    text: "未完善",
    class: "warning",
  },
};
export default ({ className = "", data = {}, children, ...restProps }: Props) => {
  const resData = useMemo(() => {
    const { infoStatus = "", idCardStatus, companyStatus, schoolStatus } = data;
    return {
      hasRealName: idCardStatus === 0,
      hasAuth: companyStatus === 0 || schoolStatus === 0,
      info: statusMap[infoStatus] || {},
    };
  }, [data]);
  return (
    <div className={`${className} ${s["info-steps"]}`} {...restProps}>
      <div className={`${s[resData.info?.class]} ${s["step-item"]} f-fs-c`}>
        <div className={`${s.num} f-0`}>1</div>
        <div className={`${s.text} f-0`}>{resData.info?.text || "-"}</div>
        <BaseIcon className={s.icon} size="20px" name="CheckCircleOutlined" />
      </div>
      <div className={`${resData.hasRealName ? s.success : ""} ${s["step-item"]} f-fs-c`}>
        <div className={`${s.num} f-0`}>2</div>
        {resData.hasRealName ? <div className={`${s.text} f-0`}>已实名</div> : <div className={`${s.text} f-0`}>未实名</div>}
        <BaseIcon className={s.icon} size="20px" name="CheckCircleOutlined" />
      </div>
      <div className={`${resData.hasAuth ? s.success : ""} ${s["step-item"]} f-fs-c`}>
        <div className={`${s.num} f-0`}>3</div>
        {resData.hasAuth ? <div className={`${s.text} f-0`}>已认证</div> : <div className={`${s.text} f-0`}>未认证</div>}
        <BaseIcon className={s.icon} size="20px" name="CheckCircleOutlined" />
      </div>
    </div>
  );
};
