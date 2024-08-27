import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthToken } from "../../utils/auth"; // Import your auth utility
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ element }) => {
  const token = getAuthToken();
  const status = localStorage.getItem("status");

  if (!token) {
    // Allow them to view the non-authenticated page when user/owner is not logged in
    return element;
  }
  console.log("Im coming here ", status);

  // Authenticated user/owner
  const decodedUser = jwtDecode(token);
  const { role } = decodedUser.payload;

  // Check If the role is Owner
  if (role === "owner") {
    // Redirection for Owner's based on their status
    if (status === "active") {
      return <Navigate to="/owners/dashboard" replace />;
    } else if (status === "inactive" || status === "rejected") {
      return <Navigate to="/owners/status" replace />;
    } else if (status === "new") {
      return <Navigate to="/owners/gymForm" replace />;
    }
  }

  // Redirect to auth home or another authenticated route */}
  return <Navigate to="/home" replace />;
};

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired, // Ensures children is a valid React node
};

export default PublicRoute;
