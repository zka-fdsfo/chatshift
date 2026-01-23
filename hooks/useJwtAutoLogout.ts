import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import { updateToken } from "@/api/functions/admin.api";

export function useJwtAutoLogout() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    startTimer();

    return () => clearTimer();
  }, []);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();

    const token = getCookie(process.env.NEXT_APP_TOKEN_NAME!) as string | undefined;
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
    if (isRefreshingRef.current) return; // ⛔ prevent double calls
    isRefreshingRef.current = true;

    const shouldContinue = window.confirm(
      "Your session has expired. Do you want to continue?"
    );

    // if (!shouldContinue) {
    //   logout();
    //   return;
    // }

    // ------- START ----------
    
    function waitForUserResponse(timeout = 10000): Promise<boolean> {
        return new Promise((resolve) => {
          let responded = false;
      
          // Example: hook into some user event or your logic that sets shouldContinue
          const checkUser = (value: boolean) => {
            if (!responded) {
              responded = true;
              resolve(value);
            }
          };
      
          // Timeout fallback
          setTimeout(() => {
            if (!responded) {
              resolve(false); // treat as no response
            }
          }, timeout);
      
          // Expose checkUser so you can call it when user responds
          (window as any).userResponded = checkUser;
        });
      }
      
      // Usage
      (async () => {
        const shouldContinue = await waitForUserResponse(10000);
      
        if (!shouldContinue) {
          logout();
          window.location.reload();
          return;
        }
      
        // Continue your normal flow if user responded true
      })();
      
     // -------- END ---------

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
      startTimer(); // 🔁 restart timer safely
    } catch {
    //   logout();
    }
  };
}

function logout() {
    console.log("*************: Log Out :**************");
  
    // Clear access token cookie
    document.cookie = `${process.env.NEXT_APP_TOKEN_NAME}=; Max-Age=0; path=/`;
  
    // Clear refresh token cookie
    document.cookie = `${process.env.NEXT_REFRESH_TOKEN_NAME}=; Max-Age=0; path=/`;
  
    // Redirect to login/home
    window.location.href = "/";
  }
  


// function logout() {
//   console.log("*************: Log Out :**************");

//   // Clear cookies
//   document.cookie = `${process.env.NEXT_APP_TOKEN_NAME}=; Max-Age=0; path=/`;

//   window.location.href = "/";
// }
