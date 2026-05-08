import { useEffect, type RefObject } from "react";
import { useAppDispatch } from "../redux/store/hooks";

export const useCloseOnOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  action: unknown,
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleCloseRequestList = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        if (typeof action === "function") {
          if (action.name !== "actionCreator") {
            action();
          } else {
            dispatch(action());
          }
        }
      }
    };

    if (ref instanceof Object && ref.current) {
      window.addEventListener("click", handleCloseRequestList);
    }

    return () => window.removeEventListener("click", handleCloseRequestList);
  }, [dispatch, ref, action]);
};
