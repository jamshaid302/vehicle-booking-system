import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../services/token.service";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
