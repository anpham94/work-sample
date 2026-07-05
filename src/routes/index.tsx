import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AccountOverviewPage from "@/features/dashboard/AccountOverviewPage";
import AccountDetailPage from "@/features/account-detail/AccountDetailPage";
import LoginPage from "@/features/auth/LoginPage";
import { ProtectedRoute, PublicRoute } from "@/routes/auth";
import { PATH_ROUTES } from "@/routes/paths";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={PATH_ROUTES.ACCOUNT.OVERVIEW} element={<AccountOverviewPage />} />
          <Route path={PATH_ROUTES.ACCOUNT.DETAIL_PATTERN} element={<AccountDetailPage />} />
        </Route>
      </Route>

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={PATH_ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={PATH_ROUTES.AUTH.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
