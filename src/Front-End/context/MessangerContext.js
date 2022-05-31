import React, { useState, useContext } from "react";

const MessangerContext = React.createContext({
  show: "",
  updater: "",
  chat: "",
  setShow: (state) => {},
  setUpdater: (state) => {},
  setChat: (state) => {},
});
export default MessangerContext;

export const MessangerContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [chat, setChat] = useState("");
  return (
    <MessangerContext.Provider
      value={{ show, updater, chat, setShow, setUpdater, setChat }}
    >
      {children}
    </MessangerContext.Provider>
  );
};
