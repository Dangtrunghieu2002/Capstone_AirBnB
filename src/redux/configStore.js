import { configureStore } from '@reduxjs/toolkit'
import InforBookingSlice from './SliceUser/InforBookingSlice'

export const store = configureStore({
  reducer: {
    InforBookingSlice
  },
})