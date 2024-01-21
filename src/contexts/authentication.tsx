import axios from "axios";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  accessToken: string | null;
  refreshAccessToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function refreshAccessToken() {
    try {
      const response = await axios.get("http://localhost:3001/refresh", {
        withCredentials: true,
      });
      if (response?.data?.accessToken) {
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  }

  const contextValue: AuthContextProps = {
    isAuthenticated,
    setIsAuthenticated,
    setAccessToken,
    accessToken,
    refreshAccessToken,
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
