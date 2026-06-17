"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isReady: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mentoria_auth");
      setIsAuthenticated(stored === "true");
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("mentoria_auth", "true");
    } catch (error) {
      // ignore
    }
  };

  const register = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("mentoria_auth", "true");
    } catch (error) {
      // ignore
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("mentoria_auth");
    } catch (error) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
