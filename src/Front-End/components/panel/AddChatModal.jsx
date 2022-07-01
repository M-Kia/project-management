import React, { useContext, useEffect, useState } from "react";

import AuthenticationContext from "../../context/Authentication.tsx";
import MessangerContext from "../../context/MessangerContext";

import { apiHandler, imageUploader } from "../../utilities/apihandler.ts";
import ImageInput from "../common/ImageInput";
import toastify from "../../utilities/toustify.ts";

import defaultImage from "../../assets/images/173-1731325_person-icon-png-transparent-png.png";

const AddChatModal = () => {
  const { updater, setUpdater } = useContext(MessangerContext);
  const { userInfo } = useContext(AuthenticationContext);

  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const [fileId, setFileId] = useState(0);
  const [groupName, setGroupName] = useState("");
  let ids = users.reduce((total, value) => {
    if (!value.status) return total;
    if (total == "") return total + value.id;
    return total + "," + value.id;
  }, "");
  function fileChangeHandler(event) {
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
  const onClickHandlerSubmit = () => {
    if (type == "group" && groupName == "") {
      toastify("اسم گروه را وارد کنید", "error");
      return;
    }
    if (type == "group" && ids.length < 3) {
      toastify("کاربران را انتخاب کنید", "error");
      return;
    } else if (type == "private" && ids.length < 2) {
      toastify("کاربران را انتخاب کنید", "error");
      return;
    }
    // console.log("ids in api", ids);
    apiHandler("chats", {
      userIds: ids,
      ownerId: userInfo.id,
      profile_id: fileId,
      title: groupName,
      type: type == "private" ? 0 : 1,
    }).then((res) => (res.data.status ? setUpdater(!updater) : ""));
  };
  useEffect(() => {
    apiHandler("users", {}, "get").then((res) =>
      setUsers(
        res.data.result.map((value) => {
          if (value.id == userInfo.id) return { ...value, status: true };
          return { ...value, status: false };
        })
      )
    );
  }, []);
  // console.log(users);
  // console.log("ids", ids);
  return (
    <div
      className="modal fade addChat"
      id="addChatModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              ساخت چت
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ margin: "0px" }}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div>
                <div className="form-check col-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="private"
                    onClick={(e) => {
                      setType("private");
                    }}
                  />
                  <label className="form-check-label" htmlFor="private">
                    چت شخصی
                  </label>
                </div>
                <div className="form-check col-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="group"
                    onClick={(e) => {
                      setType("group");
                    }}
                  />
                  <label className="form-check-label" htmlFor="group">
                    گروه
                  </label>
                </div>
              </div>
              <hr />
              {type == "private" ? (
                <div>
                  <div className="users">
                    {users.map((value) =>
                      value.id != userInfo.id ? (
                        <div
                          key={value.id}
                          className={`user col-12 ${
                            value.status ? "selected" : ""
                          }`}
                          onClick={(e) =>
                            setUsers((user) =>
                              user.map((val) =>
                                val.id == value.id
                                  ? { ...val, status: !val.status }
                                  : val
                              )
                            )
                          }
                        >
                          <div className="name">{value.username}</div>
                          <div className="profile_pic">
                            <img src={value.path} alt="profile_pic" />
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                  <div className="create">
                    <div
                      className="btn btn-primary"
                      onClick={onClickHandlerSubmit}
                    >
                      ایجاد چت
                    </div>
                  </div>
                </div>
              ) : type == "group" ? (
                <div>
                  <div className="users">
                    {users.map((value) =>
                      value.id != userInfo.id ? (
                        <div
                          key={value.id}
                          className={`user col-12 ${
                            value.status ? "selected" : ""
                          }`}
                          onClick={(e) =>
                            setUsers((user) =>
                              user.map((val) =>
                                val.id == value.id
                                  ? { ...val, status: !val.status }
                                  : val
                              )
                            )
                          }
                        >
                          <div className="name">{value.username}</div>
                          <div className="profile_pic">
                            <img src={value.path} alt="profile_pic" />
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                  <hr />
                  <div className="create">
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
                    <div className="mb-3 row ">
                      <label
                        htmlFor="inputname"
                        className="col-sm-3 col-form-label"
                      >
                        اسم گروه
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          id="inputname"
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className="btn btn-primary"
                      onClick={onClickHandlerSubmit}
                    >
                      ایجاد گروه
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddChatModal;
