import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

export type LanguageState = {
  currentLanguage: "ru" | "en";
  isOpen: boolean;
};

const initialState: LanguageState = {
  currentLanguage: loadFromLocalStorage("language") || "en",
  isOpen: false,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(
      state,
      action: PayloadAction<LanguageState["currentLanguage"]>,
    ) {
      state.currentLanguage = action.payload;
    },
    isOpenLanguageMenu(state) {
      state.isOpen = !state.isOpen;
    },
    closeLanguageMenu(state) {
      state.isOpen = false;
    },
  },

  selectors: {
    selectCurrentLanguage: (state) => state.currentLanguage,
    selectIsOpenLanguagePopup: (state) => state.isOpen,
  },
});

export const { isOpenLanguageMenu, setLanguage, closeLanguageMenu } =
  languageSlice.actions;

export const { selectCurrentLanguage, selectIsOpenLanguagePopup } =
  languageSlice.selectors;

export default languageSlice.reducer;
