import React from "react";
import SideBar from "../../Front-End/components/SideBar";
import ShowPage from "../../Front-End/components/ShowPage";
const Panel = () => {
  return (
    <div className="row" style={{ margin: "0px", justifyContent: "center" }}>
      <SideBar />
      <ShowPage />
    </div>
  );
};

export default Panel;
