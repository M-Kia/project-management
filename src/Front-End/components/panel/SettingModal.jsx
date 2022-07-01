import React, { useState, useContext } from "react";
import AuthenticationContext from "../../context/Authentication.tsx";

import ImageInput from "../common/ImageInput";

import editIcon from "../../assets/images/icons8-edit-64.png";
import submitIcon from "../../assets/images/icons8-submit-58.png";
import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";

const SettingModal = () => {
  const { userInfo } = useContext(AuthenticationContext);
  const [edit, setEdit] = useState(false);
  const onClickHandlerEdit = () => {};
  function fileChangeHandler(event) {
    imageUploader({
      files: event.target.files[0],
    }).then((res) => {
      if (res.data.status) {
        setFileId(res.data.result[0].id);
      }
    });
  }
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
              <div className="d-flex align-items-center">
                {edit ? (
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
                ) : (
                  <div
                    className="profile_pic"
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                  >
                    <img src={userInfo.profile} alt="profilePic" />
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
                        class="form-control"
                        placeholder={userInfo.username}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      ></input>
                      <div
                        onClick={onClickHandlerEdit}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={submitIcon.src}
                          alt="submit"
                          width={35}
                          height={35}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>{userInfo.username}</div>
                  )}
                </div>
              </div>
              <div
                onClick={(e) => setEdit(!edit)}
                style={{ cursor: "pointer" }}
              >
                <img src={editIcon.src} alt="edit" width={30} height={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
