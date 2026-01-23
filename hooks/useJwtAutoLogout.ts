import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import { updateToken } from "@/api/functions/admin.api";
import { useSessionConfirm } from "@/components/SessionConfirmProvider";

const CHECK_INTERVAL = 30_000; // check token every 30s
const MODAL_AUTO_CLOSE = 10_000; // 10s auto-close modal

export function useJwtAutoLogout() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);
  const { confirm } = useSessionConfirm();

  useEffect(() => {
    startTimer();
    startInterval();

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimer();
      clearIntervalCheck();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Recheck token if tab becomes active
  const handleVisibility = () => {
    if (typeof window === "undefined") return;
    if (document.visibilityState === "visible") {
      startTimer();
      checkNow();
    }
  };

  // Clear main timeout
  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Clear interval
  const clearIntervalCheck = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Periodic check
  const startInterval = () => {
    clearIntervalCheck();
    intervalRef.current = setInterval(checkNow, CHECK_INTERVAL);
  };

  // Check token immediately
  const checkNow = () => {
    const token = getCookie(process.env.NEXT_APP_TOKEN_NAME!);
    if (!token) return;

    try {
      const { exp }: { exp: number } = jwtDecode(token);
      if (exp * 1000 <= Date.now()) {
        onTokenExpired();
      }
    } catch {
      logout();
    }
  };

  // Timer for exact expiry
  const startTimer = () => {
    clearTimer();
    const token = getCookie(process.env.NEXT_APP_TOKEN_NAME!);
    if (!token) return;

    try {
      const { exp }: { exp: number } = jwtDecode(token);
      const timeLeft = exp * 1000 - Date.now();

      if (timeLeft <= 0) {
        onTokenExpired();
        return;
      }

      timeoutRef.current = setTimeout(onTokenExpired, timeLeft);
    } catch {
      logout();
    }
  };

  const onTokenExpired = async () => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;

    if (typeof window === "undefined") return;

    // Check if modal was already shown (skip if tab closed & reopened)
    // alert("Tab count: " + tabcount);
    // const popupShown = localStorage.getItem("session-popup-shown");
    // if (popupShown) {
    //   logout();
    //   return;
    // }

    const TAB_COUNT_KEY = "app-open-tabs";
    const tabcount = localStorage.getItem(TAB_COUNT_KEY);
    const count = Number(tabcount);

    if (isNaN(count) || count < 2) {
      logout();
      return;
    }

    // localStorage.setItem("session-popup-shown", "true");

    // Show modal, auto-close after 10s
    const shouldContinue = await confirm(MODAL_AUTO_CLOSE);

    if (shouldContinue) {
      localStorage.removeItem("session-popup-shown");
    } else {
      logout();
      return;
    }

    try {
      const data = await updateToken();
      setCookieClient(process.env.NEXT_APP_TOKEN_NAME!, data.jwtToken);
      setCookieClient(process.env.NEXT_REFRESH_TOKEN_NAME!, data.refreshToken);

      isRefreshingRef.current = false;
      startTimer(); // restart timer safely
    } catch {
      logout();
    }
  };
}

function logout() {
  if (typeof window === "undefined") return;

  console.log("🚪 Logging out...");
  document.cookie = `${process.env.NEXT_APP_TOKEN_NAME}=; Max-Age=0; path=/`;
  document.cookie = `${process.env.NEXT_REFRESH_TOKEN_NAME}=; Max-Age=0; path=/`;

  window.location.href = "/";
}
