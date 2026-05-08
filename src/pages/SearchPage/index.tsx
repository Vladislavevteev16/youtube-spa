import { useRef } from "react";

import { useAppSelector } from "../../redux/store/hooks";

import { selectHasVideos } from "../../redux/slices/videosSlice";

import { SearchBar } from "../../components/SearchBar";
import { YouTubeGallery } from "../../components/YouTubeGallery";
import { Paginator } from "../../components/Paginator";
import { ListGridSwitcher } from "../../components/ListGridSwitcher";

import { UpCircleOutlined } from "@ant-design/icons";
import { useShowScrollTopButton } from "../../hooks/useShowScrollTopButton";

import { useScrollToTop } from "../../hooks/useScrollToTop";

import s from "./index.module.css";

export const SearchPage = () => {
  const scrollContainerRef = useRef<HTMLElement>(null);

  const hasVideos = useAppSelector(selectHasVideos);

  useScrollToTop(scrollContainerRef);

  const { isShow, handleScrollToTop } = useShowScrollTopButton(
    scrollContainerRef,
    hasVideos,
  );

  return (
    <main
      ref={scrollContainerRef}
      className={`${s.pageWrapper} ${!hasVideos ? s.mainPage : ""}`}
    >
      <SearchBar />
      {hasVideos && <ListGridSwitcher />}
      {hasVideos && <YouTubeGallery />}
      {hasVideos && <Paginator />}
      {isShow && (
        <UpCircleOutlined className={s.upButton} onClick={handleScrollToTop} />
      )}
    </main>
  );
};
