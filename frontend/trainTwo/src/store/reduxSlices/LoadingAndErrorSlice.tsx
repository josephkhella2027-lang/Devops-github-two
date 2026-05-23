import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialStateLoadingType } from "../../utilities/interfacesTypes";

const initialState: InitialStateLoadingType = {
  loading: false,
  error: null,
  successMessage: null,
  field: null,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    setError: (
      state,
      action: PayloadAction<{
        message: string;
        field?: string;
      }>,
    ) => {
      state.loading = false;
      state.error = action.payload.message;
      state.field = action.payload.field || null;
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
