import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateUsersType } from "../../utilities/interfacesTypes";

const initialState: InitialStateUsersType = {
  users: [],
};
const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
