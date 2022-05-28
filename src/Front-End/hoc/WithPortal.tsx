import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function WithPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  });

  return mounted
    ? createPortal(<>{children}</>, document.getElementById("modals"))
    : null;
}
