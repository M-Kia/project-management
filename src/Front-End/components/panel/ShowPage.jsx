import React, { useContext, useEffect, useState } from "react";
import MessangerContext from "../../context/MessangerContext";
import { apiHandler } from "../../utilities/apihandler.ts";
import background from "../../assets/images/brandi-redd-aJTiW00qqtI-unsplash.png";
import send from "../../assets/images/icons8-send-letter-50.png";
import ShowMessage from "./ShowMessage";
const ShowPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState(0);
  const { chat } = useContext(MessangerContext);
  useEffect(() => {}, [chat]);
  const onClickHandlerSend = () => {
    apiHandler(
      "messages",
      {
        userId: 1,
        chat_id: "",
        text: newMessage,
        type: typeMessage,
        reply_id: "",
      },
      "post"
    );
  };
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  if (chat != "")
    return (
      <div className="col-8 showpage mainCover row">
        <img
          src={background.src}
          alt="background"
          className="col-12 background"
        />
        <div className="onImage overlay"></div>
        <div className="onImage center">
          <div className="title">
            {chat.title == null ? chat.members[1].username : chat.title}
          </div>
          <div style={{ position: "absolute" }} className="col-12">
            <ShowMessage />
          </div>
          <div className="bottom">
            <div className="col-1 sendIcon" onClick={onClickHandlerSend}>
              <img src={send.src} alt="send" />
            </div>
            <textarea
              className="col-9 send"
              placeholder="نوشتن پیام..."
              onChange={(e) => setNewMessage(e.target.value)}
              onInput={(e) => auto_grow(this)}
            ></textarea>
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
          </div>
        </div>
      </div>
    );
  return (
    <div className="col-8 showpage mainCover row">
      <img
        src={background.src}
        alt="background"
        className="col-12 background"
      />
      <div className="onImage overlay"></div>
      <div className="onImage center">
        <div className="title"></div>
        <div className="text">یـک چت بــرای گفتــگو انتــخاب کنیـد </div>
      </div>
    </div>
  );
};
export default ShowPage;
