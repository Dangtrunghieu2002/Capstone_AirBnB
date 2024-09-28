import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService } from "../../service/viTri.service";

export const getLocationApi = createAsyncThunk(
  "viTri/getLocationApi",
  async (_, thunkAPI) => {
    const response = await viTriService.layViTri();
    return response.data.content;
  }
);
export const getLocationApiId = createAsyncThunk(
  "viTri/getLocationApiId",
  async (data, thunkAPI) => {
    const response = await viTriService.layViTriTheoId(data);
    return response.data.content
  }
);

const initialState = {
  locationApi: [],
  location: [],
};

const viTriSlice = createSlice({
  name: "viTri",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationApi.fulfilled, (state, action) => {
      state.locationApi = action.payload;
    });
    builder.addCase(getLocationApiId.fulfilled, (state, action) => {
      state.location = action.payload;
    });
  },
});

export const {} = viTriSlice.actions;

export default viTriSlice.reducer;
