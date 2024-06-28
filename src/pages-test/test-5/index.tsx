/**
 * 文件说明-模板文件
 */

// import s from "./index.module.less";

// interface Props {
//   className?: string;
// }
// export default ({ className = "" }: Props) => {
//   return <div className={`${className}`}>模板文件</div>;
// };

import { Button, message, Popconfirm } from "antd";
export default () => {
  return (
    <>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="link"
          size="small"
          danger
          style={{ display: "inline-block" }}
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  );
};
