import React from "react";

const SideBar = () => {
  return (
    // <div className="col-3 col-xxl-2 sidebar">
    //   {data.map((value, index) => {
    //     return (
    //       <div className="card" key={index}>
    //         <div className="right">
    //           <div>
    //             {value.profileImg == "" ? (
    //               <div
    //                 className={`round empty ${index % 2 != 0 ? "odd" : "even"}`}
    //               ></div>
    //             ) : (
    //               <div className="round">
    //                 <img src={value.profileImg} alt="profilePic" />
    //               </div>
    //             )}
    //           </div>
    //           <div>{value.name}</div>
    //         </div>
    //         <div className="number">{value.numUnread}</div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="col-3 col-xxl-2 sidebar">Sidebar</div>
  );
};

export default SideBar;
