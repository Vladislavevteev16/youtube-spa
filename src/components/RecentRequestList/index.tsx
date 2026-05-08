import type { FC } from "react";

import { useAppSelector } from "../../redux/store/hooks";

import {
  selectRequestIsVisible,
  selectRequestsList,
} from "../../redux/slices/recentRequestSlice";
import { selectHasVideos } from "../../redux/slices/videosSlice";

import { RecentRequestItem } from "../RecentRequestItem";

import s from "./index.module.css";

type RecentRequestListProps = {
  isRecentRequestHidden: boolean;
  handleSelectRecentRequest: (request: string) => void;
};

export const RecentRequestList: FC<RecentRequestListProps> = ({
  isRecentRequestHidden,
  handleSelectRecentRequest,
}) => {
  
  const requestsList = useAppSelector(selectRequestsList);
  const isVisible = useAppSelector(selectRequestIsVisible);
  const hasVideos = useAppSelector(selectHasVideos);

  if (!isVisible || isRecentRequestHidden) return null;

  return (
    <div
      className={`${s.recentListContainer}  ${hasVideos ? s.hasVideos : ""}`}
    >
      <ul>
        {requestsList.map(({ id, value }) => (
          <RecentRequestItem
            handleSelectRecentRequest={handleSelectRecentRequest}
            key={id}
            value={value}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
};
