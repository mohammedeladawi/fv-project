import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Page Launched (first time)
  useEffect(() => {
    restoreTokens();
  }, []);

  // Check localStorage
  const restoreTokens = useCallback(() => {
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedRefresh) setRefreshToken(JSON.parse(storedRefresh));

    if (storedAccess) {
      setAccessToken(JSON.parse(storedAccess));
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        storedAccess
      )}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.refreshToken;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
      localStorage.setItem("refreshToken", JSON.stringify(newRefreshToken));

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, restoreTokens, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
