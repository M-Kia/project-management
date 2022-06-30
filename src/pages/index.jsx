import React from "react";
import SideBar from "../Front-End/components/panel/SideBar";
import ShowPage from "../Front-End/components/panel/ShowPage";

export default function Panel() {
  return (
    <div className="row main">
      <SideBar />
      <ShowPage />
    </div>
  );
}
