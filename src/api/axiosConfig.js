import axios from "axios";

const api = axios.create({
  baseURL: "https://v-consult.api-fv.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Axios Request Headers:", config.headers);
  return config;
});

export default api;
