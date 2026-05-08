import { useEffect } from "react";

import type { AppDispatch } from "../redux/store";

import { setIsMobile } from "../redux/slices/viewModeSlice";

const CHECK_MOBILE_VALUE = 450;

export const useMobileDetection = (dispatch: AppDispatch): void => {
  useEffect(() => {
    const handleResize = () =>
      dispatch(setIsMobile(window.innerWidth <= CHECK_MOBILE_VALUE));

    handleResize();
    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, [dispatch]);
};
