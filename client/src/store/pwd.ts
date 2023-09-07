import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";
import { getTimeAgo } from "../utils/util";

const initialState: IState = {
  data: [],
  loading: false,
};

export const getPwd = createAsyncThunk("pwd/get", async () => {
  const res = await axios.get<any>(SERVER_URL + "/Pwd");
  return res.data;
});

export const delPwd = createAsyncThunk("pwd/del", async (addr: string) => {
  await axios.post<any>(SERVER_URL + "/pwd/del", { addr });
  return addr;
});

export const pwdSlice = createSlice({
  name: "pwd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPwd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPwd.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.map((pwd: Data) => {
        return {
          ...pwd,
          id: pwd._id,
          time: getTimeAgo(new Date(pwd.time)),
        };
      });
    });
    builder.addCase(getPwd.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(delPwd.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = state.data.filter(
        (item: Data) => item.addr != action.payload
      );
    });
  },
});

export default pwdSlice.reducer;
