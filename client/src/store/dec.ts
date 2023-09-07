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

export const gets = createAsyncThunk("dec/get", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/dec/show", data);
  return res.data;
});

export const autoCheck = createAsyncThunk("dec/auto", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/dec/auto", data);
  return res.data;
});

export const manualCheck = createAsyncThunk("dec/manual", async (data: any) => {
  const res = await axios.post<any>(SERVER_URL + "/dec/manual", data);
  return res.data;
});

export const Slice = createSlice({
  name: "dec",
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
    builder.addCase(autoCheck.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      autoCheck.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        message.info(action.payload.result);
      }
    );
    builder.addCase(autoCheck.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(manualCheck.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      manualCheck.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        message.info(action.payload.result);
      }
    );
    builder.addCase(manualCheck.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default Slice.reducer;
