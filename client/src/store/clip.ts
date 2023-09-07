import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";
import { getTimeAgo } from "../utils/util";

const initialState: IState = {
  data: [],
  loading: false,
};

export const getClip = createAsyncThunk("clip/get", async () => {
  const res = await axios.get<any>(SERVER_URL + "/clip");
  return res.data;
});

export const delClip = createAsyncThunk("clip/del", async (addr: string) => {
  await axios.post<any>(SERVER_URL + "/clip/del", { addr });
  return addr;
});

export const clipSlice = createSlice({
  name: "clip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClip.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClip.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.map((clip: Data) => {
        return {
          ...clip,
          id: clip._id,
          time: getTimeAgo(new Date(clip.time)),
        };
      });
    });
    builder.addCase(getClip.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(delClip.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = state.data.filter(
        (item: Data) => item.addr != action.payload
      );
    });
  },
});

export default clipSlice.reducer;
