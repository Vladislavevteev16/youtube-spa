import { createSlice } from "@reduxjs/toolkit";

import { ThemeOptions } from "../../constants/enums";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

type ThemeType = {
  theme: ThemeOptions.LIGHT | ThemeOptions.DARK;
};

const initialState: ThemeType = {
  theme: loadFromLocalStorage("theme") || ThemeOptions.DARK,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state) {
      state.theme =
        state.theme === ThemeOptions.DARK
          ? ThemeOptions.LIGHT
          : ThemeOptions.DARK;
    },
  },

  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const { setTheme } = themeSlice.actions;

export const { selectTheme } = themeSlice.selectors;

export default themeSlice.reducer;
