import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ImageInput from "./ImageInput";
import { apihandler } from "../Front-End/utilities/apihandler";
import "react-toastify/dist/ReactToastify.css";
import closeEye from "../Front-End/assets/images/icons8-closed-eye-24.png";
import openEye from "../Front-End/assets/images/icons8-eye-24.png";
const Signup = ({ setShowFirst }) => {
  const [eye, setEye] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let regexUsername = /^[A-Za-z][A-Za-z0-9\_]{2,14}[A-Za-z0-9]$/;
  let regexEmail = /.+@.+\..+/;
  let regexPassword = /(?=.{8,})/;
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
    if (username == "" && password == "" && passwordConfirm == "") {
      toast.error("فیلد های ضروری را پر کنید", {
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
    if (username.trim() == "" || !regexUsername.test(username)) {
      toast.error("نام کاربری را به درستی وارد نمایید", {
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
    if (email.trim() == "" || !regexEmail.test(email)) {
      toast.error("ایمیل را به درستی وارد نمایید", {
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
    if (password.trim == "" || !regexPassword.test(password)) {
      toast.error("حداقل 8 رقم برای رمز عبور وارد کنید", {
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
    if (password != passwordConfirm) {
      toast.error("تکرار رمز عبور صحیح نمیباشد", {
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
    apihandler("auth/signup", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    });
  };
  return (
    <div className="col-12 col-md-4 col-lg-3 signup">
      <form>
        {/* <div
          className="mb-3"
          style={{
            width: 120,
            height: 120,
            fontSize: "20px",
            margin: "0px auto",
          }}
        >
          <ImageInput
            src="https://static.toiimg.com/photo/75503656.cms"
            radiusPercentage={50}
            width={300}
            height={300}
          />
        </div> */}
        <div className="mb-3">
          <label for="firstname" className="form-label">
            نام
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="lastname" className="form-label">
            نام خانوادگی
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="username" className="form-label">
            نام کاربری*
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label for="password" className="form-label">
              رمز عبور*
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="password2" className="form-label">
            تکرار رمز عبور*
          </label>
          <input
            type="password"
            className="form-control"
            id="password2"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary col-11 Mysubmit"
          onClick={onClickHandlerSubmit}
        >
          ثبت نام
        </button>
      </form>
      <div className="switch">
        حساب کاربری دارید؟{" "}
        <span
          style={{ cursor: "pointer", color: "#827397", fontWeight: "500" }}
          onClick={(e) => setShowFirst(false)}
        >
          وارد شوید
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Signup;
