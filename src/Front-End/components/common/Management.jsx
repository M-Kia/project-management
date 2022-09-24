import { useContext } from "react";
import { useRouter } from "next/router";

import AuthenticationContext from "../../context/Authentication";

export default function Management({ children }) {
  const router = useRouter();
  const auth = useContext(AuthenticationContext);

  if (router.pathname === "/test"){
    return <>{children}</>
  }

  if (auth.isLogin) {
    if (router.pathname === "/") {
      return <>{children}</>;
    } else {
      router.push("/");
    }
  } else {
    if (router.pathname === "/login") {
      return <>{children}</>;
    } else if (typeof document !== "undefined" && !auth.isLoading) {
      router.push("/login");
    }
  }
  return <></>;
}
