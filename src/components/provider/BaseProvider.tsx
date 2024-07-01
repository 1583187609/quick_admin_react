import { createContext } from "react";

export interface BaseContextProps {
  showCount?: boolean; // 表单字段是否展示限制最大字符数
  pureText?: boolean; // 是否纯文本展示
}

interface Props extends BaseContextProps {
  children?: any;
}

export const BaseContext = createContext<BaseContextProps>({
  showCount: true,
  pureText: false,
});

export default ({ children, ...restProps }: Props) => {
  return <BaseContext.Provider value={restProps}>{children}</BaseContext.Provider>;
};
