import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useLocalStorage } from "usehooks-ts";
interface AuthContextProps {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  authenticated: boolean | null;
  setAuthenticatedLocal: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticatedLocal] = useLocalStorage<
    null | boolean
  >("authenticated", null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (authenticated === null) {
      setAuthenticatedLocal(false);
    }
    setIsAuthenticated(authenticated);
  }, [authenticated, setAuthenticatedLocal]);

  const contextValue: AuthContextProps = {
    isAuthenticated,
    setIsAuthenticated,
    authenticated,
    setAuthenticatedLocal,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
