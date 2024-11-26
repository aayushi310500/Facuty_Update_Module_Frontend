import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("authToken"); // Get the token from sessionStorage

  return token ? element : <Navigate to="/" replace />; // If no token, redirect to login
};

export default PrivateRoute;
