/**
 * 文件说明-模板文件
 */

import { CSSProperties } from "react";
import BaseAvatar from "@/components/BaseAvatar";
import BaseCopy from "@/components/BaseCopy";
import { Popover } from "antd";
import { CommonObj } from "@/vite-env";
import BaseTag from "@/components/BaseTag";
import { useDictMap, useRouter } from "@/hooks";
import s from "./index.module.less";

interface Props {
  className?: string;
  style?: CSSProperties;
  simple?: boolean;
  data?: CommonObj;
  [key: string]: any;
}
export default ({ className = "", data = {}, simple, children, ...restProps }: Props) => {
  const router = useRouter();
  const { getText, getCascaderText } = useDictMap();
  function getAuthStatus(data: CommonObj) {
    const { companyStatus, schoolStatus } = data;
    let status = 0;
    if (companyStatus === 0 && schoolStatus === 0) {
      status = 4;
    } else {
      if (companyStatus === 0) {
        status = 3;
      } else if (schoolStatus === 0) {
        status = 2;
      } else {
        status = 1;
      }
    }
    return status;
  }
  function toUserDetail() {
    router.push({ name: "systemUserDetail", query: { id: data.id } });
  }
  return (
    <div className={`${className} ${s["user-info"]} f-sb-s`} {...restProps}>
      {simple ? (
        <>
          <BaseAvatar size={120} className={`${s.avatar} ${s.simple} f-0 mr-8`} src={data.avatar} gender={data.gender} />
          <div className="f-1 f-sb-s-c">
            <b onClick={toUserDetail} className={`${s.nickname} line-1`}>
              {data.nickname || "-"}
            </b>
            <div className="f-fs-c">
              <div className="f-0 mr-o">
                ID：
                <BaseCopy text={data.id} line="1" />
              </div>
              <BaseTag className={`${s.gender} f-0`} name="Gender" value={data.gender} size="small" pureText />
            </div>
            <div className="f-sb-c">
              <BaseTag className="f-0" name="AccountStatus" value={data.accountStatus} size="small" />
              <BaseTag className="f-0" name="AuthCase" value={getAuthStatus(data)} size="small" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${s["avatar-box"]} f-0 mr-8`}>
            {data.companyStatus === 0 && (
              <Popover content={data.companyName}>
                <BaseTag className={`${s.company} ${s.tag}`} name="AuthCase" value="3">
                  公司
                </BaseTag>
              </Popover>
            )}
            <BaseAvatar size={120} className={s.avatar} src={data.avatar} gender={data.gender} />
            {data.schoolStatus === 0 && (
              <Popover content={getText("EducationType", data.schoolCertificateLevel) || "-"}>
                <BaseTag className={`${s.education} ${s.tag}`} name="AuthCase" value="2">
                  学历
                </BaseTag>
              </Popover>
            )}
          </div>
          <div className="f-1 f-sb-s-c">
            <div className="f-sb-c">
              <b onClick={toUserDetail} className={`${s.nickname} line-1`}>
                {data.nickname || "-"}
              </b>
              <BaseTag className={`${s.gender} f-0`} name="Gender" value={data.gender} size="small" pureText />
              <span className={`${s.age} f-0`}>{data.age || "0"}岁</span>
              <BaseTag className="f-0 ml-h mr-a" name="MatrimonyStatus" value={data.singleType} size="small" pureText />
              <BaseTag className="f-0" name="AccountStatus" value={data.accountStatus} size="small" />
            </div>
            <div className="f-sb-c">
              <div className={`${s.item} f-0`}>
                ID：
                <BaseCopy text={data.id} line="1" />
              </div>
              <div className={`${s.item} f-0`}>
                学号：
                <BaseCopy text={data.userCode} line="1" />
              </div>
            </div>
            <div className="f-fs-c">
              <div className={`${s.item} f-0`}>
                学历：<b>{getText("EducationType", data.schoolCertificateLevel) || "-"}</b>
              </div>
              <div className={`${s.item} f-0`}>
                学校：<b>{data.schoolName || "-"}</b>
              </div>
            </div>
            <div className="f-fs-fs">
              <div className={`${s.item} f-0`}>
                职业：<b>{data.jobName || "-"}</b>
              </div>
              <div className={`${s.item} f-0`}>
                收入：<b>{data.incomeTypeName || "-"}</b>
              </div>
            </div>
            <div className="f-fs-c">
              <div className={`${s.item} f-0`}>
                现居地：<b>{getCascaderText("Region", data.liveCity) || "-"}</b>
              </div>
              <div className={`${s.item} f-0`}>
                家乡：<b>{getCascaderText("Region", data.city) || "-"}</b>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
