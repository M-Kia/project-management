import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { apiHandler } from "../utilities/apihandler.ts";

import closeEye from "../assets/images/icons8-closed-eye-24.png";
import openEye from "../assets/images/icons8-eye-24.png";
import useToastify from "../hooks/useToastify";
const Singin = ({ setShowFirst }) => {
  const router = useRouter();
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
      useToastify("فیلدها نمیتواند خالی باشد", "error");
      return;
    }
    apiHandler("auth/login", {
      username: username,
      password: password,
    }).then((res) => {
      if (res.data.status) {
        useToastify("ورود با موفقیت انجام شد", "success");
        router.push("/panel");
      } else {
        useToastify("مشکلی در ورود به وجود آمده است", "error");
      }
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
    </div>
  );
};
export default Singin;
