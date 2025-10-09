import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    lists: listReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
