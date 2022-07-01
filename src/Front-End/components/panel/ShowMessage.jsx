import React, { useContext, useEffect, useState } from "react";

import AuthenticationContext from "../../context/Authentication.tsx";
import MessangerContext from "../../context/MessangerContext";
import { apiHandler } from "../../utilities/apihandler.ts";

import menu from "../../assets/images/icons8-menu-24.png";
import reply from "../../assets/images/icons8-left-2-24.png";
const ShowMessage = () => {
  const { setReplyId, chat, chats, updater, setUpdater } =
    useContext(MessangerContext);
  const { userInfo } = useContext(AuthenticationContext);

  const [todoStatus, setTodoStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const onClickHandler = (id, status) => {
    apiHandler(
      "chats/change-todo",
      {
        message_id: id,
        todo_status: status == 0 ? 1 : 0,
      },
      "patch"
    );
    setUpdater(!updater);
  };
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat, updater]);
  // console.log(userInfo);
  console.log(chat);
  if (messages.length != 0)
    return (
      <div className="showMessage">
        {messages.map((value, index) => {
          if (value.type == 0) {
            return (
              <div
                className={`${
                  value.sender.username == userInfo.username ? "me" : "person"
                }`}
                key={index}
              >
                {value.sender.profile != "" && chat.type != 0 ? (
                  <div className="round">
                    <img src={value.sender.profile} alt="profilePic" />
                  </div>
                ) : (
                  ""
                )}
                <div key={index} className="card">
                  {value.parent_id != 0 ? (
                    <div className="replyMessage">
                      {messages.map((val, ind) => {
                        return val.id == value.parent_id ? (
                          <>
                            <div className="sender">{val.sender.username}</div>
                            <div key={ind} className="textMessage">
                              {val.text}
                            </div>
                          </>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  {chat.type != 0 &&
                  value.sender.username != userInfo.username ? (
                    <div className="sender">{value.sender.username} </div>
                  ) : (
                    ""
                  )}
                  <span
                    className="reply"
                    onClick={(e) => setReplyId(value.id)}
                    onDoubleClick={(e) => setReplyId(0)}
                  >
                    <img src={reply.src} alt="reply" />
                  </span>
                  <div className="textMessage">{value.text}</div>
                  <div className="time">{value.tm}</div>
                </div>
              </div>
            );
          } else if (value.type == 1) {
            return (
              <div
                className={`${
                  value.sender.username == userInfo.username ? "me" : "person"
                }`}
                key={index}
              >
                {value.sender.profile != "" && chat.type != 0 ? (
                  <div className="round">
                    <img src={value.sender.profile} alt="profilePic" />
                  </div>
                ) : (
                  ""
                )}

                <div key={index} className="card todo">
                  {value.parent_id != 0 ? (
                    <div className="replyMessage">
                      {messages.map((val, ind) => {
                        return val.id == value.parent_id ? (
                          <>
                            <div className="sender">{val.sender.username}</div>
                            <div key={ind} className="textMessage">
                              {val.text}
                            </div>
                          </>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  {chat.type != 0 &&
                  value.sender.username != userInfo.username ? (
                    <div className="sender">{value.sender.username} </div>
                  ) : (
                    ""
                  )}
                  <span
                    className="reply"
                    onClick={(e) => setReplyId(value.id)}
                    onDoubleClick={(e) => setReplyId(0)}
                  >
                    <img src={reply.src} alt="reply" />
                  </span>
                  <div className="description">
                    <div className="textMessage">{value.text}</div>
                    <div className="check">
                      <div>
                        <img src={menu.src} alt="menu" />
                      </div>
                      <div className="todoStatus">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          aria-label="..."
                          checked={
                            value.todo_status == 0 || value.todo_status == null
                              ? false
                              : true
                          }
                          onClick={(e) =>
                            onClickHandler(value.id, value.todo_status)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="time">{value.tm}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
};

export default ShowMessage;
