import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { ViewModeOptions } from "../../constants/enums";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

type ViewModeState = {
  isMobile: boolean;
  searchResult: string;
  viewMode: ViewModeOptions.GRID | ViewModeOptions.LIST;
};

const initialState: ViewModeState = {
  isMobile: true,
  searchResult: loadFromLocalStorage("viewMode") || "",
  viewMode: ViewModeOptions.GRID,
};

export const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    setCurrentViewMode(
      state,
      action: PayloadAction<ViewModeState["viewMode"]>,
    ) {
      state.viewMode = action.payload;
    },
    setSearchResultViewMode(state, action: PayloadAction<string>) {
      state.searchResult = action.payload;
    },
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
  },

  selectors: {
    selectSearchResult: (state) => state.searchResult,
    selectViewMode: (state) => state.viewMode,
    selectIsMobile: (state) => state.isMobile,
  },
});

export const { setCurrentViewMode, setSearchResultViewMode, setIsMobile } =
  viewModeSlice.actions;
export const { selectSearchResult, selectViewMode, selectIsMobile } =
  viewModeSlice.selectors;

export default viewModeSlice.reducer;
