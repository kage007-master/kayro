import { configureStore } from "@reduxjs/toolkit";
import dec from "./dec";
import pk from "./pk";
import vault from "./vault";
import seed from "./seed";
import status from "./status";
import clip from "./clip";
import pwd from "./pwd";

const store = configureStore({
  reducer: {
    vault,
    seed,
    pk,
    dec,
    status,
    clip,
    pwd,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
