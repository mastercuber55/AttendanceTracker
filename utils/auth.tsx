import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<{
  token: string | null;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<any[]>;
  signup: (credentials: { username: string; password: string }) => Promise<any[]>;
  logout: () => Promise<void>;
} | null>(null);

interface Credentials {
  username: string,
  password: string
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      setToken(storedToken);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async ({ username, password }: Credentials) => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    let data = null;
    let error = null;

    if (res.ok) {
      data = await res.json();
      await AsyncStorage.setItem("authToken", data.token);
      return [data, error];
    } else {
      error = await res.text();
      return [data, error];
    }
  };

  const signup = async ({ username, password }: Credentials) => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    let data = null;
    let error = null;

    if (res.ok) {
      data = await res.json();
      await AsyncStorage.setItem("authToken", data.token);
      return [data, error];
    } else {
      error = await res.text();
      return [data, error];
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, signup, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
