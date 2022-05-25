import ShowPage from "../Front-End/components/ShowPage";
import SideBar from "../Front-End/components/SideBar";
import Login from "./login";
import moshtaghi from "../Front-End/assets/images/photo_2022-05-22_09-37-49.jpg";
import kia from "../Front-End/assets/images/photo_2022-05-22_09-38-07.jpg";
import niko from "../Front-End/assets/images/photo_2022-05-22_09-37-57.jpg";
import { MessangerContextProvider } from "../Front-End/context/MessangerContext";
export default function () {
  const data = [
    {
      type: 1,
      name: "لیست وظایف",
      profileImg: "",
      numUnread: 1,
    },
    {
      type: 0,
      name: "نیکوفکر",
      profileImg: niko.src,
      numUnread: 1,
    },
    {
      type: 0,
      name: "کیاالحسینی",
      profileImg: kia.src,
      numUnread: 2,
    },
    {
      type: 0,
      name: "مشتاقی",
      profileImg: moshtaghi.src,
      numUnread: 3,
    },
    {
      type: 0,
      name: "فرانت اند",
      profileImg: "",
      numUnread: 2,
    },
    {
      type: 0,
      name: "بک اند",
      profileImg: "",
      numUnread: 3,
    },
    {
      type: 0,
      name: "UI and UX",
      profileImg: "",
      numUnread: 1,
    },
    {
      type: 0,
      name: "مدیریت",
      profileImg: "",
      numUnread: 2,
    },
  ];
  return (
    <>
      <MessangerContextProvider>
        <div
          className="row"
          style={{ margin: "0px", justifyContent: "center" }}
        >
          {/* <SideBar data={data} />
          <ShowPage /> */}
          <Login />
        </div>
      </MessangerContextProvider>
    </>
  );
}
