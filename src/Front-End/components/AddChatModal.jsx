import React, { useState } from "react";
import ImageInput from "./ImageInput";
import defaultImage from "../assets/images/173-1731325_person-icon-png-transparent-png.png";

const AddChatModal = () => {
  const [type, setType] = useState();
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
  return (
    <div>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="private"
            onClick={(e) => setType("private")}
          />
          <label className="form-check-label" for="private">
            چت شخصی
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="group"
            onClick={(e) => setType("group")}
            checked
          />
          <label className="form-check-label" for="group">
            گروه
          </label>
        </div>
      </div>
      {type == "private" ? (
        <div>
          <div>کاربر</div>
        </div>
      ) : (
        <div>
          <div>کاربرها</div>
          <div class="mb-3 row">
            <label for="inputname" class="col-sm-2 col-form-label">
              اسم
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputname" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddChatModal;
