import React from "react";
import closeEye from "../Front-End/assets/images/icons8-closed-eye-24.png";
import openEye from "../Front-End/assets/images/icons8-eye-24.png";
const Singin = () => {
  return (
    <div className="col-4 signin">
      <form>
        <div className="mb-3">
          <label for="username" className="form-label">
            نام کاربری
          </label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            رمز عبور
          </label>
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
        >
          ثبت نام کنید
        </span>
      </div>
    </div>
  );
};
export default Singin;
