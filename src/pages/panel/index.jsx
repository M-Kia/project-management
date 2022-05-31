import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Front-End/components/panel/SideBar";
import ShowPage from "../../Front-End/components/panel/ShowPage";
import { apiHandler } from "../../Front-End/utilities/apihandler.ts";
import MessangerContext from "../../Front-End/context/MessangerContext";
// import useInterval from "../../Front-End/components/common/TimeInterval";
const Panel = () => {
  const { updater } = useContext(MessangerContext);
  const [chats, setChats] = useState([]);
  // const [time, setTime] = useState(null);

  // useInterval(() => {});
  useEffect(() => {
    apiHandler("chats", { userId: 1 }, "get").then((res) =>
      setChats(res.data.result)
    );
  }, [updater]);
  // console.log(chats);
  return (
    <div className="row main">
      <SideBar chats={chats} />
      <ShowPage />
    </div>
  );
};

export default Panel;
