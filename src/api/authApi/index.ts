import axios from "axios";

import { type CredentialsType } from "../../components/LoginForm";

const AUTH_API_URL = "https://todo-redev.herokuapp.com/api/auth";

type LoginResponse = {
  token: string;
};

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestAuth = {
  login: (credentials: CredentialsType) =>
    authApi.post<LoginResponse>("/login", credentials),
};
