import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user && user.token && user.is_admin) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;
