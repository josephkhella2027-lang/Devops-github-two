import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialStateUsersType,
  Users,
} from "../../utilities/interfacesTypes";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: InitialStateUsersType = {
  users: [],
  user: parsedUser,
  token: storedToken,
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
    setLoginUser: (
      state,
      action: PayloadAction<{ user: Users; token: string }>,
    ) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
  },
});
export const { setUsers, setRegisterUser, setLoginUser } = userSlice.actions;
export default userSlice.reducer;
