import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../Front-End/components/SideBar";
import ShowPage from "../../Front-End/components/ShowPage";
import { apiHandler } from "../../Front-End/utilities/apihandler.ts";
import MessangerContext from "../../Front-End/context/MessangerContext";
const Panel = () => {
  const { updater } = useContext(MessangerContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    apiHandler("chats", { userId: 1 },"get").then((res) =>
      setChats(res.data.result)
    );
  }, [updater]);
  // console.log(chats);
  return (
    <div className="row main">
      <SideBar chats={chats} />
      <ShowPage chats={chats} />
    </div>
  );
};

export default Panel;
