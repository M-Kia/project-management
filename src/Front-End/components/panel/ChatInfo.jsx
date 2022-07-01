import React, { useContext, useState } from "react";
import MessangerContext from "../../context/MessangerContext";
import AuthenticationContext from "../../context/Authentication.tsx";

import ImageInput from "../common/ImageInput";
import { apiHandler, imageUploader } from "../../utilities/apihandler.ts";
import editIcon from "../../assets/images/icons8-edit-64.png";
import submitIcon from "../../assets/images/icons8-submit-58.png";
import removeIcon from "../../assets/images/icons8-close-24.png";
import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";

const ChatInfo = () => {
  let admin;
  const { chat, updater, setUpdater } = useContext(MessangerContext);
  const { userInfo } = useContext(AuthenticationContext);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);

  // const [newName, setNewName] = useState(chat.title);
  // const [fileId, setFileId] = useState("");
  const [temp, setTemp] = useState({
    title: chat.title,
    profile: chat.profile,
  });
  const [update, setUpdate] = useState({
    title: "",
    profile: "",
  });
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
        console.log(res);
        // setFileId(res.data.result[0].id);
        setTemp({ ...temp, profile: res.data.result[0].path });
        setUpdate({ ...update, profile: res.data.result[0].id.id });
      }
    });
  }
  const onClickHandlerRemove = (id) => {
    console.log(id);
    console.log(chat.id);
    apiHandler(
      "chats/member",
      {
        user_id: id,
        chat_id: chat.id,
      },
      "delete"
    ).then((res) => {
      if (res.status) {
        setUpdater(!updater);
      }
    });
  };
  const onClickHandlerEdit = () => {
    let obj = {
      chat_id: chat.id,
    };
    if (update.title !== "") {
      obj.title = update.title;
    }
    if (update.profile !== "") {
      obj.profile_id = update.profile;
    }
    apiHandler("chats", obj, "patch").then((res) => {
      if (res.status) {
        setUpdater(!updater);
      }
    });
  };
  const AddHandler = () => {
    apiHandler("users", {}, "get").then((res) => {
      setUsers(
        res.data.result.map((value) => {
          if (value.id == userInfo.id) return { ...value, status: true };
          return { ...value, status: false };
        })
      );
    });
    setAdd(!add);
  };
  // console.log(temp);
  // console.log(update);
  // console.log(admin);
  // console.log(chat);
  // console.log(newName);
  console.log(users);
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
                        value={temp.title}
                        onChange={(e) => {
                          setTemp({ ...temp, title: e.target.value });
                          setUpdate({ ...update, title: e.target.value });
                        }}
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
                  اعضای گروه
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
                          onClick={(e) => onClickHandlerRemove(value.id)}
                        >
                          <img src={removeIcon.src} alt="removeIcon" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                <button
                  className="btn"
                  style={{
                    fontWeight: "500",
                    background: "rgb(225 211 225 / 43%)",
                  }}
                  onClick={AddHandler}
                >
                  اضافه کردن کاربر
                </button>
                {add ? (
                  <div className="d-flex flex-column">
                    {users.reduce((total, user) => {
                      if (chat.members.find((val) => val.id == user.id)) {
                        return total;
                      }
                      return (
                        <div
                          key={user.id}
                          className={`d-flex align-items-center col-12 ${
                            user.status ? "selected" : ""
                          }`}
                          onClick={(e) =>
                            setUsers((user) =>
                              user.map((val) =>
                                val.id == user.id
                                  ? { ...val, status: !val.status }
                                  : val
                              )
                            )
                          }
                        >
                          <div className="profile_pic member">
                            <img src={user.path} alt="profile_pic" />
                          </div>
                          <div
                            className="name"
                            style={{
                              fontSize: "20px",
                              marginRight: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {user.username}
                          </div>
                        </div>
                      );
                    }, [])}
                  </div>
                ) : (
                  ""
                )}
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
