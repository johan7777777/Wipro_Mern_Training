import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";
import { tokenStorage } from "../services/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      authApi
        .me()
        .then((data) => setUser(data.user))
        .catch(() => {
          tokenStorage.remove();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name, role = "user") => {
    const data = await authApi.register({ email, password, name, role });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
