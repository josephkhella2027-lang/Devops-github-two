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
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
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
    setDeleteUser: (
      state,
      action: PayloadAction<number | string | undefined>,
    ) => {
      if (!action.payload) return;
      state.users = state.users.filter(
        (u) => String(u.id) !== String(action.payload),
      );
    },
  },
});
export const {
  setUsers,
  setRegisterUser,
  setLoginUser,
  setLogOut,
  setDeleteUser,
} = userSlice.actions;
export default userSlice.reducer;
