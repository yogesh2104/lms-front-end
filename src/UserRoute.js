import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token && !user.is_admin) {
    return children;
  } else if (user.is_admin) {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default UserRoute;
