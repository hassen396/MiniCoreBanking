import axios from "axios";

const API_URL = "https://localhost:5001/api";

const authHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const deposit = (accountId: string, amount: number) => {
	return axios.post(
		`${API_URL}/transactions/deposit`,
		{ accountId, amount },
		{ headers: authHeader() }
	);
};

export const withdraw = (accountId: string, amount: number) => {
	return axios.post(
		`${API_URL}/transactions/withdraw`,
		{ accountId, amount },
		{ headers: authHeader() }
	);
};

export const transfer = (
	fromAccountId: string,
	toAccountId: string,
	amount: number
) => {
	return axios.post(
		`${API_URL}/transactions/transfer`,
		{ fromAccountId, toAccountId, amount },
		{ headers: authHeader() }
	);
};
