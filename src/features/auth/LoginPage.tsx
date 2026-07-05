import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { PATH_ROUTES } from "@/routes/paths";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { login, loading, error } = useAuthStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login({ email, password });

    if (success) {
      navigate(PATH_ROUTES.ACCOUNT.OVERVIEW);
    }
  };

  return (
    <div className="space-y-6 text-center max-w-sm mx-auto">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent tracking-tight">
          ApexDigital
        </h1>
        <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200/60">
          Portal
        </span>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 px-3.5 py-2.5 rounded-xl text-xs font-medium text-left">
          {error}
        </div>
      )}

      <form className="space-y-5 text-left" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Địa chỉ Email
          </label>
          <input
            id="email"
            type="email"
            required
            disabled={loading}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="admin@banking.com"
            className="w-full text-xs text-slate-900 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition duration-200 disabled:opacity-60"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
              Mật khẩu
            </label>
            <a
              href="#forgot"
              className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 transition"
            >
              Quên mật khẩu?
            </a>
          </div>
          <input
            id="password"
            type="password"
            required
            disabled={loading}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full text-xs text-slate-900 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition duration-200 disabled:opacity-60 tracking-widest"
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md transition"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-xs text-slate-500 select-none cursor-pointer"
          >
            Ghi nhớ thiết bị này
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Đang xác thực bảo mật..." : "Đăng nhập"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
