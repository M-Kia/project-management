import ShowPage from "../Front-End/components/ShowPage";
import SideBar from "../Front-End/components/SideBar";
import Login from "./login";
export default function () {
  return (
    <div className="row" style={{ margin: "0px", justifyContent: "center" }}>
      {/* <SideBar />
      <ShowPage /> */}
      <Login />
    </div>
  );
}
