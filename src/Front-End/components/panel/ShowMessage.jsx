import React, { useContext } from "react";
import reply from "../../assets/images/icons8-left-2-24.png";
import MessangerContext from "../../context/MessangerContext";
const ShowMessage = ({ messages }) => {
  const { replyId, setReplyId } = useContext(MessangerContext);
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
              <>
                <div
                  key={index}
                  className={`card ${
                    value.sender.username == "hediem" ? "me" : "person"
                  }`}
                >
                  {value.sender.username != "hediem" ? (
                    <div className="sender">{value.sender.username} </div>
                  ) : (
                    ""
                  )}
                  <span
                    className="reply"
                    onClick={(e) => setReplyId(value.index)}
                    onDoubleClick={(e) => setReplyId(0)}
                  >
                    <img src={reply.src} alt="reply" />
                  </span>
                  <div className="textMessage">{value.text}</div>
                  <div className="time">{value.tm}</div>
                </div>
              </>
            );
          } else if (value.type == 1) {
            return (
              <>
                <div
                  key={index}
                  className={`card todo ${
                    value.sender.username == "hediem" ? "me" : "person"
                  }`}
                >
                  {/* {value.sender.username != "hediem" ? (
              <div className="sender">{value.sender.username} </div>
            ) : (
              ""
            )} */}
                  {/* <span
              className="reply"
              onClick={(e) => setReplyId(value.index)}
              onDoubleClick={(e) => setReplyId(0)}
            >
              <img src={reply.src} alt="reply" />
            </span> */}
                  <div className="textMessage">{value.text}</div>
                  <div className="time">{value.tm}</div>
                </div>
              </>
            );
          }
        })}
      </div>
    );
};

export default ShowMessage;
