import React, { useState } from "react";
import closeEye from "../Front-End/assets/images/icons8-closed-eye-24.png";
import openEye from "../Front-End/assets/images/icons8-eye-24.png";
const Singin = ({ setShowFirst }) => {
  const [eye, setEye] = useState(true);
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
  return (
    <div className="col-12 col-md-4 col-lg-4 signin">
      <form>
        <div className="mb-3">
          <label for="username" className="form-label">
            نام کاربری
          </label>
          <input type="text" className="form-control" id="username" />
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
            placeholder="حداقل 8 حرف"
          />
        </div>
        <button type="submit" className="btn btn-primary col-11 Mysubmit">
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
