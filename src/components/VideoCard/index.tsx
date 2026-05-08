import { memo, type FC } from "react";

import ReactPlayer from "react-player";

import { useAppSelector } from "../../redux/store/hooks";
import { selectViewMode } from "../../redux/slices/viewModeSlice";

import { ViewModeOptions } from "../../constants/enums";

import type { VideoModel } from "../../utils/convertMapToModel";

import s from "./index.module.css";

type VideoCardProps = {
  video: VideoModel;
};

export const VideoCard: FC<VideoCardProps> = memo(({ video }) => {
  const isListViewMode =
    useAppSelector(selectViewMode) === ViewModeOptions.LIST;

  return (
    <div
      key={video.id}
      className={`${s.videoCard} ${isListViewMode ? s.list : ""}`}
    >
      <div className={s.videoWrapper}>
        <ReactPlayer
          src={video.src}
          className={s.videoPlayer}
          width="100%"
          height="100%"
          controls={true}
          light={<img src={video.thumbnails?.url} />}
          pip={true}
          playing={false}
        />
      </div>
      <div className={s.videoInfo}>
        <div className={s.videoLogo}>
          <img className={s.miniThumb} src={video.thumbnails?.url} />
        </div>
        <div className={s.videoTitleContainer}>
          <h3>{video.title}</h3>
          <p className={s.videoDescription}>{video.channelTitle}</p>
          <p className={s.videoDescription}>{video.publishedAt}</p>
        </div>
      </div>
    </div>
  );
});
