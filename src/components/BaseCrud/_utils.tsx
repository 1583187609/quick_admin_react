import { BtnName, btnsMap } from "@/components/BaseBtn";
import StrongText from "./_components/StrongText";

//点击按钮后的弹出层提示内容
export function getBtnModalTips(name: BtnName, num = 0, max: number) {
  const { text, attrs } = btnsMap[name];
  const type = attrs?.danger ? "danger" : "primary";
  let tips = (
    <div className="f-fs-b-w">
      确定<StrongText type={type}>{text}</StrongText>共<StrongText type={type}>{num}</StrongText> 条数据？
    </div>
  );
  if (name === "export" && num > max) {
    tips = (
      <div className="f-fs-b-w">
        单次导出数量不能超过 <StrongText type={type}>{max}</StrongText> 条，请缩小查询范围！
      </div>
    );
  }
  return tips;
}
