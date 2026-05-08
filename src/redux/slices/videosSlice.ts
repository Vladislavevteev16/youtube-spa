import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "../store/hooks";

import { isAxiosError } from "axios";

import type { SearchParams } from "../../api/youtubeApi";

import {
  type VideoModel,
  convertMapToModel,
} from "../../utils/convertMapToModel";

import { YoutubeOrderValue } from "../../constants/enums";
import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

export const searchVideos = createAsyncThunk<VideoModel[], SearchParams>(
  "videos/searchVideos",
  async (requestParams, { rejectWithValue, extra }) => {
    const {
      q,
      maxResults = 12,
      order = YoutubeOrderValue.RELEVANCE,
    } = requestParams;
    const { youtubeApi } = extra;

    try {
      const response = await youtubeApi.searchVideos({ q, maxResults, order });

      await new Promise((res) => setTimeout(() => res(1), 3000));

      return convertMapToModel(response.data.items);
    } catch (e) {
      if (isAxiosError(e)) {
        return rejectWithValue(e.response?.data?.message);
      } else if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

type VideosState = {
  items: VideoModel[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: VideosState = {
  items: loadFromLocalStorage("videos") || [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    resetVideos(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchVideos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(searchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
  },
  selectors: {
    selectVideos: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectHasVideos: (state) => !!state.items.length,
  },
});

export default videosSlice.reducer;

export const { resetVideos } = videosSlice.actions;

export const { selectVideos, selectIsLoading, selectHasVideos } =
  videosSlice.selectors;
