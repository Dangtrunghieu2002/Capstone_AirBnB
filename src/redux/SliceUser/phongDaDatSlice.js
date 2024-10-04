import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { datPhongService } from "../../service/datPhong.service";

export const getRoomBooking = createAsyncThunk(
  "datPhong/getRoomBooking",
  async (data, thunkAPI) => {
    const response = await datPhongService.layPhongTheoNguoiDung(data);
    return response.data.content;
  }
);

const initialState = {
  roomBooking: [],
};

const phongDaDatSlice = createSlice({
  name: "phongDaDat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomBooking.fulfilled, (state, action) => {
      state.roomBooking = action.payload;
    });
  },
});

export const {} = phongDaDatSlice.actions;

export default phongDaDatSlice.reducer;
