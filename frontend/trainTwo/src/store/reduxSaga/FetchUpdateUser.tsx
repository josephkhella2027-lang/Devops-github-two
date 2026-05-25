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

import { setUpdateUser, setUsers } from "../reduxSlices/UserSlice";

interface UpdateResponse {
  user: Users;
  users: Users[];
  message: string[] | string;
}

interface ErrorResponse {
  message: string[] | null | string;
  field?: string[] | null;
}

function* FetchUpdateUserSaga(action: PayloadAction<Users>) {
  try {
    const id = String(action.payload.id);

    // clear old messages
    yield put(clearMessages());

    // start loading
    yield put(setLoading());

    // api request
    const data: UpdateResponse = yield call(() =>
      ApiHeader<UpdateResponse>("put", `update-user/${id}`, action.payload),
    );

    // save user + token in redux
    yield put(setUpdateUser(data.user));
    yield put(setUsers(data.users));

    // save localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // success message
    yield put(
      setSuccessMessage(
        Array.isArray(data.message) ? data.message[0] : data.message,
      ),
    );
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

export function* WatchFetchUpdateUserSaga() {
  yield takeLatest("FETCH-UPDATE-USER", FetchUpdateUserSaga);
}
