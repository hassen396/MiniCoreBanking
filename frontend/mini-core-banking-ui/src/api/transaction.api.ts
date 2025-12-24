import axios from 'axios'

const API_URL = 'https://localhost:5001/api'

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json'
})

export const deposit = (accountNumber: string, amount: number | string) => {
  return axios.post(
    `${API_URL}/transactions/deposit`,
    { accountNumber, amount: Number(amount) },
    { headers: authHeader() }
  )
}

export const withdraw = (accountNumber: string, amount: number | string) => {
  return axios.post(
    `${API_URL}/transactions/withdraw`,
    { accountNumber, amount: Number(amount) },
    { headers: authHeader() }
  )
}

export const transfer = (
  fromAccountNumber: string,
  toAccountNumber: string,
  amount: number | string,
  remarks?: string
) => {
  return axios.post(
    `${API_URL}/transactions/transfer`,
    { fromAccountNumber, toAccountNumber, amount: Number(amount), remarks },
    { headers: authHeader() }
  )
}
