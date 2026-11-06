import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

type AdminUser = {
  id: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // On mount: check if we have a stored token and verify it
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.getMe();
        setAdmin(res.data.admin);
        setIsAuthenticated(true);
      } catch {
        // Token is invalid or expired — clear it
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authAPI.login(email, password);
      const { token, admin: adminData } = res.data;
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(adminData));
      setAdmin(adminData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    // Also clear the old static auth key
    localStorage.removeItem("adminAuth");
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
