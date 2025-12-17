import axios from "axios";

const API_URL = "https://localhost:5001/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const getMyAccounts = () => {
  return axios.get(`${API_URL}/accounts/mine`, {
    headers: authHeader(),
  });
};

export const getAccountBalance = (accountId: string) => {
  return axios.get(
    `${API_URL}/accounts/${accountId}/balance`,
    {
      headers: authHeader(),
    }
  );
};
