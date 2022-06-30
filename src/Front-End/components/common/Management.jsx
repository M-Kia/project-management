import { useContext } from "react";
import { useRouter } from "next/router";

import AuthenticationContext from "../../context/Authentication";

export default function Management({ children }) {
  const router = useRouter();
  const auth = useContext(AuthenticationContext);

  if (router.pathname === "/login") {
    return <>{children}</>;
  } else if (auth.userInfo.id > 0) {
    return <>{children}</>;
  } else if (typeof document !== "undefined") {
    router.push("/login");
  }
  return <></>;
}
