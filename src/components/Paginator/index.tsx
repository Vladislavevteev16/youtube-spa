import { Pagination } from "antd";

import {
  selectIsMobile,
  selectViewMode,
} from "../../redux/slices/viewModeSlice";

import { selectVideos } from "../../redux/slices/videosSlice";

import {
  selectCurrentPage,
  setCurrentPage,
} from "../../redux/slices/paginationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";

import { ViewModeOptions } from "../../constants/enums";

import s from "./index.module.css";

export const Paginator = () => {
  const dispatch = useAppDispatch();

  const isListViewMode = useAppSelector(selectViewMode);
  const currentPage = useAppSelector(selectCurrentPage);
  const videos = useAppSelector(selectVideos);
  const isMobile = useAppSelector(selectIsMobile);

  if (isListViewMode === ViewModeOptions.LIST || isMobile) return null;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Pagination
      className={s.paginator}
      current={currentPage}
      total={videos.length}
      pageSize={12}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
};
