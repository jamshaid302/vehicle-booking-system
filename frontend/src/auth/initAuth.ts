import { api } from "../services/api";
import { setAccessToken } from "../services/token.service";

export const initAuth = async () => {
  try {
    const res = await api.post("/auth/refresh", {}, { withCredentials: true });
    setAccessToken(res.data.accessToken);
  } catch (err) {
    setAccessToken(null);
  }
};
