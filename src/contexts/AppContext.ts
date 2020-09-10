import { createContext } from "react";

interface IAppContext {
  isQualified?: boolean;
  setIsQualified: (isQualified?: boolean) => void;
  disqualificationMessage?: string;
  setDisqualificationMessage: (disqualificationMessage?: string) => void;
}

const AppContext = createContext<IAppContext>({
  isQualified: undefined,
  setIsQualified: () => {},
  disqualificationMessage: undefined,
  setDisqualificationMessage: () => {},
});

export default AppContext;
