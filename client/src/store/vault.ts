import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";

const initialState: IState = {
  data: [],
  loading: false,
};

export const gets = createAsyncThunk("vault/gets", async () => {
  const res = await axios.get<any>(SERVER_URL + "/vault");
  return res.data;
});

export const update = createAsyncThunk("vault/update", async () => {
  const res = await axios.put<any>(SERVER_URL + "/vault");
  return res.data;
});

export const Slice = createSlice({
  name: "vault",
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
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = state.data.concat(action.payload);
      state.loading = false;
    });
    builder.addCase(update.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default Slice.reducer;
