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
import { setRegisterUser } from "../reduxSlices/UserSlice";

interface RegisterResponse {
  user: Users;
  message: string;
}

function* FetchRegisterUserSaga(action: PayloadAction<Users>) {
  try {
    yield put(clearMessages());
    yield put(setLoading());

    const data: RegisterResponse = yield call(
      ApiHeader<RegisterResponse>,
      "post",
      "register-user",
      action.payload,
    );

    yield put(setRegisterUser(data.user));
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

export function* WatchFetchRegisterUserSaga() {
  yield takeLatest("FETCH-REGISTER-USER", FetchRegisterUserSaga);
}
