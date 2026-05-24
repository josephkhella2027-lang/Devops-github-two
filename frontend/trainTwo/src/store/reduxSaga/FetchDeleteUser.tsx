import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  setError,
  setLoading,
  setSuccessMessage,
  clearMessages,
} from "../reduxSlices/LoadingAndErrorSlice";

import { ApiHeader, type Users } from "../../utilities/interfacesTypes";
import { setDeleteUser } from "../reduxSlices/UserSlice";

interface ErrorResponse {
  message: string[] | null;
  field?: string[] | null;
}

function* FetchDeleteUserSaga(
  action: PayloadAction<string | number | undefined>,
) {
  try {
    yield put(clearMessages());
    yield put(setLoading());

    const id = String(action.payload);

    const data: {
      users: Users[];
      user: Users;
      message: string;
    } = yield call(ApiHeader, "delete", `delete-user/${id}`);

    // ✅ update users list properly
    // ✅ correct: send ONLY id
    yield put(setDeleteUser(id));

    // optional: remove from store (not needed if backend sends full list)
    yield put(setSuccessMessage(data.message));
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
  }
}

export function* WatchFetchDeleteUserSaga() {
  yield takeLatest("FETCH-Delete-USER", FetchDeleteUserSaga);
}
