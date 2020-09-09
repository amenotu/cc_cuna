import { createContext } from "react";

interface IAppContext {
  isQualified?: boolean;
}

const AppContext = createContext<IAppContext>({
  isQualified: undefined,
});

export default AppContext;
