import { api } from "../services/api"





const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
})

export const getMyAccounts = () => {
  return api.get(`/accounts/mine`, {
    headers: authHeader()
  })
}

export const getAccountBalance = (accountId: string) => {
  return api.get(`/accounts/${accountId}/balance`, {
    headers: authHeader()
  })
}

export type CreateAccountRequest = {
  userName: string
  type: number
}

export const createAccount = (data: CreateAccountRequest) => {
  return api.post(`/accounts/create`, data, {
    headers: authHeader()
  })
}
export const GetAccountsCount= ()=>
{
  return api.get(`/accounts/get-accounts-count`,
    {
    headers: authHeader()
  }
  );
}
