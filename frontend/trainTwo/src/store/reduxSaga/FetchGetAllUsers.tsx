import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  setError,
  setFinishLoading,
  setLoading,
} from "../reduxSlices/LoadingAndErrorSlice";

import { ApiHeader, type Users } from "../../utilities/interfacesTypes";

import { setUsers } from "../reduxSlices/UserSlice";

interface UsersResponse {
  users: Users[];
}

interface ErrorResponse {
  message: string;
  field?: string;
}

function* FetchGetUserSaga() {
  try {
    yield put(setLoading());

    const data: UsersResponse = yield call(
      ApiHeader<UsersResponse>,
      "get",
      "users",
    );

    yield put(setUsers(data.users));

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

    yield put(setFinishLoading());
  }
}

export function* WatchFetchGetUserSaga() {
  yield takeLatest("FETCH-USERS", FetchGetUserSaga);
}
