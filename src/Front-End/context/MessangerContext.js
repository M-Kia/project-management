import React, { useState, useContext } from "react";

const MessangerContext = React.createContext({
  show: "",
  setShow: (state) => {},
});
export default MessangerContext;

export const MessangerContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <MessangerContext.Provider value={{ show, setShow }}>
      {children}
    </MessangerContext.Provider>
  );
};
