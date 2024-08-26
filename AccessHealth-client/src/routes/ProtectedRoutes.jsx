import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { state } = useAuth();
  const isAllowed = allowedRoles.includes(state.role);

  const accesibleRoute =
    state.token && isAllowed ? (
      children
    ) : (
      <Navigate to={"/login"} replace={true} />
    );

  return accesibleRoute;
};

export default ProtectedRoutes;
