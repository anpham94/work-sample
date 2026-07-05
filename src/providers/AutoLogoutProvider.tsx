import React, { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export const AutoLogoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout, initializeAuth } = useAuthStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isAuthenticated) {
      localStorage.setItem("login_timestamp", Date.now().toString());

      timerRef.current = setTimeout(() => {
        alert("Phiên đăng nhập của bạn đã hết hạn (15 phút). Vui lòng đăng nhập lại!");
        logout();
      }, INACTIVITY_TIMEOUT);
    }
  };

  useEffect(() => {
    const events: string[] = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

    if (isAuthenticated) {
      resetTimer();
      events.forEach((event) => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated]);

  return <>{children}</>;
};
