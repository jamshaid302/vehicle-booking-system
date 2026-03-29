import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const publicRoutes = ["/auth/login", "/auth/signup"];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublic = publicRoutes.some((route) => config.url?.includes(route));

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
