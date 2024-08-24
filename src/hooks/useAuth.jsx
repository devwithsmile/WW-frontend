import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const { isAuthenticated, user, setUser, login, logout } =
    useContext(AuthContext)
  return { isAuthenticated, user, setUser, login, logout }
}

export default useAuth
