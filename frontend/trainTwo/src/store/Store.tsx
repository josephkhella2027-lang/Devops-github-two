import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./reduxSlices/UserSlice";
import loadingSliceReducer from "./reduxSlices/LoadingAndErrorSlice";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./reduxSaga/SagaRoot";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    // your reducers
    userSlice: userSliceReducer,
    loadingSlice: loadingSliceReducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware), 
});

sagaMiddleware.run(RootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
