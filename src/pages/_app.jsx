import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";

import Management from "../Front-End/components/common/Management";

import { AuthenticationProvider } from "../Front-End/context/Authentication.tsx";
import { MessangerContextProvider } from "../Front-End/context/MessangerContext";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <div dir="rtl">
      <AuthenticationProvider>
        <MessangerContextProvider>
          <Management>
            <Component {...pageProps} />
          </Management>
          <ToastContainer />
        </MessangerContextProvider>
      </AuthenticationProvider>
    </div>
  );
}
