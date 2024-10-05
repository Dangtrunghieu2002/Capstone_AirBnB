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
  count: 0,
};

const phongDaDatSlice = createSlice({
  name: "phongDaDat",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.roomBooking = [...state.roomBooking, action.payload];
      state.count += 1;
      //   console.log(state.count)
    },
    removeRoom: (state, action) => {
      state.roomBooking = [action.payload];
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomBooking.fulfilled, (state, action) => {
      state.roomBooking = action.payload;
      state.count = action.payload.length;
    });
  },
});

export const { addRoom, removeRoom } = phongDaDatSlice.actions;

export default phongDaDatSlice.reducer;
