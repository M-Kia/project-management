import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";
import { MessangerContextProvider } from "../Front-End/context/MessangerContext";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <div dir="rtl">
      <MessangerContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </MessangerContextProvider>
    </div>
  );
}
