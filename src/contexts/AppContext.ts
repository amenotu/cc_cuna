import { createContext } from "react";

interface IAppContext {
  isQualified: null | boolean;
  setIsQualified: (isQualified?: boolean) => void;
}

const AppContext = createContext<IAppContext>({
  isQualified: null,
  setIsQualified: () => {},
});

export default AppContext;
