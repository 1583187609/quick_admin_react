/**
 * 文件说明-模板文件
 */

import s from "./index.module.less";

interface Props {
  className?: string;
}
export default ({ className = "" }: Props) => {
  return <div className={`${className}`}>edit-table</div>;
};
