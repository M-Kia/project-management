import React, { useContext, useEffect, useState } from "react";
import MessangerContext from "../context/MessangerContext";

const ShowPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState(0);
  const { chat } = useContext(MessangerContext);
  useEffect(() => {
    console.log(chat);
  }, [chat]);
  return (
    <div className="col-6 showpage row">
      <div className="title">Title</div>
      <div className="bottom">
        <div className="col-1 typeMessage">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              defaultChecked
              onClick={(e) => setTypeMessage(0)}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              N
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
              onClick={(e) => setTypeMessage(1)}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              T
            </label>
          </div>
        </div>
        <input
          className="col-10 send"
          placeholder="نوشتن پیام..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </div>
    </div>
  );
};
export default ShowPage;
