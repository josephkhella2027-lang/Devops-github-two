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

import { setRegisterUser } from "../reduxSlices/UserSlice";

interface RegisterResponse {
  user: Users;
  message: string;
}

interface ErrorResponse {
  message: string[] | null;
  field?: string[] | null;
}
function* FetchRegisterUserSaga(action: PayloadAction<Users>) {
  try {
    // clear old messages
    yield put(clearMessages());

    // start loading
    yield put(setLoading());

    // api request
    const data: RegisterResponse = yield call(
      ApiHeader<RegisterResponse>,
      "post",
      "register-user",
      action.payload,
    );

    // save user
    yield put(setRegisterUser(data.user));

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

    yield put(setFinishLoading());
  }
}

export function* WatchFetchRegisterUserSaga() {
  yield takeLatest("FETCH-REGISTER-USER", FetchRegisterUserSaga);
}
