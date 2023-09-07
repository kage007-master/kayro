import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";
import { message } from "antd";

const initialState: DecState = {
  data: [],
  totalCnt: 0,
  loading: false,
};

export const gets = createAsyncThunk("pk/gets", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/pk/show", data);
  return res.data;
});

export const calc = createAsyncThunk("pk/calc", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/pk/calc", data);
  return res.data;
});

export const add = createAsyncThunk("pk/add", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/pk", data);
  return res.data;
});

export const visible = createAsyncThunk("pk/visible", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/pk/visible", data);
  return res.data;
});

export const Slice = createSlice({
  name: "privatekey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gets.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.result;
      state.totalCnt = action.payload.totalCnt;
    });
    builder.addCase(gets.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(calc.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(calc.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.result;
      state.totalCnt = action.payload.totalCnt;
    });
    builder.addCase(calc.rejected, (state) => {
      state.loading = false;
      message.error("Failed");
    });
    builder.addCase(add.fulfilled, (_state, action: PayloadAction<any>) => {
      message.info(action.payload.result);
    });
    builder.addCase(visible.fulfilled, (_state, action: PayloadAction<any>) => {
      message.info(action.payload.result);
    });
  },
});

export default Slice.reducer;
