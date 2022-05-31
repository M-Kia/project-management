import React, { useContext } from "react";
import reply from "../../assets/images/icons8-left-2-24.png";
import MessangerContext from "../../context/MessangerContext";
import menu from "../../assets/images/icons8-menu-24.png";
const ShowMessage = ({ messages }) => {
  const { replyId, setReplyId, chat } = useContext(MessangerContext);
  const data = [
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
      time: "12:48",
      sender: "hediem",
      id: 1,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ",
      time: "12:48",
      sender: "m_kia",
      id: 2,
    },
    {
      text: "لورم ایپسوم متن ساختگی با  ",
      time: "12:48",
      sender: "hediem",
      id: 3,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله ",
      time: "12:48",
      sender: "hediem",
      id: 4,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ",
      time: "12:48",
      sender: "m_kia",
      id: 5,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و ",
      time: "12:48",
      sender: "hediem",
      id: 6,
    },
    {
      text: "لورم ایپسوم متن ساختگی با  ",
      time: "12:48",
      sender: "m_kia",
      id: 7,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله ",
      time: "12:48",
      sender: "hediem",
      id: 8,
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ",
      time: "12:48",
      sender: "m_kia",
      id: 9,
    },
  ];
  if (messages.length != 0)
    return (
      <div className="showMessage">
        {messages.map((value, index) => {
          if (value.type == 0) {
            return (
              <div
                className={`${
                  value.sender.username == "hediem" ? "me" : "person"
                }`}
              >
                {value.sender.profile != "" && chat.type != 0 ? (
                  <div className="round">
                    <img src={value.sender.profile} alt="profilePic" />
                  </div>
                ) : (
                  <div
                    className={`round empty ${index % 2 != 0 ? "odd" : "even"}`}
                  ></div>
                )}
                <div key={index} className="card">
                  {value.sender.username != "hediem" ? (
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
                  value.sender.username == "hediem" ? "me" : "person"
                }`}
              >
                {value.sender.profile != "" && chat.type != 0 ? (
                  <div className="round">
                    <img src={value.sender.profile} alt="profilePic" />
                  </div>
                ) : (
                  <div
                    className={`round empty ${index % 2 != 0 ? "odd" : "even"}`}
                  ></div>
                )}

                <div key={index} className="card todo">
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
