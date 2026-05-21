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
    const err = error as AxiosError;

    yield put(setError(err.message || "Something went wrong"));
  }
}

export function* WatchFetchGetUserSaga() {
  yield takeLatest("FETCH-USERS", FetchGetUserSaga);
}
