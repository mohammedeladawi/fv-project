import axios from "axios";
import { history } from "../history/history";
const baseURL = "https://v-consult.api-fv.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request Interceptor =====
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
  }
  return config;
});

// ===== Helper Function =====
const getNewAccessTokenUsingRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
      token: JSON.parse(refreshToken),
    });

    return data?.data?.accessToken || null;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    return null;
  }
};

// ===== Response Interceptor =====
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;

    if (errorCode === "0622" && !originalRequest._retry) {
      originalRequest._retry = true; // ⚡ important

      const newAccessToken = await getNewAccessTokenUsingRefreshToken();
      if (newAccessToken) {
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
