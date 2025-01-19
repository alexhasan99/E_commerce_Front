"use client";

import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

interface AuthContextProps {
  token: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html` })
      .then((authenticated) => {
        if (authenticated && keycloak.token) {
          setToken(keycloak.token);
          localStorage.setItem("accessToken", keycloak.token); // Spara token om du vill
        }
      })
      .catch((err) => {
        console.error("Keycloak initialization failed:", err);
      });
  }, []);

  const login = () => {
    keycloak.login().then(() => {
      setToken(keycloak.token || null);
    });
  };

  const logout = () => {
    keycloak.logout().then(() => {
      setToken(null);
      localStorage.removeItem("accessToken");
    });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
