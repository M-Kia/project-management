import React from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";

import { AuthenticationProvider } from "../Front-End/context/Authentication.tsx";
import MessangerContextProvider from "../Front-End/context/MessangerContext";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <div dir="rtl">
      <AuthenticationProvider>
        <MessangerContextProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </MessangerContextProvider>
      </AuthenticationProvider>
    </div>
  );
}
