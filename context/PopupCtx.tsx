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
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  showSignup: boolean;
  setShowSignup: Dispatch<SetStateAction<boolean>>;
};
const Context = createContext<State | undefined>(undefined);
export const AppContext = ({ children }: AppContextProps) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const state: State = {
    showLogin,
    setShowLogin,
    showSignup,
    setShowSignup,
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
