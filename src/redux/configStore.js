import { configureStore } from '@reduxjs/toolkit'
import InforBookingSlice from './SliceUser/InforBookingSlice'
import viTriSlice from './SliceUser/viTriSlice'
import authSlice from './SliceUser/authSlice'

export const store = configureStore({
  reducer: {
    InforBookingSlice,
    viTriSlice,
    authSlice
  },
})