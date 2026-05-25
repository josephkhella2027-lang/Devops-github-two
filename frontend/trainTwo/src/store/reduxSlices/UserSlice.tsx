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
    setUpdateUser: (state, action: PayloadAction<Users>) => {
      const userId = String(action.payload.id);

      if (!userId) return;

      const findUser = state.users.find((u) => String(u.id) === userId);

      if (!findUser) return;

      state.users = state.users.map((u) => {
        if (String(u.id) === userId) {
          const updatedUser = {
            ...u,
            username: action.payload.username,
            email: action.payload.email,
            password: action.payload.password,
          };

          // update localStorage user
          localStorage.setItem("user", JSON.stringify(updatedUser));

          return updatedUser;
        }

        return u;
      });
    },
  },
});
export const {
  setUsers,
  setRegisterUser,
  setLoginUser,
  setLogOut,
  setDeleteUser,
  setUpdateUser,
} = userSlice.actions;
export default userSlice.reducer;
