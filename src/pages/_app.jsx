import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <div dir="rtl">
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}
