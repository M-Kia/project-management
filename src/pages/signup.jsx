import React from "react";
import closeEye from "../Front-End/assets/images/icons8-closed-eye-24.png";
import openEye from "../Front-End/assets/images/icons8-eye-24.png";
const Signup = () => {
  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <div className="col-4 signup">
      <form>
        <div className="mb-3">
          <label for="firstname" className="form-label">
            نام
          </label>
          <input type="text" className="form-control" id="firstname" />
        </div>
        <div className="mb-3">
          <label for="lastname" className="form-label">
            نام خانوادگی
          </label>
          <input type="text" className="form-control" id="lastname" />
        </div>
        <div className="mb-3">
          <label for="username" className="form-label">
            نام کاربری
          </label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            ایمیل
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
          />
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
        <div className="mb-3">
          <label for="password2" className="form-label">
            تکرار رمز عبور
          </label>
          <input type="password" className="form-control" id="password2" />
        </div>
        <button type="submit" className="btn btn-primary col-11 Mysubmit">
          ثبت نام
        </button>
      </form>
      <div className="switch">
        حساب کاربری دارید؟{" "}
        <span
          style={{ cursor: "pointer", color: "#827397", fontWeight: "500" }}
        >
          وارد شوید
        </span>
      </div>
    </div>
  );
};
export default Signup;
