import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/utils";

const initialState = {
  inforUser: getLocalStorage("user"),
};

const authSlice = createSlice({
  name: "inforUser",
  initialState,
  reducers: {
    getInforUser: (state, actions) => {
      state.inforUser = actions.payload;
    },
    removeInforUser: (state, actions) => {
      state.inforUser = null;
    },
  },
});

export const { getInforUser, removeInforUser } = authSlice.actions;

export default authSlice.reducer;