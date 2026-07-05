import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const getAvatarPlaceholder = (name: string): string => {
  if (!name) return "U";
  const words = name.trim().split(/\s+/);

  if (words.length >= 2) {
    const firstInitial = words[0].charAt(0);
    const lastInitial = words[words.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  return words[0].substring(0, 2).toUpperCase();
};

const MainLayout: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
    if (confirmLogout) {
      logout();
    }
  };

  const avatarText = user ? getAvatarPlaceholder(user.name) : "US";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent tracking-tight">
            ApexDigital{" "}
            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200/60 ml-1">
              Portal
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-semibold text-slate-800">
              {user?.name || "Đang tải..."}
            </span>
            <span className="text-xs text-slate-400 font-medium">{user?.role || "Thành viên"}</span>
          </div>

          <div className="h-9 w-9 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 rounded-full flex items-center justify-center font-bold text-slate-700 text-xs tracking-wider shadow-inner select-none">
            {avatarText}
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="text-sm font-medium text-slate-600 hover:text-rose-600 px-3 py-2 rounded-xl hover:bg-rose-50/50 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
