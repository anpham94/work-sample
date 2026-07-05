import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-hidden">
      <div className="w-full max-w-md">
        <div className="bg-white py-8 px-6 shadow-2xl shadow-slate-100/70 rounded-2xl border border-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
