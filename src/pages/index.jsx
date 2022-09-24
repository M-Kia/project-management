import React from "react";
import SideBar from "../Front-End/components/panel/SideBar";
import ShowPage from "../Front-End/components/panel/ShowPage";
import { MessangerContextProvider } from "../Front-End/context/MessangerContext";

export default function Panel() {
  return (
    <MessangerContextProvider>
      <div className="row main">
        <SideBar />
        <ShowPage />
      </div>
    </MessangerContextProvider>
  );
}
