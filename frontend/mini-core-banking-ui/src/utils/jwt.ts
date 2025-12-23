interface JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
  exp: number
}
export const GetRoleFromToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload
  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}
