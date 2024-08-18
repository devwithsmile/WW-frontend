import React, { createContext, useState, useEffect } from 'react'
import { getAuthToken } from '../utils/auth' // Function to check JWT in cookies
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // console.log('AuthState:', isAuthenticated)

  useEffect(() => {
    // Initialize authentication state
    const token = getAuthToken()
    if (token) {
      const decodedUser = jwtDecode(token)
      // console.log('Decoded User: ', decodedUser.payload)
      setIsAuthenticated(token)
      setUser(decodedUser.payload)
    }
  }, [isAuthenticated])

  const login = (token) => {
    localStorage.setItem('auth_token', token)
    setIsAuthenticated(token)
    const decodedUser = jwtDecode(token)
    // console.log('Decoded User: ', decodedUser.payload)
    setUser(decodedUser.payload)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  // console.log('AuthState:', isAuthenticated)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
}
