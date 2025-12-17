import { api } from "../../../services/api";

export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};
export const register = (firstName: string, lastName: string, email: string, password: string) => {
  return api.post("/auth/register", { firstName, lastName, email, password }, {
    headers: { 
      'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    }
  }
  );
}

export const fetchMe = () => {
  return api.get("/auth/me", {
    headers: { 
      'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    }
  });
}
