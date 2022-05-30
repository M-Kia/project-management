import React, { useState } from "react";

const ShowPage = () => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <div className="col-6 showpage row">
      <div className="title">Title</div>
      <input
        className="col-11 send"
        placeholder="نوشتن پیام..."
        onChange={(e) => setNewMessage(e.target.value)}
      />
    </div>
  );
};
export default ShowPage;
