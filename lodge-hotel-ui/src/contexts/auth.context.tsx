import type { AuthUserModel, LoginModel } from "@models";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

export interface AuthContextState {
  user: string;
  role: string;
  isAuthenticated: boolean;
  setAuth: (userData: LoginModel) => void;
}
export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);

export const getSession = (): LoginModel => {
  const user = JSON.parse(
    localStorage.getItem("user") ?? "{}"
  ) as AuthUserModel;

  const access_token = JSON.parse(localStorage.getItem("access_token") ?? "{}");
  return { user, access_token };
};

export const setSessionInLocalStorage = (session: LoginModel) => {
  if (session) {
    localStorage.setItem("user", JSON.stringify(session.user));
    localStorage.setItem("access_token", JSON.stringify(session.access_token));
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const auth = getSession();
  const [session, setSession] = useState<LoginModel>(
    auth || ({} as LoginModel)
  );

  const setAuth = (userData: LoginModel) => {
    setSession(userData);
    setSessionInLocalStorage(userData);
  };

  const {
    user: { user, role },
    access_token,
  } = session;

  const isAuthenticated = role !== "" && access_token !== "";

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("the context was accessed outside the Context Provider");
  return context;
};
