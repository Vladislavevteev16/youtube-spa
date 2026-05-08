import { VideoCard } from "../VideoCard";

import { useAppSelector } from "../../redux/store/hooks";

import {
  selectIsMobile,
  selectViewMode,
} from "../../redux/slices/viewModeSlice";
import { selectPaginatedVideos } from "../../redux/slices/paginationSlice";

import { ViewModeOptions } from "../../constants/enums";
import { selectVideos } from "../../redux/slices/videosSlice";

import s from "./index.module.css";

export const YouTubeGallery = () => {
  const videosForPagination = useAppSelector(selectPaginatedVideos);
  const allVideosFromShowListViewMode = useAppSelector(selectVideos);
  const isListViewMode =
    useAppSelector(selectViewMode) === ViewModeOptions.LIST;

  const isMobile = useAppSelector(selectIsMobile);

  const renderVideoItems =
    isListViewMode || isMobile
      ? allVideosFromShowListViewMode
      : videosForPagination;

  return (
    <div className={s.youTubeGalleryContainer}>
      <div className={`${s.grid} ${isListViewMode ? s.list : ""}`}>
        {renderVideoItems.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};
