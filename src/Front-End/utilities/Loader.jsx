import { CommonLoading } from "react-loadingg";
export default function Loader() {
  return (
    <>
      <div
        className="loader-container"
        style={{
          position: "fixed",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          overflow: "hidden",
          backgroundColor: "rgba(247,234,219, 0.52)",
          zIndex: 5,
        }}
      >
        <CommonLoading color={"#ff938a"} />
      </div>
    </>
  );
}
