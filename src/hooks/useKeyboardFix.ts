import { useEffect } from "react";

export const useKeyboardFix = () => {
  useEffect(() => {
    let scrollPosition = 0;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target;

      if (target !== null && "tagName" in target) {
        if (
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.tagName === "SELECT"
        ) {
          scrollPosition = window.scrollY;
        }
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target;
      if (target !== null && "tagName" in target) {
        if (
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.tagName === "SELECT"
        ) {
          setTimeout(() => {
            window.scrollTo({ top: scrollPosition, behavior: "smooth" });
          }, 50);
        }
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);
};
