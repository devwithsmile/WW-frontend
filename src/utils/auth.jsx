// VALIDATION IF USER IS SIGNED IN
export const getAuthToken = () => {
  const auth_token = localStorage.getItem('auth_token')

  if (auth_token) return auth_token

  return false
}
