import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useState } from "react";
import { AuthAPI } from "../utils/api";

type User = { id: string; name?: string; email: string } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => void | Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => void | Promise<boolean>;
  logout: () => Promise<void> | void;
  refreshMe?: () => Promise<void>;
  rememberMe?: boolean; // Optional flag to indicate if "remember me" is enabled
  setRememberMe?: (val: boolean) => void; // Function to update "remember me" state
  isAuthenticated: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing token on app start
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          const userData = await AuthAPI.me();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthAPI.register({ name, email, password });
      const { accessToken, refreshToken, user } = response; // Adjust based on your backend response
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (err: Error | any) {
      setError(err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthAPI.login({ email, password });
      console.log("Response login: ", response);
      const { accessToken, refreshToken, user } = response;
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (err: Error | any) {
      setError(err.message || "Login failed");
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: Error | any) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
