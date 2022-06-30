import { createContext, useState, useEffect } from "react";

type UserInfo = {
  id: number;
  token: "";
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  profile: string;
};

const AuthenticationContext = createContext<{
  isLogin: boolean;
  userInfo: UserInfo;
  login: (userInformation: UserInfo) => void;
  logout: () => void;
}>({
  isLogin: true,
  userInfo: {
    id: 0,
    token: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    profile: "",
  },
  login: (userInformation: UserInfo) => {},
  logout: () => {},
});

export default AuthenticationContext;

export function AuthenticationProvider({ children }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    token: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    profile: "",
  });

  function login(userInformation: UserInfo) {
    setUserInfo(userInformation);
  }

  function logout() {
    setUserInfo({
      id: 0,
      token: "",
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      profile: "",
    });
  }

  // console.log("userInfo :>> " , userInfo);
  
  return (
    <AuthenticationContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
