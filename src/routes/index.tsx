import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AccountOverviewPage from "@/features/dashboard/AccountOverviewPage";
import AccountDetailPage from "@/features/account-detail/AccountDetailPage";
import { PATH_ROUTES } from "@/routes/paths";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATH_ROUTES.ACCOUNT.OVERVIEW} element={<AccountOverviewPage />} />

        <Route path={PATH_ROUTES.ACCOUNT.DETAIL_PATTERN} element={<AccountDetailPage />} />
      </Route>

      {/* 
      <Route path="/login" element={<LoginPage />} /> 
      */}

      <Route path="*" element={<Navigate to={PATH_ROUTES.ROOT} replace />} />
    </Routes>
  );
};

export default AppRouter;
