import React, { useEffect, useState } from "react";
import { apiHandler, formApiHandler } from "../utilities/apihandler";
import ImageInput from "./ImageInput";
import defaultImage from "../assets/images/173-1731325_person-icon-png-transparent-png.png";

const AddChatModal = () => {
  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  function fileChangeHandler(event) {
    formApiHandler(
      "upload",
      {
        files: event.target.files[0],
      },
      true
    ).then((res) => {
      if (res.data.status) {
        setFileId(res.data.result.answer[0].id);
      }
    });
  }
  useEffect(() => {
    apiHandler("chats/get-users").then((res) =>
      setUsers(
        res.data.result.data.map((value) => ({ ...value, status: false }))
      )
    );
  }, []);
  console.log(users);
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
                <div className="form-check">
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
                <div className="form-check">
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
                <div className="users">
                  {users.map((value) => {
                    return (
                      <div
                        key={value.id}
                        className="user col-12"
                        onClick={(e) =>
                          setUsers((user) =>
                            user.id == value.id
                              ? { ...user, status: !user.status }
                              : user
                          )
                        }
                      >
                        <div className="name">{value.username}</div>
                        <div className="profile_pic">
                          <img src={value.path} alt="profile_pic" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : type == "group" ? (
                <div>
                  <div className="users">
                    {users.map((value) => {
                      return (
                        <div
                          key={value.id}
                          className="user col-12"
                          onClick={(e) =>
                            setUsers((user) =>
                              user.id == value.id
                                ? { ...user, status: !user.status }
                                : user
                            )
                          }
                        >
                          <div className="name">{value.username}</div>
                          <div className="profile_pic">
                            <img src={value.path} alt="profile_pic" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
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
                  <div className="mb-3 row">
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
