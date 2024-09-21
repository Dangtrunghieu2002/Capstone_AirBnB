import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: 0,
  childGuest: 0,
  babyGuest: 0,
  startDate: new Date(),
  endDate: new Date(),
};

const InforBookingSlice = createSlice({
  name: "inforBooking",
  initialState,
  reducers: {
    increaseGuest: (state, actions) => {
      state.guest += 1;
    },
    decreaseGuest: (state, actions) => {
      if (state.guest > 0) state.guest -= 1;
    },
    increateChildGuest: (state, actions) => {
      state.childGuest += 1;
    },
    decreaseChildGuest: (state, actions) => {
      if(state.childGuest > 0) state.childGuest -= 1;
    },
    increaseBabyGuest: (state, actions) => {
      state.babyGuest += 1;
    },
    decreaseBabyGuest: (state, actions) => {
      if(state.babyGuest > 0) state.babyGuest -= 1;
    },
    setStartDateR: (state, actions) => {
      state.startDate = actions.payload;
    },
    setEndDateR: (state, actions) => {
      state.endDate = actions.payload;
    },
  },
});

export const {
  increaseGuest,
  decreaseGuest,
  increateChildGuest,
  decreaseChildGuest,
  increaseBabyGuest,
  decreaseBabyGuest,
  setStartDateR,
  setEndDateR,
} = InforBookingSlice.actions;

export default InforBookingSlice.reducer;
