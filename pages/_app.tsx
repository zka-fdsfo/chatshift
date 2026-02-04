/* eslint-disable import/no-extraneous-dependencies */
// import EventListeners from "@/components/EventListener/EventListener";
import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/reduxtoolkit/store/store";
import { Toaster } from "sonner";
import { useJwtAutoLogout } from "@/hooks/useJwtAutoLogout";
import { SessionConfirmProvider } from "@/components/SessionConfirmProvider";
import JwtAutoLogoutHandler from "@/components/JwtAutoLogoutHandler";
import { useEffect } from "react";


/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      retry: 0
    }
  }
});

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
export default function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();


  // ----------- Code for auto logout is start here -----------
  // useJwtAutoLogout(); // ✅ no arguments
  const TAB_COUNT_KEY = "app-open-tabs";

function logout() {
  console.log("Logging out because last tab closed");

  document.cookie = `${process.env.NEXT_PUBLIC_APP_TOKEN_NAME}=; Max-Age=0; path=/`;
  document.cookie = `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME}=; Max-Age=0; path=/`;

  window.location.href = "/";
}



// useEffect(() => {
//   // ✅ TAB OPENED
//   const addTab = () => {
//     const count = Number(localStorage.getItem(TAB_COUNT_KEY) || "0");
//     localStorage.setItem(TAB_COUNT_KEY, String(count + 1));
//   };

//   // ✅ TAB CLOSED
//   const removeTab = () => {
//     const count = Number(localStorage.getItem(TAB_COUNT_KEY) || "1");
//     const next = Math.max(count - 1, 0);
//     localStorage.setItem(TAB_COUNT_KEY, String(next));

//     // 🔥 LAST TAB CLOSED → LOGOUT
//     if (next === 0) {
//       logout();
//     }
//   };

//   addTab();

//   window.addEventListener("beforeunload", removeTab);

//   return () => {
//     removeTab();
//     window.removeEventListener("beforeunload", removeTab);
//   };
// }, []);
    // ----------- Code for auto logout is end here -----------
  return (
    <Provider store={store}>
       {/* <SessionConfirmProvider> */}
       {/* <JwtAutoLogoutHandler /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <MuiThemeProvider>
              <CssBaseline />
              <EventListeners />
              <Toaster richColors position="bottom-left" />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </LocalizationProvider>
      {/* </SessionConfirmProvider> */}
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });

  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };

  return { ...appProps };
};
