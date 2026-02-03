/**
 * userSlice — Redux slice for current user. Used by login, logout, and profile.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  cell: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
