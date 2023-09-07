import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";
import { message } from "antd";

const initialState: IState = {
  data: [],
  loading: false,
};

export const gets = createAsyncThunk("seed/gets", async () => {
  const res = await axios.get<any>(SERVER_URL + "/seed");
  return res.data;
});

export const add = createAsyncThunk("seed/add", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/seed", data);
  return res.data;
});

export const inc = createAsyncThunk("seed/inc", async (data) => {
  const res = await axios.post<any>(SERVER_URL + "/seed/inc", data);
  return res.data;
});

export const Slice = createSlice({
  name: "seed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gets.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(gets.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(add.fulfilled, (_state, action: PayloadAction<any>) => {
      message.info(action.payload.result);
    });
    builder.addCase(inc.fulfilled, (_state, action: PayloadAction<any>) => {
      message.info(action.payload.result);
    });
  },
});

export default Slice.reducer;
