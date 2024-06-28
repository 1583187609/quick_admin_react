import s from "./index.module.less";
interface Props {
  type?: "danger" | "primary";
  children?: any;
}
export default ({ type = "primary", children }: Props) => {
  const isNum = !isNaN(Number(children));
  return (
    <strong
      className={`${s[type]} ml-6 mr-6`}
      style={{ fontSize: isNum ? 18 : 16 }}
    >
      {children}
    </strong>
  );
};
