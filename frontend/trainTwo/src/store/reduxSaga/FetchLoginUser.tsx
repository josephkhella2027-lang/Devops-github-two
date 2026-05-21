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
import { setLoginUser } from "../reduxSlices/UserSlice";

interface LoginResponse {
  user: Users;
  token: string;
  message: string;
}

function* FetchLoginUserSaga(action: PayloadAction<Users>) {
  try {
    yield put(clearMessages());
    yield put(setLoading());

    const data: LoginResponse = yield call(
      ApiHeader<LoginResponse>,
      "post",
      "login-user",
      action.payload,
    );

    yield put(
      setLoginUser({
        user: data.user,
        token: data.token,
      }),
    );

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    yield put(setSuccessMessage(data.message));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    yield put(
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      ),
    );
  }
}

export function* WatchFetchLoginUserSaga() {
  yield takeLatest("FETCH-LOGIN-USER", FetchLoginUserSaga);
}
