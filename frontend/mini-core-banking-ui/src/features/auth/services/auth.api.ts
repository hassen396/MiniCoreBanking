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
export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createUser = (data: CreateUserRequest) => {
  return api.post("/Auth/create-user", data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
};
export const GetUsersCount= ()=>
{
  return api.get("/Auth/get-user-cont",
    {
    headers: { 
      Authorization: 'Bearer ' + localStorage.getItem("accessToken")
    }
  }
  );
}
