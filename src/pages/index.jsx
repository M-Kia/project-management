import Login from "./login";

import { MessangerContextProvider } from "../Front-End/context/MessangerContext";
import { AuthenticationProvider } from "../Front-End/context/Authentication.tsx";
export default function () {
  return (
    <>
      <AuthenticationProvider>
        <MessangerContextProvider>
          <div
            className="row"
            style={{ margin: "0px", justifyContent: "center" }}
          >
            <Login />
          </div>
        </MessangerContextProvider>
      </AuthenticationProvider>
    </>
  );
}
