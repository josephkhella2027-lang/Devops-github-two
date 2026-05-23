// sagas/rootSaga.ts

import { all } from "redux-saga/effects";
import { WatchFetchGetUserSaga } from "./FetchGetAllUsers";
import { WatchFetchRegisterUserSaga } from "./FetchRegsiterUser";
import { WatchFetchLoginUserSaga } from "./FetchLoginUser";
import { WatchFetchDeleteUserSaga } from "./FetchDeleteUser";

export default function* RootSaga() {
  yield all([
    WatchFetchGetUserSaga(),
    WatchFetchRegisterUserSaga(),
    WatchFetchLoginUserSaga(),
    WatchFetchDeleteUserSaga(),
  ]);
}
