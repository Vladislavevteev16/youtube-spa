import { useEffect } from "react";

export const useScrollToTopFromTouchEnd = () => {
  useEffect(() => {
    const onClick = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    };

    window.addEventListener("touchend", onClick);
    return () => window.removeEventListener("touchend", onClick);
  }, []);
};
