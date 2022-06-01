import React, { useState, useEffect } from "react";
import { apiHandler } from "../../Front-End/utilities/apihandler.ts";

const MessangerContext = React.createContext({
  show: "",
  updater: "",
  chat: "",
  replyId: 0,
  setShow: (state) => {},
  setUpdater: (state) => {},
  setChat: (state) => {},
  setReplyId: (state) => {},
});
export default MessangerContext;

export const MessangerContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [replyId, setReplyId] = useState(0);
  
  
  useEffect(() => {
    apiHandler("chats", { userId: 1 }, "get").then((res) =>
      setChats(res.data.result)
    );
  }, [updater]);
  return (
    <MessangerContext.Provider
      value={{
        show,
        updater,
        chat,
        chats,
        replyId,
        setShow,
        setUpdater,
        setChat,
        setChats,
        setReplyId,
      }}
    >
      {children}
    </MessangerContext.Provider>
  );
};
