import { createContext } from "react";

export interface BaseContextProps {
  showCount?: boolean;
  pureText?: boolean;
}

interface Props extends BaseContextProps {
  children?: any;
}

export const BaseContext = createContext<BaseContextProps>({
  showCount: true,
  pureText: false,
});

export default ({ children, ...restValue }: Props) => {
  return (
    <BaseContext.Provider value={restValue}>{children}</BaseContext.Provider>
  );
};
