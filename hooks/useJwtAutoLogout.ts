import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import { updateToken } from "@/api/functions/admin.api";
import { useSessionConfirm } from "@/components/SessionConfirmProvider";

const CHECK_INTERVAL = 30_000; // every 30s (safe)

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

  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      startTimer();
      checkNow();
    }
  };

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearIntervalCheck = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    clearIntervalCheck();
    intervalRef.current = setInterval(checkNow, CHECK_INTERVAL);
  };

  const checkNow = () => {
    const token = getCookie(process.env.NEXT_APP_TOKEN_NAME!) as
      | string
      | undefined;

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

  const startTimer = () => {
    clearTimer();

    const token = getCookie(process.env.NEXT_APP_TOKEN_NAME!) as
      | string
      | undefined;

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

    console.log("🔥 TOKEN EXPIRED");

    const shouldContinue = await confirm();

    if (!shouldContinue) {
      logout();
      return;
    }

    try {
      const data = await updateToken();

      setCookieClient(
        process.env.NEXT_APP_TOKEN_NAME!,
        data.jwtToken
      );
      setCookieClient(
        process.env.NEXT_REFRESH_TOKEN_NAME!,
        data.refreshToken
      );

      isRefreshingRef.current = false;
      startTimer();
    } catch {
      logout();
    }
  };
}

function logout() {
  console.log("🚪 LOGOUT");

  document.cookie = `${process.env.NEXT_APP_TOKEN_NAME}=; Max-Age=0; path=/`;
  document.cookie = `${process.env.NEXT_REFRESH_TOKEN_NAME}=; Max-Age=0; path=/`;

  window.location.href = "/";
}
