import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type AppContextProps = {
  children: React.ReactNode;
};

type State = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};
const Context = createContext<State | undefined>(undefined);
export const AppContext = ({ children }: AppContextProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const state: State = {
    loggedIn,
    setLoggedIn,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export const useAppContext = (): State => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContext must be used within a StateContext Provider");
  }
  return context;
};
