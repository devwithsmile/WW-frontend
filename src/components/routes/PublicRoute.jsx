import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getAuthToken } from '../../utils/auth' // Import your auth utility

const PublicRoute = ({ element }) => {
  return !getAuthToken() ? (
    element
  ) : (
    // Redirect to auth home or another authenticated route */}
    <Navigate to='/home' replace />
  )
}

export default PublicRoute

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired, // Ensures children is a valid React node
}
