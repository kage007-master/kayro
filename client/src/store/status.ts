import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../settings/index.json";
import axios from "axios";
import { getTimeAgo } from "../utils/util";

const initialState: IState = {
  data: [],
  loading: false,
};

export const getStatus = createAsyncThunk("status/get", async () => {
  const res = await axios.get<any>(SERVER_URL + "/status");
  return res.data;
});

export const delStatus = createAsyncThunk(
  "status/del",
  async (addr: string) => {
    await axios.post<any>(SERVER_URL + "/status/del", { addr });
    return addr;
  }
);

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.map((status: Data) => {
          return {
            ...status,
            id: status._id,
            time: getTimeAgo(new Date(status.time)),
          };
        });
      }
    );
    builder.addCase(getStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      delStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = state.data.filter(
          (item: Data) => item.addr != action.payload
        );
      }
    );
  },
});

export default statusSlice.reducer;
