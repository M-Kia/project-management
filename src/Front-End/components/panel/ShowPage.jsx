import React, { useContext, useEffect, useState } from "react";
import MessangerContext from "../../context/MessangerContext";
import { apiHandler } from "../../utilities/apihandler.ts";
import background from "../../assets/images/brandi-redd-aJTiW00qqtI-unsplash.png";
import send from "../../assets/images/icons8-send-letter-50.png";
import ShowMessage from "./ShowMessage";
import back from "../../assets/images/icons8-back-50.png";
const ShowPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(false);
  const { chat, replyId, updater, setUpdater, setChat } =
    useContext(MessangerContext);
  const onClickHandlerSend = () => {
    apiHandler(
      "messages",
      {
        userId: 2,
        chat_id: chat.id,
        text: newMessage,
        type: typeMessage,
        reply_id: replyId,
      },
      "post"
    ).then((res) => {
      if (res.status) {
        setUpdater(!updater);
        setNewMessage("");
      }
    });
  };
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
    if (element.scrollHeight > 120) setScrollHeight(true);
    else setScrollHeight(false);
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
            <div className="d-flex align-items-center">
              {chat.logo == "" ? (
                <div className="round empty"></div>
              ) : chat.logo == "" && chat.members.length == 2 ? (
                <div className="round">
                  <img src={chat.members[1].profile} alt="profilePic" />
                </div>
              ) : (
                <div className="round">
                  <img src={chat.logo} alt="profilePic" />
                </div>
              )}
              {chat.title == null ? chat.members[1].username : chat.title}
            </div>
            <div style={{ cursor: "pointer" }}>
              <img src={back.src} alt="back" onClick={(e) => setChat("")} />
            </div>
          </div>
          <div className="col-12 showMessageParent">
            <ShowMessage />
          </div>
          <div className="bottom">
            <div className="col-1 sendIcon" onClick={onClickHandlerSend}>
              <img src={send.src} alt="send" />
            </div>
            <textarea
              className={`col-9 send ${scrollHeight ? "scroll" : ""}`}
              placeholder="نوشتن پیام..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onInput={(e) => auto_grow(e.target)}
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
