import React, { useContext, useState } from "react";
import MessangerContext from "../../context/MessangerContext";
import AuthenticationContext from "../../context/Authentication.tsx";

import ImageInput from "../common/ImageInput";

import editIcon from "../../assets/images/icons8-edit-64.png";
import submitIcon from "../../assets/images/icons8-submit-58.png";
import removeIcon from "../../assets/images/icons8-close-24.png";
import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";

const ChatInfo = () => {
  let admin;
  const { chat } = useContext(MessangerContext);
  const { userInfo } = useContext(AuthenticationContext);
  const [edit, setEdit] = useState(false);

  chat.members.map((value) => {
    if (value.type == 2) {
      if (value.id == userInfo.id) {
        return (admin = true);
      } else {
        return (admin = false);
      }
    }
  });
  function fileChangeHandler(event) {
    imageUploader({
      files: event.target.files[0],
    }).then((res) => {
      if (res.data.status) {
        setFileId(res.data.result[0].id);
      }
    });
  }
  const onClickHandlerRemove = () => {};
  const onClickHandlerEdit = () => {};
  // console.log(admin);
  // console.log(chat);
  return (
    <div
      className="modal fade chatinfo"
      id="infoModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> */}
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
                    <img src={chat.logo} alt="profilePic" />
                  </div>
                )}

                <div
                  style={{
                    fontSize: "20px",
                    marginRight: "15px",
                    fontWeight: "500",
                  }}
                >
                  {admin && edit == true ? (
                    <div className="d-flex">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={chat.title}
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
                    <div>{chat.title}</div>
                  )}
                </div>
              </div>
              {admin ? (
                <div
                  onClick={(e) => setEdit(!edit)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={editIcon.src} alt="edit" width={30} height={30} />
                </div>
              ) : (
                ""
              )}
            </div>
            {chat.type == 1 ? (
              <div>
                <hr />
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  اعضای گروه:
                </div>
                {chat.members.map((value) => {
                  return (
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center members">
                        <div
                          className="profile_pic member"
                          data-bs-toggle="modal"
                          data-bs-target="#infoModal"
                        >
                          <img src={value.profile} alt="profilePic" />
                        </div>
                        <div
                          style={{
                            fontSize: "20px",
                            marginRight: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {value.username}
                        </div>
                        <span style={{ color: "#363062" }}>
                          {value.type == 2
                            ? " (owner) "
                            : value.type == 1
                            ? " (admin) "
                            : ""}
                        </span>
                      </div>
                      {admin && value.id != userInfo.id ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={onClickHandlerRemove}
                        >
                          <img src={removeIcon.src} alt="removeIcon" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
