import React from "react";

const ShowMessage = () => {
  const data = [
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
      time: "12:48",
      sender: "hediem",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ",
      time: "12:48",
      sender: "m_kia",
    },
    {
      text: "لورم ایپسوم متن ساختگی با  ",
      time: "12:48",
      sender: "hediem",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله ",
      time: "12:48",
      sender: "hediem",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ",
      time: "12:48",
      sender: "m_kia",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و ",
      time: "12:48",
      sender: "hediem",
    },
    {
      text: "لورم ایپسوم متن ساختگی با  ",
      time: "12:48",
      sender: "m_kia",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله ",
      time: "12:48",
      sender: "hediem",
    },
    {
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ",
      time: "12:48",
      sender: "m_kia",
    },
  ];
  return (
    <div className="showMessage">
      {data.map((value, index) => {
        return (
          <div
            key={index}
            className={`card ${value.sender == "hediem" ? "me" : "person"}`}
          >
            {value.sender != "hediem" ? (
              <div className="sender">{value.sender}</div>
            ) : (
              ""
            )}
            <div className="textMessage">{value.text}</div>
            <div className="time">{value.time}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowMessage;
