import React, { useState, useContext } from "react";

import AuthenticationContext from "../../context/Authentication.tsx";
import MessangerContext from "../../context/MessangerContext";

import ImageInput from "../common/ImageInput";
import { apiHandler, imageUploader } from "../../utilities/apihandler.ts";

import editIcon from "../../assets/images/icons8-edit-64.png";
import submitIcon from "../../assets/images/icons8-submit-58.png";
import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";

const SettingModal = () => {
  const { userInfo, login } = useContext(AuthenticationContext);
  const { updater, setUpdater } = useContext(MessangerContext);
  const [edit, setEdit] = useState(false);
  const [temp, setTemp] = useState({
    user_id: userInfo.id,
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    username: userInfo.username,
    email: userInfo.email,
    profile: userInfo.profile,
    // password
  });
  const [update, setUpdate] = useState({
    user_id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    profile_img_id: "",
  });
  function fileChangeHandler(event) {
    imageUploader({
      files: event.target.files[0],
    }).then((res) => {
      if (res.data.status) {
        // setFileId(res.data.result[0].id.id);
        setTemp({ ...temp, profile: res.data.result[0].path });
        setUpdate({ ...update, profile: res.data.result[0].id.id });
      }
    });
  }
  const onClickHandlerEdit = () => {
    let obj = {
      // user_id: userInfo.id,
    };
    if (update.username !== "") {
      obj.username = update.username;
    }
    if (update.firstname !== "") {
      obj.firstname = update.firstname;
    }
    if (update.lastname !== "") {
      obj.lastname = update.lastname;
    }
    if (update.email !== "") {
      obj.email = update.email;
    }
    if (update.profile !== "") {
      obj.profile_img_id = update.profile;
    }
    apiHandler("users", obj, "patch").then((res) => {
      if (res.status) {
        setUpdater(!updater);
        setEdit(!edit);
        try {
          delete obj.user_id;
          delete obj.profile_img_id;
        } catch (err) {}
        setTemp({ ...temp, obj });
        login({ ...userInfo, ...obj, profile: temp.profile });
      }
    });
  };
  return (
    <div
      className="modal fade setting"
      id="settingModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center ">
                {edit ? (
                  <div
                    className="mb-3"
                    style={{
                      width: 150,
                      height: 150,
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
                ) : (
                  <div
                    className="profile_pic"
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                  >
                    <img src={temp.profile} alt="profilePic" />
                  </div>
                )}
                <div
                  style={{
                    fontSize: "20px",
                    marginRight: "15px",
                    fontWeight: "500",
                  }}
                >
                  {edit == true ? (
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userInfo.username}
                        value={temp.username}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setTemp({ ...temp, username: e.target.value });
                          setUpdate({ ...update, username: e.target.value });
                        }}
                      ></input>
                    </div>
                  ) : (
                    <div>{temp.username}</div>
                  )}
                </div>
              </div>
              {/* <div className="d-flex"> */}
              {edit ? (
                <div onClick={onClickHandlerEdit} style={{ cursor: "pointer" }}>
                  <img
                    src={submitIcon.src}
                    alt="submit"
                    width={35}
                    height={35}
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => setEdit(!edit)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={editIcon.src} alt="edit" width={30} height={30} />
                </div>
              )}
              {/* </div> */}
            </div>

            <div
              className={`d-flex ${edit ? "justify-content-between" : ""}`}
              style={{ marginTop: "15px" }}
            >
              <div
                style={{
                  fontSize: "20px",
                  marginRight: "15px",
                  fontWeight: "500",
                }}
              >
                {edit == true ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userInfo.firstname}
                    value={temp.firstname}
                    aria-label="firstname"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setTemp({ ...temp, firstname: e.target.value });
                      setUpdate({ ...update, firstname: e.target.value });
                    }}
                  ></input>
                ) : (
                  <div>{temp.firstname}</div>
                )}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                  fontWeight: "500",
                }}
              >
                {edit == true ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userInfo.lastname}
                    value={temp.lastname}
                    aria-label="lastname"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setTemp({ ...temp, lastname: e.target.value });
                      setUpdate({ ...update, lastname: e.target.value });
                    }}
                  ></input>
                ) : (
                  <div>{temp.lastname}</div>
                )}
              </div>
            </div>
            <div
              style={{
                fontSize: "20px",
                marginRight: "15px",
                marginTop: "15px",
                fontWeight: "500",
              }}
            >
              {edit == true ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder={userInfo.email}
                  value={temp.email}
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setTemp({ ...temp, email: e.target.value });
                    setUpdate({ ...update, email: e.target.value });
                  }}
                ></input>
              ) : (
                <div>{temp.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
