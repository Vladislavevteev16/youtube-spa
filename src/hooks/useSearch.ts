import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [searchText, setSearchText] = useState<string>("");

  const [isHeartVisible, setIsHeartVisible] = useState<boolean>(false);

  const [isRecentRequestHidden, setIsRecentRequestHidden] =
    useState<boolean>(false);

  useEffect(
    () => () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    },
    [],
  );

  return {
    inputWrapperRef,
    searchText,
    setSearchText,
    isHeartVisible,
    setIsHeartVisible,
    isRecentRequestHidden,
    setIsRecentRequestHidden,
    debounceTimerRef,
  };
};
