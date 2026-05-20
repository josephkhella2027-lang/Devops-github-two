// sagas/rootSaga.ts

import { all } from "redux-saga/effects";
import { WatchFetchGetUserSaga } from "./FetchGetAllUsers";

export default function* RootSaga() {
  yield all([WatchFetchGetUserSaga()]);
}
