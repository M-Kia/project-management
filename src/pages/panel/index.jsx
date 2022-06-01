import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Front-End/components/panel/SideBar";
import ShowPage from "../../Front-End/components/panel/ShowPage";
import MessangerContext, { MessangerContextProvider } from "../../Front-End/context/MessangerContext";
// import useInterval from "../../Front-End/components/common/TimeInterval";
export default function Panel() {
  const { updater } = useContext(MessangerContext);
  // const [time, setTime] = useState(null);

  // useInterval(() => {});
  // console.log(chats);
  return (
    <MessangerContextProvider>
      <div className="row main">
        <SideBar />
        <ShowPage />
      </div>
    </MessangerContextProvider>
  );
}
