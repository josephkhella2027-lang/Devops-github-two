import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialStateLoadingType } from "../../utilities/interfacesTypes";

const initialState: InitialStateLoadingType = {
  loading: false,
  error: null,
};
const loadingSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.loading = true;
      state.error = action.payload;
    },
    setFinishLoading: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});
export const { setLoading, setError, setFinishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
