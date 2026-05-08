import type { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "../store";

type PairsOfValuesToSave = {
  [K in keyof RootState]?: keyof RootState[K];
};

import { PairsOfValues } from "../../constants/enums";

const pairsOfValuesToSave: PairsOfValuesToSave = {
  recentRequest: PairsOfValues.RECENT_REQUEST,
  language: PairsOfValues.LANGUAGE,
  savedQuery: PairsOfValues.SAVED_QUERY,
  theme: PairsOfValues.THEME,
  auth: PairsOfValues.AUTH,
  videos: PairsOfValues.VIDEOS,
  viewMode: PairsOfValues.VIEW_MODE,
};

export const clearLocalStorageItem = () => {
  Object.keys(pairsOfValuesToSave).map((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });
};

const persistStateToLocalStorage = <K extends keyof RootState>(
  state: RootState,
  stateProperty: K,
): void => {
  let isSavedQuery = false;

  const data = state[stateProperty];

  if (stateProperty === "savedQuery") {
    isSavedQuery = true;
  }

  const keyToSave = pairsOfValuesToSave[stateProperty];

  if (!keyToSave) return;

  const dataToSave = isSavedQuery
    ? state["savedQuery"]
    : data[keyToSave as keyof typeof data];
  try {
    if (typeof dataToSave !== "undefined") {
      localStorage.setItem(stateProperty, JSON.stringify(dataToSave));
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const loadFromLocalStorage = (storageKey: keyof RootState) => {
  const saved = localStorage.getItem(storageKey);

  return saved ? JSON.parse(saved) : null;
};

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (action instanceof Object && "type" in action) {
      const state = store.getState();

      const actionType = action.type as string;

      const sliceName = actionType.split("/")[0] as keyof RootState;

      persistStateToLocalStorage(state, sliceName);
    }

    return result;
  };
