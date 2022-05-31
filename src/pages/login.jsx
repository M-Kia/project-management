import React, { useState } from "react";
import pic from "../Front-End/assets/images/blog-wp-login.png";
import Signup from "../Front-End/components/login/signup";
import Signin from "../Front-End/components/login/signin";
const Login = () => {
  const [showFirst, setShowFirst] = useState(false);
  return (
    <>
      <div className="col-4 col-md-6">
        <img
          src={pic.src}
          alt="picture login"
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
