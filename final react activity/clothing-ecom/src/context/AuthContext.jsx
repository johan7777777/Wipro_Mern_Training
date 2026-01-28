import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    const userWithTimestamp = {
      ...userData,
      loginTime: new Date().toISOString(),
    };
    setUser(userWithTimestamp);
    localStorage.setItem("user", JSON.stringify(userWithTimestamp));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Also clear admin-specific items for backward compatibility
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
