import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

import type { FormInputType } from "../../components/ModalSavedQuery";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";
import type { RootState } from "../store";

export type Query = { id: string } & FormInputType;

type QueryState = {
  queries: Query[];
  modal: {
    isOpen: boolean;
    queryId?: string | null;
    mode: "save" | "edit";
    currentQuery: string;
  };
};

const initialState: QueryState = {
  queries: loadFromLocalStorage("savedQuery")?.queries || [],
  modal: {
    isOpen: false,
    queryId: null,
    mode: "save",
    currentQuery: loadFromLocalStorage("savedQuery")?.modal?.currentQuery || "",
  },
};

export const savedQueriesSlice = createSlice({
  name: "savedQuery",
  initialState,
  reducers: {
    addQuery(state, action: PayloadAction<Query>) {
      state.queries.push(action.payload);
    },
    openQuerySaveModal(state) {
      state.modal.isOpen = true;
      state.modal.mode = "save";
    },
    openQueryEditModal(state, action: PayloadAction<Query["id"]>) {
      state.modal.isOpen = true;
      state.modal.mode = "edit";
      state.modal.queryId = action.payload;
    },
    resetCurrentQuery(state) {
      state.modal.currentQuery = "";
    },
    closeQueryModal(state) {
      state.modal.isOpen = false;
    },
    editQueryName(
      state,
      action: PayloadAction<{ id: Query["id"]; data: Query }>,
    ) {
      const { id, data } = action.payload;

      state.queries = state.queries.map((item) =>
        item.id === id ? data : item,
      );
    },
    saveCurrentQueryName(state, action: PayloadAction<Query["query"]>) {
      state.modal.currentQuery = action.payload;
    },
    deleteQuery(state, action: PayloadAction<Query["id"]>) {
      state.queries = state.queries.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
  selectors: {
    selectSavedQueries: (state) => state.queries,
    selectIsOpenModal: (state) => state.modal.isOpen,
    selectCurrentQueryName: (state) => state.modal.currentQuery,
    selectCurrentModeValue: (state) => state.modal.mode,
    selectIsSaveMode: (state) => state.modal.mode === "save",
    selectQueriesId: (state) => state.modal.queryId,
  },
});

export const selectSavedQuery = createSelector(
  [(state: RootState) => state.savedQuery.queries, (_, id: string) => id],
  (queries, id) => queries.find((query) => query.id === id),
);

export const {
  addQuery,
  openQuerySaveModal,
  closeQueryModal,
  saveCurrentQueryName,
  deleteQuery,
  openQueryEditModal,
  editQueryName,
  resetCurrentQuery,
} = savedQueriesSlice.actions;

export const {
  selectSavedQueries,
  selectCurrentQueryName,
  selectIsSaveMode,
  selectQueriesId,
  selectCurrentModeValue,
  selectIsOpenModal,
} = savedQueriesSlice.selectors;

export default savedQueriesSlice.reducer;
