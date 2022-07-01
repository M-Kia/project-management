import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ImageInput from "../common/ImageInput";
import { apiHandler, imageUploader } from "../../utilities/apihandler.ts";
import "react-toastify/dist/ReactToastify.css";
import closeEye from "../../assets/images/icons8-closed-eye-24.png";
import openEye from "../../assets/images/icons8-eye-24.png";
import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";
import toastify from "../../utilities/toustify.ts";

const Signup = ({ setShowFirst }) => {
  const [eye, setEye] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [fileId, setFileId] = useState("");
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
      toastify("فیلد های ضروری را پر کنید", "error");
      return;
    }
    if (username.trim() == "" || !regexUsername.test(username)) {
      toastify("نام کاربری را به درستی وارد نمایید", "error");
      return;
    }
    if (email.trim() == "" || !regexEmail.test(email)) {
      toastify(("ایمیل را به درستی وارد نمایید", "error"));
      return;
    }
    if (password.trim == "" || !regexPassword.test(password)) {
      toastify("حداقل 8 رقم برای رمز عبور وارد کنید", "error");
      return;
    }
    if (password != passwordConfirm) {
      toastify("تکرار رمز عبور صحیح نمیباشد", "error");
      return;
    }
    apiHandler("auth/signup", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      profile_img_id: fileId,
    }).then((res) => {
      if (res.data.status) {
        toastify("ثبت نام شما با موفقیت انجام شد", "success");
        setShowFirst(false);
      } else {
        toastify("مشکلی در ثبت نام شما به وجود آمده است", "error");
      }
    });
  };

  function fileChangeHandler(event) {
    // imageUploader(
    //   // "upload",
    //   {
    //     files: event.target.files[0],
    //   }
    // )
    imageUploader(
      // "upload",
      {
        files: event.target.files[0],
      }
    ).then((res) => {
      if (res.data.status) {
        setFileId(res.data.result[0].id);
      }
    });
  }
  return (
    <div className="col-12 col-md-4 col-lg-3 signup">
      <form>
        <div
          className="mb-3"
          style={{
            width: 120,
            height: 120,
            fontSize: "20px",
            margin: "0px auto",
          }}
        >
          <ImageInput
            src={defaultImage.src}
            radiusPercentage={50}
            width={300}
            height={300}
            onChangeHandler={fileChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
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
          <label htmlFor="lastname" className="form-label">
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
          <label htmlFor="username" className="form-label">
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
          <label htmlFor="email" className="form-label">
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
            <label htmlFor="password" className="form-label">
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
          <label htmlFor="password2" className="form-label">
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
          onClick={
            onClickHandlerSubmit
            // setTimeout(() => {
            //   setShowFirst(false);
            // }, 2000);
          }
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
    </div>
  );
};
export default Signup;
