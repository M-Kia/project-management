import { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { apiHandler } from "../utilities/apihandler";

import Loader from "../utilities/Loader.jsx";

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
  isLoading: boolean;
  userInfo: UserInfo;
  login: (userInformation: UserInfo) => void;
  logout: () => void;
}>({
  isLogin: true,
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(false);

  function changeLoading(loading: boolean): void {
    setIsLoading(loading);
  }

  function login(userInformation: UserInfo) {
    setUserInfo(userInformation);
    Cookie.set("token", userInformation.token);
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
    Cookie.set("token", null);
  }

  async function checkLoginInfo() {
    let token = Cookie.get("token");
    if (token) {
      let res = await apiHandler("check-login", { token }, "post");
      if (res.data.status) {
        login(res.data.data);
      } else {
        Cookie.set("token", null);
      }
    }
  }

  useEffect(() => {
    checkLoginInfo();
  }, []);
  // console.log("userInfo :>> " , userInfo);

  return (
    <AuthenticationContext.Provider
      value={{ userInfo, isLoading, login, logout, changeLoading }}
    >
      {isLoading ? <Loader /> : null}
      {children}
    </AuthenticationContext.Provider>
  );
}
