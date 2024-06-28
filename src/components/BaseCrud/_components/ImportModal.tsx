import BaseBtn from "@/components/BaseBtn";

export default () => {
  return (
    <>
      <div className="mb-16">请先下载模板后再上传</div>
      <div className="f-sa-c">
        <BaseBtn btn={{ name: "download", attrs: { ghost: false } }}>
          下载模板
        </BaseBtn>
        <BaseBtn btn="import">导入数据</BaseBtn>
      </div>
    </>
  );
};
