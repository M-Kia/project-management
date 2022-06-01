import { createContext, useState, useEffect } from "react";

type UserInfo = {
  id: number;
  token: "";
  firstname: string;
  lastname: string;
  username: string;
  mobile: string;
  email: string;
  profile: string;
};

const AuthenticationContext = createContext<{
  isLogin: boolean;
  userInfo: UserInfo;
  login: (userInformation) => void;
  logout: () => void;
}>({
  isLogin: true,
  userInfo: {
    id: 0,
    token: "",
    firstname: "",
    lastname: "",
    username: "",
    mobile: "",
    email: "",
    profile: "",
  },
  login: (userInformation) => {},
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
    mobile: "",
    email: "",
    profile: "",
  });

  function login(userInformation) {
    setUserInfo(userInformation);
  }

  function logout() {
    setUserInfo({
      id: 0,
      token: "",
      firstname: "",
      lastname: "",
      username: "",
      mobile: "",
      email: "",
      profile: "",
    });
  }

  return (
    <AuthenticationContext.Provider>{children}</AuthenticationContext.Provider>
  );
}
