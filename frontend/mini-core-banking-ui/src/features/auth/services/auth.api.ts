import { api } from "../../../services/api";

export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};
