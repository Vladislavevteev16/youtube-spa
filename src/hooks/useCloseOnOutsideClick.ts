import { useEffect, type RefObject } from "react";

import { useAppDispatch } from "../redux/store/hooks";

import type { UnknownAction } from "@reduxjs/toolkit";

export const useCloseOnOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  action: () => unknown,
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleCloseRequestList = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        if (typeof action === "function") {
          const result = action();

          if (result && typeof result === "object" && "type" in result) {
            dispatch(result as UnknownAction);
          }
        }
      }
    };

    window.addEventListener("click", handleCloseRequestList);

    return () => window.removeEventListener("click", handleCloseRequestList);
  }, [dispatch, ref, action]);
};
