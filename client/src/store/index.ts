import { configureStore } from "@reduxjs/toolkit";
import pk from "./pk";

const store = configureStore({
  reducer: {
    pk,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
