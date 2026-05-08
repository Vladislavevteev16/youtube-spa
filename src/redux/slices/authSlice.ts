import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "../store/hooks";

import { isAxiosError } from "axios";

import type { CredentialsType } from "../../components/LoginForm";

import { loadFromLocalStorage } from "../middleware/localStorageMiddlware";

type AuthState = {
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  token: loadFromLocalStorage("auth") || null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: CredentialsType, { extra, rejectWithValue }) => {
    const { requestAuth } = extra;

    try {
      const response = await requestAuth.login(credentials);

      const { token } = response.data;

      return token;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AuthState["token"]>) => {
        state.isLoading = false;
        state.token = action.payload;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload ?? "login failed";
    });
  },

  selectors: {
    selectToken: (state) => state.token,
    selectAuthProperty: (state) => state,
  },
});

export const { logout } = authSlice.actions;
export const { selectAuthProperty, selectToken } = authSlice.selectors;

export default authSlice.reducer;
