import { configureStore } from '@reduxjs/toolkit'
import InforBookingSlice from './SliceUser/InforBookingSlice'
import viTriSlice from './SliceUser/viTriSlice'

export const store = configureStore({
  reducer: {
    InforBookingSlice,
    viTriSlice
  },
})