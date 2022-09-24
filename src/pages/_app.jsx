import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";

import Management from "../Front-End/components/common/Management";

import { AuthenticationProvider } from "../Front-End/context/Authentication.tsx";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <div dir="rtl">
      <AuthenticationProvider>
        <Management>
          <Component {...pageProps} />
        </Management>
        <ToastContainer />
      </AuthenticationProvider>
    </div>
  );
}
