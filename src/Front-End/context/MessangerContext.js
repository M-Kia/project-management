import React, { useState, useEffect, useContext } from "react";
import { apiHandler } from "../../Front-End/utilities/apihandler.ts";
import AuthenticationContext from "./Authentication.tsx";

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
  const { userInfo } = useContext(AuthenticationContext);

  useEffect(() => {
    apiHandler("chats", { userId: userInfo.id }, "get").then((res) =>
      setChats(res.data.result)
    );
  }, [updater, userInfo]);
  useEffect(() => {
    if (chat.id) {
      let cf = chats.find((value) => value.id == chat.id);
      setChat(cf);
    }
  }, [chats]);
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
