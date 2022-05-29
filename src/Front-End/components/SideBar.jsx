import React, { useEffect, useState } from "react";
import plus from "../assets/images/icons8-plus-32.png";
import WithPortal from "../hoc/WithPortal";
import { apiHandler } from "../utilities/apihandler";
import AddChatModal from "./AddChatModal";
const SideBar = () => {
  const [updater, setUpdater] = useState(false);
  const [chats, setChats] = useState();
  useEffect(() => {
    apiHandler("chats/get-chats", { userId: 1 }).then((res) =>
      console.log(res)
    );
  }, [updater]);
  return (
    <div className="col-3 col-xxl-2 sidebar">
      {/* {data.map((value, index) => {
        return (
          <div className="card" key={index}>
            <div className="right">
              <div>
                {value.profileImg == "" ? (
                  <div
                    className={`round empty ${index % 2 != 0 ? "odd" : "even"}`}
                  ></div>
                ) : (
                  <div className="round">
                    <img src={value.profileImg} alt="profilePic" />
                  </div>
                )}
              </div>
              <div>{value.name}</div>
            </div>
            <div className="number">{value.numUnread}</div>
          </div>
        );
      })} */}
      <button
        className="plus"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addChatModal"
      >
        <img src={plus.src} alt="add" />
      </button>
      <WithPortal>
        <AddChatModal updater={updater} setUpdater={setUpdater} />
      </WithPortal>
    </div>
    // <div className="col-3 col-xxl-2 sidebar">Sidebar</div>
  );
};

export default SideBar;
