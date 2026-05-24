import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  setError,
  setLoading,
  setSuccessMessage,
  clearMessages,
  setFinishLoading,
} from "../reduxSlices/LoadingAndErrorSlice";

import { ApiHeader, type Users } from "../../utilities/interfacesTypes";

import { setLoginUser } from "../reduxSlices/UserSlice";

interface LoginResponse {
  user: Users;
  token: string;
  message: string;
}

interface ErrorResponse {
  message: string[] | null;
  field?: string[] | null;
}

function* FetchLoginUserSaga(action: PayloadAction<Users>) {
  try {
    // clear old messages
    yield put(clearMessages());

    // start loading
    yield put(setLoading());

    // api request
    const data: LoginResponse = yield call(
      ApiHeader<LoginResponse>,
      "post",
      "login-user",
      action.payload,
    );

    // save user + token in redux
    yield put(
      setLoginUser({
        user: data.user,
        token: data.token,
      }),
    );

    // save localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    localStorage.setItem("token", data.token);

    // success message
    yield put(setSuccessMessage(data.message));

    // finish loading
    yield put(setFinishLoading());
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    const errorData = err.response?.data;
    const message = Array.isArray(errorData?.message)
      ? errorData.message
      : errorData?.message
        ? [errorData.message]
        : [err.message || "Something went wrong"];

    yield put(
      setError({
        message,
        field: errorData?.field ?? null,
      }),
    );

    // finish loading
    yield put(setFinishLoading());
  }
}

export function* WatchFetchLoginUserSaga() {
  yield takeLatest("FETCH-LOGIN-USER", FetchLoginUserSaga);
}
