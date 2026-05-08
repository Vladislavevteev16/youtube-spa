import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

type RequestItem = {
  id: string;
  value: string;
};

type RequestState = {
  requests: RequestItem[];
  isVisible: boolean;
};

const initialState: RequestState = {
  requests: loadFromLocalStorage("recentRequest") || [],
  isVisible: false,
};

export const recentRequestSlice = createSlice({
  name: "recentRequest",
  initialState,
  reducers: {
    addNewRequest(state, action: PayloadAction<RequestItem>) {
      const { value } = action.payload;

      const isDuplicate = state.requests.find((item) => item.value === value);

      if (!isDuplicate) {
        state.requests.unshift(action.payload);
      }

      if (state.requests.length > 10) {
        state.requests.pop();
      }
    },
    deleteRequest(state, action: PayloadAction<RequestItem["id"]>) {
      state.requests = state.requests.filter(
        (item) => item.id !== action.payload,
      );
    },
    openRequestList(state) {
      state.isVisible = true;
    },
    closeRequestList(state) {
      state.isVisible = false;
    },
  },
  selectors: {
    selectRequestsList: (state) => state.requests,
    selectRequestIsVisible: (state) => state.isVisible,
  },
});

export const {
  addNewRequest,
  openRequestList,
  closeRequestList,
  deleteRequest,
} = recentRequestSlice.actions;

export const { selectRequestIsVisible, selectRequestsList } =
  recentRequestSlice.selectors;

export default recentRequestSlice.reducer;
