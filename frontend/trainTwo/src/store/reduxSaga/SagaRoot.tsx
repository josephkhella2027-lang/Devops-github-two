// sagas/rootSaga.ts

import { all } from "redux-saga/effects";
import { WatchFetchGetUserSaga } from "./FetchGetAllUsers";
import { WatchFetchRegisterUserSaga } from "./FetchRegsiterUser";

export default function* RootSaga() {
  yield all([WatchFetchGetUserSaga(), WatchFetchRegisterUserSaga()]);
}
