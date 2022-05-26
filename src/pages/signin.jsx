import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { apihandler } from "../Front-End/utilities/apihandler";

import closeEye from "../Front-End/assets/images/icons8-closed-eye-24.png";
import openEye from "../Front-End/assets/images/icons8-eye-24.png";
const Singin = ({ setShowFirst }) => {
  const [eye, setEye] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      setEye(false);
    } else {
      x.type = "password";
      setEye(true);
    }
  }
  const onClickHandlerSubmit = (e) => {
    e.preventDefault();
    if (username == "" && password == "") {
      toast.error("فیلدها نمیتواند خالی باشد", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    apihandler("auth/login", {
      username: username,
      password: password,
    });
  };
  return (
    <div className="col-12 col-md-4 col-lg-3 signin">
      <form>
        <div className="mb-3">
          <label for="username" className="form-label">
            نام کاربری
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label for="password" className="form-label">
              رمز عبور
            </label>
            {eye ? (
              <span>
                <img src={openEye.src} alt="openEye" onClick={showPassword} />
              </span>
            ) : (
              <span>
                <img src={closeEye.src} alt="closeEye" onClick={showPassword} />
              </span>
            )}
          </div>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary col-11 Mysubmit"
          onClick={onClickHandlerSubmit}
        >
          ورود
        </button>
      </form>
      <div className="switch">
        حساب کاربری ندارید؟{" "}
        <span
          style={{ cursor: "pointer", color: "#827397", fontWeight: "500" }}
          onClick={(e) => setShowFirst(true)}
        >
          ثبت نام کنید
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Singin;
