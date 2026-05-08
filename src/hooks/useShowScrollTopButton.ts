import { useEffect, useState, useRef } from "react";

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
      setIsShow(scrollPosition > 700);
      console.log(scrollPosition);

      setTimeout(() => {
        isThrottledRef.current = false;
      }, 500);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [hasVideos, ref]);

  return { isShow, handleScrollToTop };
};
