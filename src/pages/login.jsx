import React from "react";
import pic from "../Front-End/assets/images/blog-wp-login.png";
import Signup from "./signup";
import Signin from "./signin";
const Login = () => {
  return (
    <>
      <div>
        <img src={pic} alt="picture login" />
      </div>
      <Signup />
      <Signin />
    </>
  );
};
export default Login;
