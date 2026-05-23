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
  message: string;
  field?: string;
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

    yield put(
      setError({
        message:
          err.response?.data?.message || err.message || "Something went wrong",

        field: err.response?.data?.field,
      }),
    );

    // finish loading
    yield put(setFinishLoading());
  }
}

export function* WatchFetchLoginUserSaga() {
  yield takeLatest("FETCH-LOGIN-USER", FetchLoginUserSaga);
}
