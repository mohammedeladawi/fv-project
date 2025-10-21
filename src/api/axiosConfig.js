import axios from "axios";
import { removeTokensFromLocalStorage } from "../utils/reusableFunctions";
const baseURL = "https://v-consult.api-fv.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Helper Function =====
const getNewAccessTokenUsingRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${baseURL}/auth/refresh-token`, {
      token: JSON.parse(refreshToken),
    });

    return response.data?.data?.accessToken || null;
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
      originalRequest._retry = true; // no infinite loop

      const newAccessToken = await getNewAccessTokenUsingRefreshToken();

      if (newAccessToken) {
        // make request ready and send it
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } else {
        removeTokensFromLocalStorage();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
