import React, { useEffect, useState } from "react";
import { apiHandler } from "../utilities/apihandler";
import ImageInput from "./ImageInput";
import defaultImage from "../assets/images/173-1731325_person-icon-png-transparent-png.png";

const AddChatModal = () => {
  const [type, setType] = useState("group");
  const [users, setUsers] = useState([]);
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
    apiHandler("chats/get-users").then((res) => setUsers(res.data.result.data));
  }, []);
  console.log(users);
  return (
    <div
      className="modal fade"
      id="addChatModal"
      tabindex="-1"
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
                <div classNameName="form-check">
                  <input
                    classNameName="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="private"
                    onClick={(e) => {
                      setType("private");
                    }}
                  />
                  <label classNameName="form-check-label" for="private">
                    چت شخصی
                  </label>
                </div>
                <div classNameName="form-check">
                  <input
                    classNameName="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="group"
                    onClick={(e) => {
                      setType("group");
                    }}
                  />
                  <label classNameName="form-check-label" for="group">
                    گروه
                  </label>
                </div>
              </div>
              <hr />
              {type == "private" ? (
                <div>
                  {users.map((value) => {
                    return (
                      <div className="d-flex">
                        <div>{value.username}</div>
                        <div>
                          <img src="" alt="profile_pic" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {users.map((value) => {
                    return (
                      <div className="d-flex">
                        <div>{value.username}</div>
                        <div>
                          <img src="" alt="profile_pic" />
                        </div>
                      </div>
                    );
                  })}
                  <hr />
                  <div className="mb-3 row">
                    <label for="inputname" className="col-sm-3 col-form-label">
                      اسم گروه
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputname"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddChatModal;
