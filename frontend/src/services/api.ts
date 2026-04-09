import axios from "axios";
import { getAccessToken, setAccessToken } from "./token.service";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/refresh"];

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If no token in memory or request is public, just fail
    if (
      !getAccessToken() ||
      publicRoutes.some((r) => originalRequest.url?.includes(r))
    ) {
      return Promise.reject(error);
    }

    // Avoid retry loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        setAccessToken(res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (error) {
        setAccessToken(null);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
