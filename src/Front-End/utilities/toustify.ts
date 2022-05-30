import { toast } from "react-toastify";

export default function toastify(
  text: string,
  type: "error" | "success" | "info" | "warn" | "default" = "default"
) {
  if (type !== "default") {
    toast[type](text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
