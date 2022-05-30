import React, { useState, useContext } from "react";

const MessangerContext = React.createContext({
  show: "",
  updater: "",
  setShow: (state) => {},
  setUpdater: (state) => {},
});
export default MessangerContext;

export const MessangerContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [updater, setUpdater] = useState(false);
  return (
    <MessangerContext.Provider value={{ show, updater, setShow, setUpdater }}>
      {children}
    </MessangerContext.Provider>
  );
};
