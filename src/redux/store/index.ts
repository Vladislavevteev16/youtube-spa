import { configureStore } from "@reduxjs/toolkit";

import { requestAuth } from "../../api/authApi";

import { youtubeApi } from "../../api/youtubeApi";

import savedQueryReducer from "../slices/savedQueriesSlice";
import authReducer from "../slices/authSlice";
import recentRequestReducer from "../slices/recentRequestSlice";
import themeReducer from "../slices/themeSlice";
import languageReducer from "../slices/languageSlice";
import viewModeReducer from "../slices/viewModeSlice";
import videosReducer from "../slices/videosSlice";
import paginationReducer from "../slices/paginationSlice";

import { localStorageMiddleware } from "../middleware/localStorageMiddlware";

const store = configureStore({
  reducer: {
    savedQuery: savedQueryReducer,
    auth: authReducer,
    recentRequest: recentRequestReducer,
    theme: themeReducer,
    language: languageReducer,
    viewMode: viewModeReducer,
    videos: videosReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: { requestAuth, youtubeApi },
      },
    }).concat(localStorageMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
