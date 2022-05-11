import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./login.scss";
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <div dir="rtl">
      <Component {...pageProps} />
    </div>
  );
}
