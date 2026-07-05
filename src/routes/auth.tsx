import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { PATH_ROUTES } from "@/routes/paths";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={PATH_ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={PATH_ROUTES.ACCOUNT.OVERVIEW} replace />;
  }

  return <Outlet />;
};
