import { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${parsedToken}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      const userToken = response.data.data.accessToken;

      setToken(userToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      localStorage.setItem("token", JSON.stringify(userToken));

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
