import { useEffect, useState, useRef } from "react";

const MIN_VALUE_SHOW_BTN = 700;
const DELAY = 500;

export const useShowScrollTopButton = (
  ref: React.RefObject<HTMLElement | null>,
  hasVideos: boolean,
) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleScrollToTop = () => {
    ref.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isThrottledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isThrottledRef.current) return;

      isThrottledRef.current = true;

      const scrollPosition = Number(ref.current?.scrollTop);
      setIsShow(scrollPosition > MIN_VALUE_SHOW_BTN);
      console.log(scrollPosition);

      setTimeout(() => {
        isThrottledRef.current = false;
      }, DELAY);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [hasVideos, ref]);

  return { isShow, handleScrollToTop };
};
