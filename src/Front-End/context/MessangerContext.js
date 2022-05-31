import React, { useState, useContext } from "react";

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
  const [replyId, setReplyId] = useState(0);
  return (
    <MessangerContext.Provider
      value={{
        show,
        updater,
        chat,
        replyId,
        setShow,
        setUpdater,
        setChat,
        setReplyId,
      }}
    >
      {children}
    </MessangerContext.Provider>
  );
};
