import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const data = await getCurrentUser();

      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Check auth error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(username, password) {
    try {
      const data = await loginUser(
        username,
        password
      );

      if (data.success) {
        setUser(data.user);

        return {
          success: true,
          user: data.user,
        };
      }

      return {
        success: false,
        message:
          data.message || "Login failed",
      };

    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Login failed",
      };
    }
  }

  async function logout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}