import { createAsyncThunk as createAsyncThunkOriginal } from "@reduxjs/toolkit";

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { requestAuth } from "../../api/authApi";

import type { AppDispatch, RootState } from ".";
import type { youtubeApi } from "../../api/youtubeApi";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ExtraArgument = {
  requestAuth: typeof requestAuth;
  youtubeApi: typeof youtubeApi;
};

export const createAsyncThunk = createAsyncThunkOriginal.withTypes<{
  extra: ExtraArgument;
  state: RootState;
  rejectValue: string;
}>();
