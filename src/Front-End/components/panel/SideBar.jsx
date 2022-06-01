import React, { useState, useContext } from "react";
import plus from "../../assets/images/icons8-plus-32.png";
import WithPortal from "../../hoc/WithPortal";
import AddChatModal from "./AddChatModal";
import moshtaghi from "../../assets/images/photo_2022-05-22_09-37-49.jpg";
import kia from "../../assets/images/photo_2022-05-22_09-38-07.jpg";
import niko from "../../assets/images/photo_2022-05-22_09-37-57.jpg";
import MessangerContext from "../../context/MessangerContext";
const SideBar = () => {
  const { chats, setChat } = useContext(MessangerContext);
  // const data = [
  //   {
  //     type: 1,
  //     name: "لیست وظایف",
  //     profileImg: "",
  //     numUnread: 1,
  //   },
  //   {
  //     type: 0,
  //     name: "نیکوفکر",
  //     profileImg: niko.src,
  //     numUnread: 1,
  //   },
  //   {
  //     type: 0,
  //     name: "کیاالحسینی",
  //     profileImg: kia.src,
  //     numUnread: 2,
  //   },
  //   {
  //     type: 0,
  //     name: "مشتاقی",
  //     profileImg: moshtaghi.src,
  //     numUnread: 3,
  //   },
  //   {
  //     type: 0,
  //     name: "فرانت اند",
  //     profileImg: "",
  //     numUnread: 2,
  //   },
  //   {
  //     type: 0,
  //     name: "بک اند",
  //     profileImg: "",
  //     numUnread: 3,
  //   },
  //   {
  //     type: 0,
  //     name: "UI and UX",
  //     profileImg: "",
  //     numUnread: 1,
  //   },
  //   {
  //     type: 0,
  //     name: "مدیریت",
  //     profileImg: "",
  //     numUnread: 2,
  //   },
  // ];

  return (
    <div
      className={`col-3 col-xxl-2 sidebar ${chats.length >= 9 ? "scroll" : ""}`}
    >
      {chats.map((value, index) => {
        return (
          <div className="card" key={index} onClick={() => setChat(value)}>
            <div className="right">
              <div>
                {value.logo == "" ? (
                  <div
                    className={`round empty ${index % 2 != 0 ? "odd" : "even"}`}
                  ></div>
                ) : value.logo == "" && value.members.length == 2 ? (
                  <div className="round">
                    <img src={value.members[1].profile} alt="profilePic" />
                  </div>
                ) : (
                  <div className="round">
                    <img src={value.logo} alt="profilePic" />
                  </div>
                )}
              </div>
              <div>
                {value.title == null ? value.members[1].username : value.title}
              </div>
            </div>
            {value.numberOfUnread == 0 ? (
              ""
            ) : (
              <div className="number">{value.numberOfUnread}</div>
            )}
          </div>
        );
      })}
      <button
        className="plus"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addChatModal"
      >
        <img src={plus.src} alt="add" />
      </button>
      <WithPortal>
        <AddChatModal />
      </WithPortal>
    </div>
  );
};

export default SideBar;
