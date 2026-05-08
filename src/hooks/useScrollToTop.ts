import { useEffect, type RefObject } from "react";

import { useAppSelector } from "../redux/store/hooks";

import { selectCurrentPage } from "../redux/slices/paginationSlice";

export const useScrollToTop = (ref: RefObject<HTMLElement | null>) => {
  const currentPageChangeValue = useAppSelector(selectCurrentPage);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [ref, currentPageChangeValue]);
};
