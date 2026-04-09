import { api } from "./api";
import { setAccessToken } from "./token.service";

export const login = async (email: string, password: string) => {
  const res = await api.post(
    "/auth/login",
    { email, password },
    { withCredentials: true },
  );

  setAccessToken(res.data.accessToken);

  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout", {}, { withCredentials: true });
  setAccessToken(null);

  return res.data;
};
