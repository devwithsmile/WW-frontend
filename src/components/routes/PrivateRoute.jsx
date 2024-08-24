import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const PrivateRoute = ({ element, allowedRoles }) => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    toast.error("Please login to access the page"); // TODO:

    // If no token, redirect to owner login
    if (allowedRoles === "owner") {
      return <Navigate to="/owners/login" state={{ from: location }} replace />;
    }
    // Redirect to the customer login page if roles are not owner
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const decodedUser = jwtDecode(token);
  const { role } = decodedUser.payload;

  // Check if the role is allowed
  if (role !== allowedRoles) {
    console.log(role);
    console.log(allowedRoles);
    // If the role is not allowed, redirect to not-authorized page
    return <Navigate to="/not-authorized" replace />;
  }

  // If token and role are valid, render the component
  return element;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.string.isRequired,
};
