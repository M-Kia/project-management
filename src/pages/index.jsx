import Login from "./login";

import { MessangerContextProvider } from "../Front-End/context/MessangerContext";

export default function () {
  return (
    <>
      <MessangerContextProvider>
        <div
          className="row"
          style={{ margin: "0px", justifyContent: "center" }}
        >
          <Login />
        </div>
      </MessangerContextProvider>
    </>
  );
}
