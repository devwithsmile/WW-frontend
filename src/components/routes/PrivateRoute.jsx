import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getAuthToken } from '../../utils/auth'

const PrivateRoute = ({ element }) => {
  const location = useLocation()

  return getAuthToken() ? (
    element
  ) : (
    // Redirect to login page with the current location
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateRoute

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired, // Ensures children is a valid React node
}
