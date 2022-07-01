import React, { useState } from "react";
import pic from "../../assets/images/blog-wp-login.png";
import Signup from "./signup";
import Signin from "./signin";
const Login = () => {
  const [showFirst, setShowFirst] = useState(false);
  return (
    <>
      <div className="col-4 col-md-6">
        <img
          src={pic.src}
          alt="login"
          style={{ marginTop: "150px" }}
          className="col-7"
        />
      </div>
      {showFirst ? (
        <Signup setShowFirst={setShowFirst} />
      ) : (
        <Signin setShowFirst={setShowFirst} />
      )}
    </>
  );
};
export default Login;
