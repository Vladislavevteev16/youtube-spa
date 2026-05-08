import { useEffect } from "react";

import type { AppDispatch } from "../redux/store";

import { setIsMobile } from "../redux/slices/viewModeSlice";

export const useMobileDetection = (dispatch: AppDispatch): void => {
  useEffect(() => {
    const handleResize = () => dispatch(setIsMobile(window.innerWidth <= 450));

    handleResize();
    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, [dispatch]);
};
