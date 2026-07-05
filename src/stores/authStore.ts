import { create } from "zustand";
import { type LoginCredentials } from "@/services/authService";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  initializeAuth: () => void;
}

const SESSION_TIMEOUT_MS = 15 * 60 * 1000;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  initializeAuth: () => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user_info");
    const loginTimestamp = localStorage.getItem("login_timestamp");

    if (token && savedUser && loginTimestamp) {
      const now = Date.now();
      const timeElapsed = now - parseInt(loginTimestamp, 10);

      if (timeElapsed > SESSION_TIMEOUT_MS) {
        get().logout();
        return;
      }

      localStorage.setItem("login_timestamp", now.toString());
      set({
        accessToken: token,
        user: JSON.parse(savedUser) as User,
        isAuthenticated: true,
      });
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { email, password } = credentials;

      if (email === "phamminhan@gmail.com" && password === "123456") {
        const mockAccessToken = "mock-jwt-token-xyz-123456";
        const mockUser: User = {
          id: "usr-01",
          email: "admin@banking.com",
          name: "Phạm Minh An",
          role: "Admin",
        };

        const now = Date.now().toString();

        localStorage.setItem("access_token", mockAccessToken);
        localStorage.setItem("user_info", JSON.stringify(mockUser));
        localStorage.setItem("login_timestamp", now);

        set({
          accessToken: mockAccessToken,
          user: mockUser,
          isAuthenticated: true,
          loading: false,
        });

        return true;
      } else {
        set({
          error: "Tài khoản hoặc mật khẩu không chính xác (Tĩnh).",
          loading: false,
        });
        return false;
      }
    } catch {
      set({
        error: "Có lỗi xảy ra trong quá trình xác thực.",
        loading: false,
      });
      return false;
    }
  },

  // login: async (credentials) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await authService.login(credentials);
  //     const { accessToken, user } = response;
  //     const now = Date.now().toString();

  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("user_info", JSON.stringify(user));
  //     localStorage.setItem("login_timestamp", now);

  //     set({
  //       accessToken,
  //       user,
  //       isAuthenticated: true,
  //       loading: false,
  //     });
  //     return true;
  //   } catch (err) {
  //     console.error("Lỗi đăng nhập:", err);
  //     let errorMessage = "Tài khoản hoặc mật khẩu không chính xác.";

  //     if (err instanceof AxiosError && err.response?.data) {
  //       if (typeof err.response.data === "string") {
  //         errorMessage = err.response.data;
  //       }
  //     }

  //     set({ error: errorMessage, loading: false });
  //     return false;
  //   }
  // },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("login_timestamp");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
