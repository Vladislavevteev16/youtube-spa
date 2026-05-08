import {
  createSlice,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";

type PaginationState = {
  currentPage: number;
  pageSize: number;
};

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 12,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  selectors: {
    selectCurrentPage: (state) => state.currentPage,
    selectPageSize: (state) => state.pageSize,
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export const { selectCurrentPage, selectPageSize } = paginationSlice.selectors;

export const selectPaginatedVideos = createSelector(
  [
    (state: RootState) => state.videos.items,
    selectCurrentPage,
    selectPageSize,
  ],
  (videos, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    return videos.slice(start, start + pageSize);
  },
);

export default paginationSlice.reducer;
