import axios from 'axios'
import { getAuthToken } from '../utils/auth'
import config from '../config'

const api = axios.create({
  baseURL: config.BASE_BACKEND_URL,
})

//Setup an interceptor to add the token to the request headers
api.interceptors.request.use((data) => {
  // console.log('Request', data)
  const token = getAuthToken()
  if (token) {
    data.headers.Authorization = `Bearer ${token}`
  }
  return data
})

// Set up an interceptor to handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we've reached here, the token has expired / not sent / invalid
      // log out the user
      // localStorage.removeItem('token');
      // Redirect to login page
    }
    return Promise.reject(error)
  }
)

export default api
