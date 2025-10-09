import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import listReducer from "./listSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
