import { api } from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  const token = res.data.token;
  localStorage.setItem("token", token);

  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};
