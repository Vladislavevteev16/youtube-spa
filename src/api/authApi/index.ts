import axios from "axios";

import { v4 as uuid } from "uuid";

// import { type CredentialsType } from "../../components/LoginForm";

const AUTH_API_URL = "https://todo-redev.herokuapp.com/api/auth";

type LoginResponse = {
  token: string;
};

type MockResponse = {
  data: LoginResponse;
};

const RESPONSE_DELAY = 2000;

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const mockLogin = (): Promise<MockResponse> =>
  new Promise((res) => {
    setTimeout(() => res({ data: { token: uuid() } }), RESPONSE_DELAY);
  });

export const requestAuth = {
  // login: (credentials: CredentialsType) =>
  //   authApi.post<LoginResponse>("/login", credentials),
  login: () => mockLogin(),
};
