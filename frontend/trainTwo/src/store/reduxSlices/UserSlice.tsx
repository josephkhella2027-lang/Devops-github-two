import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialStateUsersType,
  Users,
} from "../../utilities/interfacesTypes";

const initialState: InitialStateUsersType = {
  users: [],
};
const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Users[]>) => {
      state.users = action.payload;
    },
    setRegisterUser: (state, action: PayloadAction<Users>) => {
      state.users.push(action.payload);
    },
  },
});
export const { setUsers, setRegisterUser } = userSlice.actions;
export default userSlice.reducer;
