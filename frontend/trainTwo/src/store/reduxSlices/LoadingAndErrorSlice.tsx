import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialStateLoadingType } from "../../utilities/interfacesTypes";

const initialState: InitialStateLoadingType = {
  loading: false,
  error: null,
  successMessage: null,
};
const loadingSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.loading = true;
      state.error = action.payload;
    },
    setFinishLoading: (state) => {
      state.loading = false;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});
export const {
  setLoading,
  setError,
  setFinishLoading,
  setSuccessMessage,
  clearMessages,
} = loadingSlice.actions;
export default loadingSlice.reducer;
